import {useContext} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import NetworkItem from './NetworkItem';
import BaseModal from '@components/modal/BaseModal';
import TodoText from '@components/text/TodoText';
import {useTranslation} from 'react-i18next';

interface INetworkModal {
  visibility: boolean;
  selectNetwork: (network: IApplicableNetwork) => void;
  closeModal: () => void;
}

const NetworkModal = ({
  visibility,
  selectNetwork = (network: IApplicableNetwork) => {},
  closeModal = () => {},
}) => {
  const {t} = useTranslation();

  const networkBarStyle = (network: IApplicableNetwork) => {
    switch (network.chainId) {
      case 11155111:
        return styles.redBar;
      case 1:
        return styles.primaryBar;
      case 97:
        return styles.yellowBar;
      case 56:
        return styles.purpleBar;
      default:
        return styles.primaryBar;
    }
  };

  const networkTextStyle = (network: IApplicableNetwork) => {
    // if (network.chainId === activeNetwork.chainId) {
    //   return styles.whiteText;
    // } else {
    //   return styles.blackText;
    // }
  };

  const networkWrapperStyle = (network: IApplicableNetwork) => {
    // if (network.chainId === activeNetwork.chainId) {
    //   return networkBarStyle(network);
    // }
  };

  return (
    <BaseModal visibility={visibility} closeModal={closeModal}>
      <>
        <TodoText style={styles.modalTitle}>{t('selectNetwork')}</TodoText>

        <FlatList
          data={[]}
          scrollEnabled={true}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={[styles.networkWrapper, networkWrapperStyle(item)]}>
              <View style={[styles.bar, networkBarStyle(item)]} />
              <NetworkItem
                network={item}
                pressNetwork={selectNetwork}
                style={styles.networkItem}
                textStyle={[styles.text, networkTextStyle(item)]}
              />
            </View>
          )}
          keyExtractor={item => item?.chainId || '0'}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        />
      </>
    </BaseModal>
  );
};

export default NetworkModal;

const styles = StyleSheet.create({
  modalTitle: {
    textAlign: 'center',
    marginBottom: 1.5,
  },
  flatListContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: 'center',
  },
  networkWrapper: {
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 2,
  },
  bar: {
    width: 3,
    height: '100%',
    marginRight: 1,
  },
  redBar: {
    backgroundColor: 'red',
  },
  primaryBar: {
    backgroundColor: 'primary', // Replace 'primary' with your actual primary color
  },
  yellowBar: {
    backgroundColor: 'yellow',
  },
  purpleBar: {
    backgroundColor: 'purple',
  },
  networkItem: {
    paddingVertical: 3,
    paddingHorizontal: 2,
    flex: 1,
  },
  text: {
    fontSize: 14,
  },
  whiteText: {
    color: 'white',
  },
  blackText: {
    color: 'black',
  },
  separator: {
    height: 0.5,
    marginVertical: 2,
    backgroundColor: 'gray',
  },
});
