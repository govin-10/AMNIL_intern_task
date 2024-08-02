import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux';
import {checkToken, fetchCurrentUser} from '../../redux/features';
import {SplashScreen} from '../../screens';
import AuthStackNavigator from '../AuthNavigation/AuthNavigator';
import AppNav from '../AppNavigation/AppNav';

const RootStackNav: React.FC = () => {
  /*suru ma app load hunchha, cart ra current user lai set garera ani appload false rakhne, 
  cart ra user info chai throughout the app chaine vayera aile nai load gareko*/
  const [appLoading, setAppLoading] = useState<boolean>(true);

  const {token} = useSelector((state: RootState) => state.auth);

  const dispatch: AppDispatch = useDispatch();

  //dispatching auth and cart info when the app loads.
  useEffect(() => {
    const appinitialize = () => {
      setAppLoading(true); //just making sure apploading is true always when the app reloads.
      setTimeout(async () => {
        await dispatch(checkToken());
        if (token) {
          await dispatch(fetchCurrentUser()); //current user chai suru mai check garera user ko data user state ma set gareko
        }
        setAppLoading(false);
      }, 2000);
    };

    appinitialize();
  }, [dispatch]);

  if (appLoading) return <SplashScreen />;

  return token ? <AppNav /> : <AuthStackNavigator />;
};
export default RootStackNav;
