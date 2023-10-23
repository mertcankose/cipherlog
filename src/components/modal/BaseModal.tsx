import {ReactNode, useContext, FC} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeContext} from '@contexts/Theme';
import {getHitSlop} from '@helpers/hit-slop';

interface IBaseModal {
  visibility: boolean;
  closeModal: () => void;
  children: ReactNode;
  style?: any;
  contentStyle?: any;
}

const BaseModal: FC<IBaseModal> = ({
  visibility,
  closeModal = () => {},
  children,
  style,
  contentStyle,
}) => {
  const {activeTheme} = useContext(ThemeContext);

  return (
    <Modal
      testID={'modal'}
      isVisible={visibility}
      backdropColor="#B4B3DB"
      backdropOpacity={0.3}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={400}
      animationOutTiming={400}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      onBackdropPress={closeModal}
      style={[styles.modal, style]}>
      <View
        style={[
          styles.content,
          {backgroundColor: activeTheme === 'dark' ? '#1F1F1F' : '#FFF'},
          contentStyle,
        ]}>
        <Pressable
          onPress={closeModal}
          style={styles.closeButton}
          hitSlop={getHitSlop(20)}>
          <AntDesign
            name="close"
            size={22}
            color={activeTheme === 'dark' ? '#fff' : '#000'}
          />
        </Pressable>

        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: 'center',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    justifyContent: 'center',
    borderRadius: 8,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
});

export default BaseModal;
