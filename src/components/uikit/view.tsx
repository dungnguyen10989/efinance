import React, { forwardRef, memo } from 'react';
import { View, ViewProps } from 'react-native';
import {
  IModifiersSpacing,
  IModifiersStyling,
  IModifiersLayout,
  IModifiersTest,
} from 'custom-ui-kit';
import { useDestructProps } from './helper';

export interface IViewProps
  extends React.PropsWithChildren<ViewProps>,
    IModifiersSpacing,
    IModifiersStyling,
    IModifiersLayout,
    IModifiersTest {}

const FuncComponent = memo(
  forwardRef<View, IViewProps>((props, ref) => {
    const { dProps, dStyles } = useDestructProps(props);
    return <View {...dProps} ref={ref} style={dStyles} />;
  }),
);

export default FuncComponent;
