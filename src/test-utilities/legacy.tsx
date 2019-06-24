import {ReactWrapper, CommonWrapper, mount} from 'enzyme';
import React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {I18n, I18nContext, TranslationDictionary} from '../utilities/i18n';
import {get} from '../utilities/get';
import merge from '../utilities/merge';
import {PolarisContext} from '../components/types';
import {DeepPartial} from '../types';
import translations from '../../locales/en.json';

// eslint-disable-next-line shopify/strict-component-boundaries
import {
  createPolarisContext,
  AppProviderContext,
} from '../components/AppProvider';
// eslint-disable-next-line shopify/strict-component-boundaries
import {FrameContext, FrameContextType} from '../components/Frame';
import {
  createThemeContext,
  ThemeProviderContextType,
  ThemeProviderContext,
} from '../utilities/theme';
import {
  ScrollLockManager,
  ScrollLockManagerContext,
} from '../utilities/scroll-lock-manager';

export type AnyWrapper = ReactWrapper<any, any> | CommonWrapper<any, any>;

export function findByTestID(root: ReactWrapper<any, any>, id: string) {
  function hasTestID(wrapper: ReactWrapper<any, any>) {
    return wrapper.length > 0 && wrapper.prop('testID') === id;
  }

  return root.findWhere(hasTestID).first();
}

export function matchByTestID(root: ReactWrapper<any, any>, regexp: RegExp) {
  function matchesTestID(wrapper: ReactWrapper<any, any>) {
    const id = wrapper.prop('testID');
    return typeof id === 'string' && regexp.test(id);
  }

  return root.findWhere(matchesTestID);
}

export function trigger(wrapper: AnyWrapper, keypath: string, ...args: any[]) {
  if (wrapper.length === 0) {
    throw new Error(
      [
        `You tried to trigger ${keypath} on a React wrapper with no matching nodes.`,
        'This generally happens because you have either filtered your React components incorrectly,',
        'or the component you are looking for is not rendered because of the props on your component,',
        'or there is some error during one of your component’s render methods.',
      ].join(' '),
    );
  }

  const props = wrapper.props();
  const callback = get(props, keypath);

  if (callback == null) {
    throw new Error(
      `No callback found at keypath '${keypath}'. Available props: ${Object.keys(
        props,
      ).join(', ')}`,
    );
  }

  // eslint-disable-next-line callback-return
  const returnValue = callback(...args);
  updateRoot(wrapper);

  if (returnValue instanceof Promise) {
    return returnValue.then((ret) => {
      updateRoot(wrapper);
      return ret;
    });
  }

  return returnValue;
}

function updateRoot(wrapper: AnyWrapper) {
  (wrapper as any).root().update();
}

type AppContext = {
  polaris: PolarisContext;
  intl: I18n;
  scrollLockManager: ScrollLockManager;
  themeProvider: ThemeProviderContextType;
  frame: FrameContextType;
};

interface AppContextOptions {
  app: AppContext;
}

interface MountWithAppProviderOptions {
  context?: {
    polaris?: DeepPartial<PolarisContext>;
    themeProvider?: DeepPartial<ThemeProviderContextType>;
    frame?: DeepPartial<FrameContextType>;
    intl?: TranslationDictionary | TranslationDictionary[];
    scrollLockManager?: ScrollLockManager;
  };
}

export function mountWithAppProvider<P>(
  node: React.ReactElement<P>,
  options: MountWithAppProviderOptions = {},
): PolarisContextReactWrapper<P, any> {
  const {context: ctx = {}} = options;

  const polarisDefault = createPolarisContext({i18n: translations});
  const polaris =
    (ctx.polaris && merge(polarisDefault, ctx.polaris)) || polarisDefault;

  const intlTranslations =
    (ctx.intl && merge(translations, ctx.intl)) || translations;
  const intl = new I18n(intlTranslations);

  const scrollLockManager = ctx.scrollLockManager || new ScrollLockManager();

  const themeproviderDefault = createThemeContext();
  const themeProvider =
    (ctx.themeProvider && merge(themeproviderDefault, ctx.themeProvider)) ||
    themeproviderDefault;

  const frameDefault = {
    showToast: noop,
    hideToast: noop,
    setContextualSaveBar: noop,
    removeContextualSaveBar: noop,
    startLoading: noop,
    stopLoading: noop,
  };
  const frame = (ctx.frame && merge(frameDefault, ctx.frame)) || frameDefault;

  const context: AppContext = {
    polaris,
    themeProvider,
    frame,
    intl,
    scrollLockManager,
  };

  const wrapper = polarisContextReactWrapper(node, {
    app: context,
  });

  return wrapper;
}

type PolarisContextReactWrapper<P, S> = ReactWrapper<P, S> & AppContextOptions;

export function polarisContextReactWrapper<P, S>(
  element: React.ReactElement<P>,
  {app}: AppContextOptions,
): PolarisContextReactWrapper<P, S> {
  function TestProvider<P>(props: P) {
    let content: React.ReactNode = element;

    if (Object.keys(props).length > 0) {
      content = React.cloneElement(React.Children.only(element), props);
    }

    return (
      <AppProviderContext.Provider value={app.polaris}>
        <I18nContext.Provider value={app.intl}>
          <ScrollLockManagerContext.Provider value={app.scrollLockManager}>
            <ThemeProviderContext.Provider value={app.themeProvider}>
              <FrameContext.Provider value={app.frame}>
                {content}
              </FrameContext.Provider>
            </ThemeProviderContext.Provider>
          </ScrollLockManagerContext.Provider>
        </I18nContext.Provider>
      </AppProviderContext.Provider>
    );
  }

  const wrapper = mount<P, S>(<TestProvider />);

  Object.defineProperty(wrapper, 'app', {
    enumerable: true,
    writable: false,
    configurable: false,
    value: app,
  });

  return wrapper as PolarisContextReactWrapper<P, S>;
}
