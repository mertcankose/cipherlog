// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/security/Pausable.sol';

library Str {
    function strlen(string memory _note) external pure returns (uint256) {
        uint256 len;
        uint256 i = 0;
        uint256 byteLength = bytes(_note).length;

        for (len = 0; i < byteLength; len++) {
            bytes1 b = bytes(_note)[i];
            if (b < 0x80) {
                i += 1;
            } else if (b < 0xE0) {
                i += 2;
            } else if (b < 0xF0) {
                i += 3;
            } else if (b < 0xF8) {
                i += 4;
            } else if (b < 0xFC) {
                i += 5;
            } else {
                i += 6;
            }
        }
        return len;
    }
}

contract SecretNotes is Ownable, ReentrancyGuard, Pausable {
    enum Priority {
        none,
        low,
        medium,
        high
    }

    struct Note {
        uint256 id;
        string title;
        string content;
        Priority priority;
        uint256 createdAt;
        uint256 updatedAt;
    }

    uint256 private noteCounter;

    address[] public userAddresses;

    mapping(address => Note[]) private notes;
    mapping(address => bool) private inserted;

    event NoteSaved(address indexed _address, string _note, string _noteContent, Priority _priority);
    event NoteUpdated(address indexed _address, string _note, string _noteContent, Priority _priority);
    event NoteDeleted(address indexed _address, uint256 _noteId);

    modifier convenientNote(string memory _note) {
        require(Str.strlen(_note) > 1, 'Please enter the convenient note!');
        _;
    }

    modifier noteExists(uint256 _noteId) {
        require(_noteId <= noteCounter, 'Note does not exist');
        _;
    }

    constructor() ReentrancyGuard() Pausable() {
        noteCounter = 1;
    }

    // get all notes by a sender
    function getNotesBySender() external view returns (Note[] memory) {
        return notes[msg.sender];
    }

    // get all notes by a address
    function getNotesByAddress(address _address) external view returns (Note[] memory) {
        return notes[_address];
    }

    // get notes with pagination by a sender
    function getNotesBySenderWithPagination(uint256 _page, uint256 _resultsPerPage) external view returns (Note[] memory) {
        uint256 _notesIndex = _resultsPerPage * _page - _resultsPerPage; // 1, 10 -> 0, 2,10 -> 10.  0,10,20,30...
        uint256 notesSize = getUserNotesSize(msg.sender);

        if (notesSize == 0 || _notesIndex > notesSize - 1) {
            return new Note[](0);
        }

        Note[] memory _notes = new Note[](_resultsPerPage);
        uint256 _returnCounter = 0;

        for (_notesIndex; _notesIndex < _resultsPerPage * _page; _notesIndex++) {
            if (_notesIndex <= notesSize - 1) {
                _notes[_returnCounter] = notes[msg.sender][_notesIndex];
            } else {
                _notes[_returnCounter] = Note(0, '', '', Priority.none, 0, 0);
            }
            _returnCounter++;
        }

        return _notes;
    }

    // get notes with pagination by a address (THIS METHOD WILL BE USED)
    function getNotesByAddressWithPagination(
        address _address,
        uint256 _page,
        uint256 _resultsPerPage
    ) external view returns (Note[] memory) {
        uint256 _notesIndex = _resultsPerPage * _page - _resultsPerPage; // 1, 10 -> 0, 2,10 -> 10.  0,10,20,30...
        uint256 notesSize = getUserNotesSize(_address);

        if (notesSize == 0 || _notesIndex > notesSize - 1) {
            return new Note[](0);
        }

        Note[] memory _notes = new Note[](_resultsPerPage);
        uint256 _returnCounter = 0;

        for (_notesIndex; _notesIndex < _resultsPerPage * _page; _notesIndex++) {
            if (_notesIndex <= notesSize - 1) {
                _notes[_returnCounter] = notes[_address][_notesIndex];
            } else {
                _notes[_returnCounter] = Note(0, '', '', Priority.none, 0, 0);
            }
            _returnCounter++;
        }

        return _notes;
    }

    // set note by msg.sender (THIS METHOD WILL BE USED)
    function setNote(
        string memory _title,
        string memory _content,
        Priority _priority,
        uint256 _createdAt,
        uint256 _updatedAt
    ) external nonReentrant convenientNote(_title) whenNotPaused returns (bool) {
        Note memory userNote = Note({
            id: noteCounter,
            title: _title,
            content: _content,
            priority: _priority,
            createdAt: _createdAt,
            updatedAt: _updatedAt
        });
        notes[msg.sender].push(userNote);

        if (!inserted[msg.sender]) {
            inserted[msg.sender] = true;
            userAddresses.push(msg.sender);
        }

        unchecked {
            ++noteCounter;
        }

        emit NoteSaved(msg.sender, _title, _content, _priority);

        return true;
    }

    // update note by a sender (THIS METHOD WILL BE USED)
    function updateNoteBySender(
        uint256 _id,
        string memory _title,
        string memory _content,
        Priority _priority,
        uint256 _updatedAt
    ) external convenientNote(_title) returns (bool) {
        for (uint256 i = 0; i < getUserNotesSize(msg.sender); i++) {
            if (notes[msg.sender][i].id == _id) {
                Note storage _currentNote = notes[msg.sender][i];
                _currentNote.title = _title;
                _currentNote.content = _content;
                _currentNote.priority = _priority;
                _currentNote.updatedAt = _updatedAt;
            }
        }
        emit NoteUpdated(msg.sender, _title, _content, _priority);

        return true;
    }

    // delete note by a sender (THIS METHOD WILL BE USED)
    function deleteNoteBySender(uint256 _noteId) external nonReentrant noteExists(_noteId) returns (bool) {
        for (uint256 i = 0; i < notes[msg.sender].length; i++) {
            if (notes[msg.sender][i].id == _noteId) {
                // Remove the note by swapping with the last note and then reducing the array length
                notes[msg.sender][i] = notes[msg.sender][notes[msg.sender].length - 1];
                notes[msg.sender].pop();

                emit NoteDeleted(msg.sender, _noteId);

                return true;
            }
        }
        revert('Note not found');
    }

    function getUserNotesSize(address _userAddress) public view returns (uint256) {
        return notes[_userAddress].length;
    }

    // onlyOwner
    function getAllNotes() external view onlyOwner returns (address[] memory, Note[][] memory) {
        Note[][] memory userNotes = new Note[][](userAddresses.length);

        for (uint i = 0; i < userAddresses.length; i++) {
            userNotes[i] = notes[userAddresses[i]];
        }
        return (userAddresses, userNotes);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
