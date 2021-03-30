import React, { memo, forwardRef, PropsWithChildren } from 'react';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';

import {
  IModifiersSpacing,
  IModifiersStyling,
  IModifiersLayout,
  IModifiersTest,
} from 'custom-ui-kit';

import { useDestructProps } from './helper';

interface Props
  extends Omit<TouchableOpacityProps, 'onPress'>,
    IModifiersSpacing,
    IModifiersStyling,
    IModifiersLayout,
    IModifiersTest {
  onPress?: (e: any) => void;
}

type ITouchableProps = PropsWithChildren<Props>;

const FuncComponent = memo(
  forwardRef<TouchableOpacity, ITouchableProps>((props, ref) => {
    const { children, ...rest } = props;
    const { dProps, dStyles } = useDestructProps(rest);

    return (
      <TouchableOpacity {...dProps} ref={ref} style={dStyles}>
        {children}
      </TouchableOpacity>
    );
  }),
);

export default FuncComponent;
