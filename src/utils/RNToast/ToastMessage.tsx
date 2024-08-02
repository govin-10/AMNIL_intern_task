import Toast from 'react-native-toast-message';

const showToast = (
  type: 'success' | 'error' | 'info',
  text1: string,
  text2?: string,
) => {
  Toast.show({
    type,
    text1,
    text2,
    visibilityTime: 1500,
  });
};

export default showToast;
