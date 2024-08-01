import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLOR} from '../../constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface IButtonProps {
  title: any;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
  textStyles?: object;
}

const Button: React.FC<IButtonProps> = ({
  title,
  onPress,
  style,
  textStyles,
}) => {
  const {buttonStyle, text} = styles;

  return (
    <TouchableOpacity style={[buttonStyle, style]} onPress={onPress}>
      <Text style={[text, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLOR.PRIMARY_BUTTON_BG,
    padding: hp(2),
    borderRadius: hp(2),
  },
  text: {
    color: COLOR.PRIMARY_BUTTON_TEXT,
    fontSize: hp(2.1),
    fontWeight: '600',
    textAlign: 'center',
  },
});
