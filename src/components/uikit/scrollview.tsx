import React, { ComponentType, forwardRef, memo } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { IModifiersTest } from 'custom-ui-kit';

interface IScrollViewProps extends ScrollViewProps, IModifiersTest {}

const FuncComponent = memo(
  forwardRef<ScrollView, IScrollViewProps>((props, ref) => {
    return <ScrollView {...props} ref={ref} />;
  }),
);

(FuncComponent as ComponentType<IScrollViewProps>).defaultProps = {
  keyboardShouldPersistTaps: 'handled',
};

export default FuncComponent;
