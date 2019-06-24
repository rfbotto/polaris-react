import {I18n} from '../utilities/i18n';
import {ThemeProviderContextType} from '../utilities/theme';
import {ScrollLockManager} from '../utilities/scroll-lock-manager';
import {AppProviderContextType} from './AppProvider';

export interface PolarisContext extends AppProviderContextType {
  intl: I18n;
  scrollLockManager: ScrollLockManager | null;
  theme: ThemeProviderContextType;
}

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
