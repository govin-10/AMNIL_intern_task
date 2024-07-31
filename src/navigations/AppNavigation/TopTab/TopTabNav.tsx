import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FeedScreen, MyPostScreen} from '../../../screens';
import {COLOR} from '../../../constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const PostTab = createMaterialTopTabNavigator();

const TopTabBar = () => {
  return (
    <PostTab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'COLOR.CARD_BACKGROUND,',

          elevation: 0,
          padding: 5,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: COLOR.PRIMARY_TEXT,
        tabBarInactiveTintColor: COLOR.SECONDARY_TEXT,
      }}>
      <PostTab.Screen name="MyPosts" component={MyPostScreen} />
      <PostTab.Screen name="Feed" component={FeedScreen} />
    </PostTab.Navigator>
  );
};

export default TopTabBar;
