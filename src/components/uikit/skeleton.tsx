import React, {
  memo,
  useCallback,
  ComponentType,
  useMemo,
  useRef,
} from 'react';
import {
  StyleSheet,
  Animated,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
  FlatList,
  View,
  useWindowDimensions,
} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import { constants } from '@values';

const mediaSize = 60;
const defaultCount = 5;

interface Skeleton {
  mediaCircle?: boolean;
}

interface ISkeleton {
  count?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const Item = memo((props: Skeleton) => {
  const animated = useRef<any[]>([]);
  const unmounted = useRef(false);
  const { width } = useWindowDimensions();

  const runAvatarReverseAnimated = useCallback(() => {
    if (Array.isArray(animated.current) && animated.current.length > 0) {
      Animated.stagger(400, [
        animated.current[0].getAnimated(), // image left
        Animated.parallel(
          animated.current
            .slice(0, animated.current.length)
            .map((animate) =>
              animate && animate.getAnimated ? animate.getAnimated() : null,
            ),
          { stopTogether: false },
        ),
      ]).start(() => {
        if (!unmounted.current) {
          runAvatarReverseAnimated();
        }
      });
    }
  }, []);

  const addRef = useCallback((ref: any) => animated.current.push(ref), []);

  const renderRowsReverse = useCallback(
    (number: number) => {
      const shimmerRows: Array<JSX.Element> = [];
      for (let index = 0; index < number; index++) {
        const fullWidth = width - mediaSize - constants.dfPadding * 3;
        const dWidth = index === 0 ? fullWidth * 0.8 : fullWidth;
        shimmerRows.push(
          <ShimmerPlaceHolder
            key={`loading-${index}`}
            ref={addRef}
            width={dWidth}
            style={styles.line}
            duration={1500}
          />,
        );
      }
      return <View>{shimmerRows}</View>;
    },
    [addRef, width],
  );

  return (
    <>
      <View style={styles.container}>
        <ShimmerPlaceHolder
          ref={addRef}
          width={mediaSize}
          height={mediaSize}
          style={[styles.media, props.mediaCircle ? styles.circle : undefined]}
        />
        {renderRowsReverse(3)}
      </View>
    </>
  );
});

const FuncComponent = memo((props: ISkeleton) => {
  const renderItem = useCallback(
    (info: ListRenderItemInfo<number>) => (
      <Item mediaCircle={info.index % 2 === 0} />
    ),
    [],
  );

  const divider = useCallback(() => <View style={styles.divider} />, []);
  const data = useMemo(
    () => Array.from<number>({ length: props.count || defaultCount }),
    [props.count],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={divider}
      scrollEnabled={false}
      contentContainerStyle={props.contentContainerStyle}
    />
  );
});

(FuncComponent as ComponentType<ISkeleton>).defaultProps = {
  count: defaultCount,
};

export default FuncComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: constants.dfPadding,
  },
  line: {
    marginBottom: 7,
  },
  media: {
    marginRight: constants.dfPadding,
    borderRadius: 2,
  },
  circle: {
    borderRadius: mediaSize / 2,
  },
  divider: {
    marginTop: constants.dfPadding,
  },
});
