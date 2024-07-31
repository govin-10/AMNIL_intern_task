import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface IScreenWithBack {
  navigation: any;
  hasName?: string;
}

const ScreenWithBack: React.FC<IScreenWithBack> = () => {
  return (
    <View>
      <Text>ScreenWithBack</Text>
    </View>
  );
};

export default ScreenWithBack;

const styles = StyleSheet.create({});
