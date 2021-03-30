import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { IModifiersTest } from 'custom-ui-kit';
import { getOr } from 'lodash/fp';

export interface IFlatListProps extends FlatListProps<any>, IModifiersTest {
  keyEx?: string;
  separator?: JSX.Element;
  empty?: JSX.Element;
}

const FuncComponent = memo(
  forwardRef<FlatList, IFlatListProps>((props, ref) => {
    const momentum = useRef(true);

    const {
      separator,
      ItemSeparatorComponent,
      ListEmptyComponent,
      keyExtractor,
      keyEx,
      onEndReached,
      empty,
      ...rest
    } = props;

    const _keyExtractor = useCallback(
      (item: any, index: number): string => {
        if (keyExtractor) {
          return keyExtractor(item, index);
        }
        return getOr(`key-${index}`, 'keyEx', item);
      },
      [keyExtractor],
    );

    const onMomentumScrollBegin = useCallback(() => {
      momentum.current = false;
    }, [momentum]);

    const _onEndReached = useCallback(
      (e: any) => {
        if (!momentum.current && e.distanceFromEnd > 0) {
          onEndReached?.(e);
          momentum.current = true;
        }
      },
      [momentum, onEndReached],
    );

    const renderSeparator = useCallback(() => {
      if (separator) {
        return separator;
      }
      return ItemSeparatorComponent ? <ItemSeparatorComponent /> : null;
    }, [separator, ItemSeparatorComponent]);

    const renderEmpty = useMemo(() => empty || ListEmptyComponent, [
      ListEmptyComponent,
      empty,
    ]);

    return (
      <FlatList
        {...rest}
        ref={ref}
        keyExtractor={_keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onEndReached={_onEndReached}
        ListEmptyComponent={renderEmpty}
      />
    );
  }),
);

(FuncComponent as React.ComponentType<IFlatListProps>).defaultProps = {
  onEndReachedThreshold: 0.1,
};

export default FuncComponent;
