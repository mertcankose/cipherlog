import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Notes} from '@screens';
import {NoteStatusBar} from '@components';

const Stack = createNativeStackNavigator();

const NotesStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NotesScreen" component={Notes} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default NotesStack;
