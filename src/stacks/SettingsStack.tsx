import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Settings} from '@screens';

const Stack = createNativeStackNavigator();

const SettingsStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={Settings}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
