import React, { ComponentType, memo } from 'react';
import { ViewStyle, StyleProp, View } from 'react-native';
import { IModifiersTest } from 'custom-ui-kit';
import { constants } from '@values';

export type IThickness = 'hairline' | number;

interface IDividerProps extends IModifiersTest {
  color?: string;
  thickness?: IThickness;
  style?: StyleProp<ViewStyle>;
  column?: boolean;
}

const FuncComponent = memo((props: IDividerProps) => {
  const { color, thickness, style, column } = props;
  const w = thickness === 'hairline' || !thickness ? constants.line : thickness;
  const dStyle = column
    ? { width: w, height: '100%', backgroundColor: color }
    : { height: w, width: '100%', backgroundColor: color };

  return <View style={[style, dStyle]} />;
});

(FuncComponent as ComponentType<IDividerProps>).defaultProps = {
  color: 'rgba(0,0,0,0.2)',
  thickness: 'hairline',
};

export default FuncComponent;
export const renderDivider = () => <FuncComponent />;
