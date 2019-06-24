import createApp, {
  getShopOrigin,
  LifecycleHook,
  DispatchActionHook,
} from '@shopify/app-bridge';
import {AppProviderContextType} from '../../context';
import {AppProviderProps} from '../../types';
import StickyManager from '../StickyManager';
import {Link} from '../../../../utilities/unstyled-link';
import {polarisVersion} from '../../../../configure';
import {Discard} from '../../../../types';

type AppProviderOptions = Discard<AppProviderProps, 'i18n'>;
export interface CreateAppProviderContext extends AppProviderOptions {
  stickyManager?: StickyManager;
}

export default function createAppProviderContext({
  linkComponent,
  apiKey,
  shopOrigin,
  forceRedirect,
  stickyManager,
}: CreateAppProviderContext = {}): AppProviderContextType {
  const link = new Link(linkComponent);
  const appBridge = apiKey
    ? createApp({
        apiKey,
        shopOrigin: shopOrigin || getShopOrigin(),
        forceRedirect,
      })
    : undefined;

  if (appBridge != null) {
    // eslint-disable-next-line no-console
    console.warn(
      "Deprecation: Using `apiKey` and `shopOrigin` on `AppProvider` to initialize the Shopify App Bridge is deprecated. Support for this will be removed in v5.0. Use `Provider` from `@shopify/app-bridge-react` instead. For example, `import {Provider} from '@shopify/app-bridge-react';`",
    );
  }

  if (appBridge && appBridge.hooks) {
    appBridge.hooks.set(LifecycleHook.DispatchAction, setClientInterfaceHook);
  }

  return {
    link,
    stickyManager: stickyManager || new StickyManager(),
    appBridge,
  };
}

export const setClientInterfaceHook: DispatchActionHook = function(next) {
  return function(action) {
    action.clientInterface = {
      name: '@shopify/polaris',
      version: polarisVersion,
    };
    return next(action);
  };
};
