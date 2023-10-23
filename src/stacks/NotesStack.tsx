import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NoteDetail, Notes} from '@screens';

const Stack = createNativeStackNavigator();

const NotesStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotesScreen"
        component={Notes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NoteDetailScreen"
        component={NoteDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default NotesStack;
