import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Account} from '@screens';

const Stack = createNativeStackNavigator();

const AccountStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountScreen"
        component={Account}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
