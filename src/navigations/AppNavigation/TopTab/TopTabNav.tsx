import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FeedScreen, MyPostScreen} from '../../../screens';

const PostTab = createMaterialTopTabNavigator();

const TopTabBar = () => {
  return (
    <PostTab.Navigator>
      <PostTab.Screen name="MyPosts" component={MyPostScreen} />
      <PostTab.Screen name="Feed" component={FeedScreen} />
    </PostTab.Navigator>
  );
};

export default TopTabBar;
