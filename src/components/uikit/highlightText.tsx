import React, { ComponentType, memo, PropsWithChildren } from 'react';
import {
  Text,
  TextProps,
  StyleProp,
  TextStyle,
  StyleSheet,
} from 'react-native';
import {
  IModifiersSpacing,
  IModifiersStyling,
  IModifiersText,
  IModifiersLayout,
  IModifiersTest,
} from 'custom-ui-kit';

import { useDestructProps } from './helper';
import { colors } from '@values';

interface Props
  extends TextProps,
    IModifiersSpacing,
    IModifiersStyling,
    IModifiersText,
    IModifiersLayout,
    IModifiersTest {
  text?: string;
  highlight?: string;
  highlightStyle?: StyleProp<TextStyle>;
  highlightBold?: boolean;
  quote?: 'single' | 'double' | undefined;
  sections?: Array<string | null | undefined>;
  highlightIndex?: number;
}

export type ITextProps = PropsWithChildren<Props>;

const FuncComponent = memo((props: PropsWithChildren<ITextProps>) => {
  const {
    highlight = '',
    highlightBold,
    highlightStyle,
    quote,
    text = '',
    sections,
    highlightIndex,
    ...rest
  } = props;
  const { dProps, dStyles } = useDestructProps(rest);
  const boldStyle = highlightBold ? styles.bold : undefined;

  const index = text.indexOf(highlight);

  if (index === -1) {
    return <Text {...dProps} style={dStyles} />;
  }

  let dSections: Array<string | null | undefined> = [];
  let dIndex: number;

  const mapHighlight = (n: string) => {
    return quote === 'single' ? `'${n}'` : quote === 'double' ? `"${n}"` : n;
  };

  if (Array.isArray(sections) && highlightIndex) {
    dSections = sections;
    dIndex = highlightIndex;
  } else {
    dSections = [
      text.substring(0, index),
      mapHighlight(highlight),
      text.substring(index + highlight.length),
    ];
    dIndex = 1;
  }

  delete props.children;

  return (
    <Text>
      {dSections.map((section, i) => {
        const s = i === dIndex ? [dStyles, highlightStyle, boldStyle] : dStyles;
        return (
          <Text {...dProps} style={s} key={`highlight-text-${i}`}>
            {i === dIndex ? mapHighlight(section || '') : section}{' '}
          </Text>
        );
      })}
    </Text>
  );
});

(FuncComponent as ComponentType<ITextProps>).defaultProps = {
  color: colors.textColor,
  highlightBold: true,
};

export default FuncComponent;

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
});
