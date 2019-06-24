import {useContext} from 'react';
/* eslint-disable shopify/strict-component-boundaries */
import {AppProviderContext} from '../components/AppProvider';
import {PolarisContext} from '../components/types';
/* eslint-enable shopify/strict-component-boundaries */
import {Omit} from '../types';
import {ThemeProviderContext} from './theme';

export function usePolaris() {
  const polaris = useContext(AppProviderContext);

  if (Object.keys(polaris).length < 1) {
    throw new Error(
      `The <AppProvider> component is required as of v2.0 of Polaris React. See
                  https://polaris.shopify.com/components/structure/app-provider for implementation
                  instructions.`,
    );
  }

  const polarisTheme = useContext(ThemeProviderContext);

  // Intl/ScrollLockManager exist on PolarisContent for legacy reasons.
  // This hook will be removed when we finished moving
  // all our utilities so I feel we don't need a new type.
  const polarisContext: Omit<PolarisContext, 'intl' | 'scrollLockManager'> = {
    ...polaris,
    theme: polarisTheme,
  };

  return polarisContext;
}
