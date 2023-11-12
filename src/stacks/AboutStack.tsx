import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {About} from '@screens';

const Stack = createNativeStackNavigator();

const AboutStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AboutScreen" component={About} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default AboutStack;
