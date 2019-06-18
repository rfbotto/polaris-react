import {useContext} from 'react';
// eslint-disable-next-line shopify/strict-component-boundaries
import {AppProviderContext} from '../components/AppProvider';

export function useAppBridge() {
  return useContext(AppProviderContext).appBridge;
}
