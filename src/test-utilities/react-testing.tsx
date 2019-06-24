import React from 'react';
import {createMount} from '@shopify/react-testing';
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
import {I18n, I18nContext, TranslationDictionary} from '../utilities/i18n';
import translations from '../../locales/en.json';
import {PolarisContext} from '../components/types';
import {DeepPartial, Discard} from '../types';
import merge from '../utilities/merge';

interface ComplexProviders {
  polaris: PolarisContext;
  themeProvider: ThemeProviderContextType;
  frame: FrameContextType;
}
interface SimpleProviders {
  intl: TranslationDictionary | TranslationDictionary[];
  scrollLockManager: ScrollLockManager;
}
type ReturnedContext = ComplexProviders &
  Discard<SimpleProviders, 'intl'> & {
    intl: I18n;
  };
type Options = DeepPartial<ComplexProviders> & Partial<SimpleProviders>;
type Context = ReturnedContext;
interface Props extends ReturnedContext {
  children: React.ReactElement<any>;
}

function noop() {}

function TestProvider({
  children,
  polaris,
  themeProvider,
  frame,
  intl,
  scrollLockManager,
  ...props
}: Props) {
  const childWithProps =
    Object.keys(props).length > 0
      ? React.cloneElement(children, props)
      : children;

  return (
    <AppProviderContext.Provider value={polaris}>
      <I18nContext.Provider value={intl}>
        <ScrollLockManagerContext.Provider value={scrollLockManager}>
          <ThemeProviderContext.Provider value={themeProvider}>
            <FrameContext.Provider value={frame}>
              {childWithProps}
            </FrameContext.Provider>
          </ThemeProviderContext.Provider>
        </ScrollLockManagerContext.Provider>
      </I18nContext.Provider>
    </AppProviderContext.Provider>
  );
}

export const mountWithContext = createMount<Options, Context>({
  context({polaris, themeProvider, frame, intl, scrollLockManager}) {
    const polarisContextDefault = createPolarisContext();
    const polarisContext =
      (polaris && merge(polarisContextDefault, polaris)) ||
      polarisContextDefault;

    const intlTranslations =
      (intl && merge(translations, intl)) || translations;
    const intlContext = new I18n(intlTranslations);

    const scrollLockManagerContext =
      scrollLockManager || new ScrollLockManager();

    const themeproviderContextDefault = createThemeContext();
    const themeProviderContext =
      (themeProvider && merge(themeproviderContextDefault, themeProvider)) ||
      themeproviderContextDefault;

    const frameContextDefault = {
      showToast: noop,
      hideToast: noop,
      setContextualSaveBar: noop,
      removeContextualSaveBar: noop,
      startLoading: noop,
      stopLoading: noop,
    };
    const frameContext =
      (frame && merge(frameContextDefault, frame)) || frameContextDefault;

    return {
      polaris: polarisContext,
      themeProvider: themeProviderContext,
      frame: frameContext,
      intl: intlContext,
      scrollLockManager: scrollLockManagerContext,
    };
  },
  render(element, {polaris, themeProvider, frame, intl, scrollLockManager}) {
    return (
      <TestProvider
        polaris={polaris}
        intl={intl}
        scrollLockManager={scrollLockManager}
        themeProvider={themeProvider}
        frame={frame}
      >
        {element}
      </TestProvider>
    );
  },
});
