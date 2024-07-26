import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {checkToken} from '../../redux/features/auth/authSlice';
import {SplashScreen} from '../../screens';
import AuthStackNavigator from '../AuthNavigation/AuthNavigator';
import AppNav from '../AppNavigation/AppNav';

const RootStackNav = () => {
  const {token, status} = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(checkToken());
    }, 2000);
  }, [dispatch]);

  console.log('tt', token);

  if (status === 'loading') {
    return <SplashScreen />;
  }

  return token ? <AppNav /> : <AuthStackNavigator />;
};
export default RootStackNav;
