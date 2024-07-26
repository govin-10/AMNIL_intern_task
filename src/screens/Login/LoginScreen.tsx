import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLOR} from '../../constants';
import Button from '../../utils/Buttons/Button';
import {IMAGE_PATH} from '../../utils/ImagePaths/ImagePaths';
import {login} from '../../redux/features/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [userName, setUserName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const userNameRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const {user, token, refreshToken, status, error} = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch: AppDispatch = useDispatch();

  const handlePress = async () => {
    console.log('button pressed');

    const credential = {username: userName, password};
    console.log(credential);
    await dispatch(login(credential));
  };

  const {container, loginBox, inputBox, title, input} = styles;

  return (
    <SafeAreaView style={container}>
      <Image source={IMAGE_PATH.logo} style={{height: 200, width: 200}} />
      <View style={loginBox}>
        <View style={inputBox}>
          <Text style={title}>Email Address</Text>
          <TextInput
            ref={userNameRef}
            keyboardType="email-address"
            style={input}
            autoCapitalize="none"
            value={userName}
            onChangeText={username => setUserName(username)}
          />
          <Text style={title}>Password</Text>
          <TextInput
            ref={passwordInputRef}
            secureTextEntry
            style={input}
            autoCapitalize="none"
            value={password}
            onChangeText={password => setPassword(password)}
          />
        </View>
        <Button title="Sign In" onPress={handlePress} />
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
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
  },
  inputBox: {
    marginVertical: hp(2),
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
  },
});
