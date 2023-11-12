import {FC, ReactNode, useState, createContext, useEffect} from 'react';
import {storage} from '@config/storage';

interface IGeneralContext {
  isOnboarding: boolean | null;
  setIsOnboarding: (value: boolean | null) => void;
  skipOnboarding: () => void;
}

interface IContextProvider {
  children: ReactNode;
}

export const GeneralContext = createContext({} as IGeneralContext);

const GeneralProvider: FC<IContextProvider> = ({children}) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    onBoardingControl();
  }, [isOnboarding]);

  const onBoardingControl = async () => {
    storage.delete('onboarding');

    try {
      let onboarding = storage.getString('onboarding');
      console.log('onboarding: ', onboarding);
      if (onboarding === undefined) {
        setIsOnboarding(true);
      } else {
        setIsOnboarding(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const skipOnboarding = async () => {
    setIsOnboarding(false);
    try {
      storage.set('onboarding', 'false');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        isOnboarding,
        setIsOnboarding,
        skipOnboarding,
      }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralProvider;
