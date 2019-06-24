import {Intl} from '../utilities/intl';
import {ThemeProviderContextType} from '../utilities/theme';
import {ScrollLockManager} from '../utilities/scroll-lock-manager';
import {AppProviderContextType} from './AppProvider';

export interface PolarisContext extends AppProviderContextType {
  intl: Intl;
  scrollLockManager: ScrollLockManager | null;
  theme: ThemeProviderContextType;
}

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
