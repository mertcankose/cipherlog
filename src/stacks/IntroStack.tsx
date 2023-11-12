import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Onboarding} from '@screens';

const Stack = createNativeStackNavigator();

const IntroStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OnboardingScreen" component={Onboarding} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default IntroStack;
