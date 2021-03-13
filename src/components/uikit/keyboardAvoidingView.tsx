import { isNumber } from 'lodash';
import React, { memo, PropsWithChildren, useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Constants } from 'react-native-navigation';
import commonStyles from './styles';

interface IKeyboardAvoidingViewProps extends PropsWithChildren<any> {
  keyboardVerticalOffset?: number;
}

const FuncComponent = memo((props: IKeyboardAvoidingViewProps) => {
  const [height, setHeight] = useState<number | undefined>(undefined);
  useEffect(() => {
    Constants.get().then((values) => setHeight(values.topBarHeight));
  }, []);

  const offset = props.keyboardVerticalOffset;
  const dOffset = isNumber(offset) ? offset : height;

  if (height === undefined) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={dOffset}
      behavior="padding"
      style={commonStyles.flex1}>
      {props.children}
    </KeyboardAvoidingView>
  );
});

export default FuncComponent;
