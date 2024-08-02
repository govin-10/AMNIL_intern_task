import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLOR} from '../../constants';
import Button from '../../utils/Buttons/Button';
import {IMAGE_PATH} from '../../utils/ImagePaths/ImagePaths';
import {login} from '../../redux/features';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {showToast} from '../../utils';

const LoginScreen: React.FC = () => {
  const [userName, setUserName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const userNameRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const {status} = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const handlePress = async () => {
    try {
      await dispatch(login({username: userName, password})).unwrap();
      showToast('success', 'login successful', 'Welcome to Amnilite');
    } catch (error) {
      showToast(
        'error',
        'login error, try again',
        'Please recheck your credentials',
      );
    }
  };

  const setPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {container, loginBox, inputBox, title, input} = styles;

  return (
    <SafeAreaView style={container}>
      <Image
        source={IMAGE_PATH.logo}
        style={{
          height: 100,
          width: 100,
          marginVertical: hp(10),
        }}
      />
      <View style={loginBox}>
        <View style={inputBox}>
          <Text style={title}>User Name</Text>
          <TextInput
            ref={userNameRef}
            keyboardType="email-address"
            style={input}
            autoCapitalize="none"
            value={userName}
            onChangeText={username => setUserName(username)}
          />
          <Text style={title}>Password</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              backgroundColor: COLOR.INPUT_BACKGROUND,
              justifyContent: 'space-between',
              paddingRight: 10,
            }}>
            <TextInput
              ref={passwordInputRef}
              secureTextEntry={!showPassword}
              style={[input, {flex: 1}]}
              autoCapitalize="none"
              value={password}
              onChangeText={password => setPassword(password)}
            />
            <TouchableOpacity onPress={setPasswordVisibility}>
              <EntypoIcon
                name={showPassword ? 'eye-with-line' : 'eye'}
                size={25}
                color={'blue'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title={
            status === 'loading' ? (
              <ActivityIndicator color={'white'} size={25} />
            ) : (
              'Sign In'
            )
          }
          onPress={handlePress}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_BACKGROUND,
    alignItems: 'center',
  },
  loginBox: {
    backgroundColor: COLOR.CARD_BACKGROUND,
    flex: 1,
    borderTopLeftRadius: hp(5),
    borderTopRightRadius: hp(5),
    elevation: 5,
    width: '100%',
    padding: wp(3),
  },
  inputBox: {
    marginVertical: hp(2),
    width: '100%',
  },
  title: {
    color: COLOR.PRIMARY_TEXT,
    fontSize: hp(2.2),
    fontWeight: 'bold',
    marginVertical: hp(1),
  },
  input: {
    backgroundColor: COLOR.INPUT_BACKGROUND,
    padding: wp(3.5),
    color: COLOR.PRIMARY_TEXT,
    fontSize: wp(5),
  },
});
