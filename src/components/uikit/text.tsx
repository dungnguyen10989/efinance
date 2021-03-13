import React, {
  ComponentType,
  forwardRef,
  memo,
  PropsWithChildren,
} from 'react';
import { Text, TextProps } from 'react-native';
import {
  IModifiersSpacing,
  IModifiersStyling,
  IModifiersText,
  IModifiersLayout,
  IModifiersTest,
} from 'custom-ui-kit';

import { useDestructProps } from './helper';
import { colors } from '@values';

export interface Props
  extends TextProps,
    IModifiersSpacing,
    IModifiersStyling,
    IModifiersText,
    IModifiersLayout,
    IModifiersTest {}

type ITextProps = PropsWithChildren<Props>;

const FuncComponent = memo(
  forwardRef<Text, ITextProps>((props, ref) => {
    const { dProps, dStyles } = useDestructProps(props);
    return <Text {...dProps} ref={ref} style={dStyles} />;
  }),
);

(FuncComponent as ComponentType<ITextProps>).defaultProps = {
  color: colors.textColor,
};

export default FuncComponent;
