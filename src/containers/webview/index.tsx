import React, {
  useState,
  MutableRefObject,
  useCallback,
  memo,
  useRef,
} from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { IScreen } from 'screen-props';
import { t } from '@i18n';
import { assets } from '@assets';
import { colors, constants, variants } from '@values';
import { DVectorIcons } from '@components/uikit';

interface Props extends IScreen {
  uri: string;
}
const defaultUri = 'https://google.com.vn';

const FuncComponent = memo((props: Props) => {
  const webviewRef = useRef<WebView>() as MutableRefObject<WebView>;
  const inputRef = useRef<TextInput>() as MutableRefObject<TextInput>;

  const [refreshing, setRefreshing] = useState(false);
  const [uriSearch, setUriSearch] = useState(defaultUri);
  const [uri, setUri] = useState(props.uri || defaultUri);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const onSubmitEditing = useCallback(() => {
    if (uriSearch) {
      const enhance = uriSearch.startsWith('http')
        ? uriSearch
        : `http://${uriSearch}`;

      setUri(enhance);
    }
  }, [uriSearch]);

  const onChangeText = useCallback((text: string) => {
    setUriSearch(text);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    webviewRef.current?.reload();
  }, []);

  const onLoadStart = useCallback(() => {
    // PopupManager.showProtectedOverlay();
  }, []);

  const onLoadEnd = useCallback(() => {
    setRefreshing(false);
  }, []);

  const onClose = useCallback(() => {
    // props.navigation.goBack();
  }, []);

  const renderLoading = useCallback(() => {
    return <View />;
  }, []);

  const renderError = useCallback(
    (errorDomain: string | undefined, errorCode: number, errorDesc: string) => {
      if (!errorDomain && !errorCode && !errorDesc) {
        return <View />;
      }
      return (
        <View style={styles.emptyWrapper}>
          <Image source={assets.icon.ic_empty} style={styles.empty} />
          <Text>{t('emptyContent')}</Text>
        </View>
      );
    },
    [],
  );

  const onNavigationStateChange = useCallback((e: WebViewNavigation) => {
    setCanGoBack(e.canGoBack);
    setCanGoForward(e.canGoForward);
    setUriSearch(e.url);
  }, []);

  const onClear = useCallback(() => {
    setUriSearch('');
    inputRef.current?.focus();
  }, []);

  const onBack = useCallback(() => {
    webviewRef.current?.goBack();
  }, []);

  const onForward = useCallback(() => {
    webviewRef.current?.goForward();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backWrapper}
            onPress={onBack}
            disabled={!canGoBack}>
            <Image
              source={assets.icon.ic_back}
              style={[
                styles.iconBack,
                !canGoBack ? styles.disabled : undefined,
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backWrapper}
            onPress={onForward}
            disabled={!canGoForward}>
            <Image
              source={assets.icon.ic_back}
              style={[
                styles.iconBack,
                styles.iconForward,
                !canGoForward ? styles.disabled : undefined,
              ]}
            />
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <Image source={assets.icon.ic_search} style={styles.iconSearch} />

            <TextInput
              ref={inputRef}
              style={styles.input}
              value={uriSearch}
              onChangeText={onChangeText}
              returnKeyType="go"
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit
              keyboardType="url"
              clearButtonMode="never"
              placeholder={t('enterAddress')}
              onSubmitEditing={onSubmitEditing}
              selectTextOnFocus
            />

            {uriSearch ? (
              <TouchableOpacity onPress={onClear}>
                <Image source={assets.icon.ic_close} style={styles.iconClose} />
              </TouchableOpacity>
            ) : null}
          </View>
          <DVectorIcons
            size={30}
            color={colors.error}
            name="x"
            provider="Feather"
            onPress={onClose}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <WebView
          ref={webviewRef}
          source={{ uri }}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          renderLoading={renderLoading}
          renderError={renderError}
          style={styles.webview}
          onNavigationStateChange={onNavigationStateChange}
        />
      </ScrollView>
    </View>
  );
});

export default FuncComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flexGrow: -1,
    flex: 0,
  },
  emptyWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  empty: {
    width: 100,
    height: 100,
    tintColor: colors.gray,
  },
  headerWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.silver,
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    paddingHorizontal: constants.dfPadding,
    paddingVertical: constants.halfPadding,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backWrapper: {
    marginRight: constants.halfPadding,
  },
  iconBack: {
    width: 20,
    height: 20,
    tintColor: colors.black,
  },
  iconForward: {
    transform: [
      {
        rotateZ: '180deg',
      },
    ],
  },
  disabled: {
    tintColor: colors.silver,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    borderColor: colors.silver,
    paddingHorizontal: constants.halfPadding,
    marginRight: constants.halfPadding,
  },
  input: {
    flex: 1,
    paddingVertical: constants.halfPadding,
    color: colors.gray,
    height: 40,
    marginHorizontal: constants.halfPadding,
  },
  iconSearch: {
    width: variants.h4,
    height: variants.h4,
    tintColor: colors.silver,
  },
  closeWrapper: {
    backgroundColor: colors.gray,
  },
  iconClose: {
    width: variants.h3,
    height: variants.h3,
    tintColor: colors.silver,
  },
});
