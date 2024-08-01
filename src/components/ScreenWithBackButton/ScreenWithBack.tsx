import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactNode} from 'react';
import IoniIcons from 'react-native-vector-icons/Ionicons';
import {heightPercentageToDP} from 'react-native-responsive-screen';

interface IScreenWithBack {
  navigation: any;
  hasName?: string;
  children: ReactNode;
}

const ScreenWithBack: React.FC<IScreenWithBack> = ({navigation, children}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}>
        <IoniIcons name="arrow-back" size={25} color={'black'} />
      </TouchableOpacity>
      {children}
    </View>
  );
};

export default ScreenWithBack;

const styles = StyleSheet.create({
  backIcon: {
    marginVertical: heightPercentageToDP(1.5),
  },
});
