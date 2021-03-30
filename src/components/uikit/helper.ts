import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextProps,
  TextStyle,
} from 'react-native';
import {
  IModifiersSpacing,
  IModifiersStyling,
  IModifiersLayout,
  IModifiersText,
} from 'custom-ui-kit';
import { useRef, useEffect, MutableRefObject, useMemo } from 'react';
import { FormikProps } from 'formik';
import { memoize } from 'lodash';

const destructLayout = (props: IModifiersLayout) => {
  const style: StyleProp<ViewStyle> = {};
  style.alignItems = props.alignItems === true ? 'center' : props.alignItems;
  style.alignSelf = props.alignSelf === true ? 'center' : props.alignSelf;
  style.justifyContent =
    props.justifyContent === true ? 'center' : props.justifyContent;
  style.flex = props.flex === true ? 1 : props.flex;
  style.flexDirection = props.flexD;
  style.flexShrink = props.flexS;
  style.flexGrow = props.flexG;

  Object.keys(style).forEach((key) => {
    if (!Object(style)[key]) {
      delete Object(style)[key];
    }
    delete Object(props)[key];
  });

  return style;
};

const destructSpacing = (props: IModifiersSpacing) => {
  const style: StyleProp<ViewStyle> = {};
  style.margin = props.margin;
  style.marginVertical = props.marginV;
  style.marginHorizontal = props.marginH;
  style.marginLeft = props.marginL;
  style.marginRight = props.marginR;
  style.marginBottom = props.marginB;
  style.marginTop = props.marginT;
  style.padding = props.padding;
  style.paddingVertical = props.paddingV;
  style.paddingHorizontal = props.paddingH;
  style.paddingLeft = props.paddingL;
  style.paddingRight = props.paddingR;
  style.paddingBottom = props.paddingB;
  style.paddingTop = props.paddingT;
  style.width = props.width;
  style.height = props.height;

  Object.keys(style).forEach((key) => {
    if (!Object(style)[key]) {
      delete Object(style)[key];
    }
    delete Object(props)[key];
  });
  return style;
};

const destructStyling = (props: IModifiersStyling) => {
  const style: StyleProp<ViewStyle> = {};
  style.backgroundColor = props.bg;
  style.borderRadius = props.br;
  style.borderTopLeftRadius = props.brTL;
  style.borderTopRightRadius = props.brTR;
  style.borderBottomLeftRadius = props.brBL;
  style.borderBottomRightRadius = props.brBR;

  Object.keys(style).forEach((key) => {
    if (!Object(style)[key]) {
      delete Object(style)[key];
    }
    delete Object(props)[key];
  });

  return style;
};

const destructText = (props: IModifiersText & TextProps) => {
  const style: TextStyle = {};

  style.fontSize = props.fontSize || style.fontSize;
  style.color = props.color;
  style.fontFamily = props.fontFamily;
  style.fontStyle = props.fontStyle;
  style.fontWeight = props.bold ? 'bold' : undefined;
  style.letterSpacing = props.letterSpacing;
  style.textAlign = props.textCenter ? 'center' : undefined;
  style.textDecorationColor = props.underlineColor;
  style.textDecorationLine = props.underline ? 'underline' : undefined;
  style.textTransform = props.textTransform;

  const flatten = StyleSheet.flatten([style, props.style]);

  Object.keys(flatten).forEach((key) => {
    if (!Object(flatten)[key]) {
      delete Object(flatten)[key];
    }
    delete Object(props)[key];
  });
  return flatten;
};

const destructPropsToStyle = <T extends {}>(props: T) => {
  const layoutStyle = destructLayout(props);
  const spacingStyle = destructSpacing(props);
  const stylingStyle = destructStyling(props);
  const textStyle = destructText(props);

  return {
    dStyles: {
      layoutStyle,
      spacingStyle,
      stylingStyle,
      textStyle,
    },
    dProps: props,
  };
};

const useDestructProps = memoize((props: any) => {
  const { style, ...rest } = props;
  const result = useMemo(() => {
    const destruction = destructPropsToStyle(rest);
    return {
      dStyles: StyleSheet.flatten([
        style,
        destruction.dStyles.layoutStyle,
        destruction.dStyles.spacingStyle,
        destruction.dStyles.stylingStyle,
      ]),
      dProps: destruction.dProps,
    };
  }, [rest, style]);
  return result;
});

const useCombinedRefs = <T>(...refs: any[]): MutableRefObject<T> => {
  const targetRef = useRef<T>();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }
      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef as MutableRefObject<T>;
};

const destructFormikProps = (p: FormikProps<any>) => {
  const keys = [
    'initialValues',
    'initialErrors',
    'initialTouched',
    'initialStatus',
    'handleBlur',
    'handleChange',
    'handleReset',
    'handleSubmit',
    'resetForm',
    'setErrors',
    'setFormikState',
    'setFieldTouched',
    'setFieldValue',
    'setFieldError',
    'setStatus',
    'setSubmitting',
    'setTouched',
    'setValues',
    'submitForm',
    'validateForm',
    'validateField',
    'isValid',
    'dirty',
    'unregisterField',
    'registerField',
    'getFieldProps',
    'getFieldMeta',
    'getFieldHelpers',
    'validateOnBlur',
    'validateOnChange',
    'validateOnMount',
    'values',
    'errors',
    'touched',
    'isSubmitting',
    'isValidating',
    'status',
    'submitCount',
  ];

  keys.forEach((key) => delete Object(p)[key]);
};

export {
  destructPropsToStyle,
  useCombinedRefs,
  destructFormikProps,
  useDestructProps,
};
