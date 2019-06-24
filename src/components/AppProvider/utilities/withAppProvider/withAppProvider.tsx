import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {ClientApplication} from '@shopify/app-bridge';
import {Intl, IntlContext} from '../../../../utilities/intl';
import {Link} from '../../../../utilities/unstyled-link';
import {
  ScrollLockManager,
  ScrollLockManagerContext,
} from '../../../../utilities/scroll-lock-manager';
import {
  ThemeProviderContextType,
  ThemeProviderContext,
} from '../../../../utilities/theme';
import {PolarisContext} from '../../../types';
import AppProviderContext from '../../context';
import StickyManager from '../StickyManager';

export type ReactComponent<P, C> =
  | React.ComponentClass<P> & C
  | React.SFC<P> & C;

export interface WithAppProviderProps {
  polaris: {
    intl: Intl;
    link: Link;
    stickyManager: StickyManager;
    scrollLockManager: ScrollLockManager | null;
    theme?: ThemeProviderContextType;
    appBridge?: ClientApplication<{}>;
  };
}

export interface Options {
  withinScrollable?: boolean;
}

function withScrollable<P, T>(WrappedComponent: ReactComponent<P, T>) {
  class WithScrollable extends React.Component {
    static contextTypes = WrappedComponent.contextTypes;
    private stickyManager: StickyManager = new StickyManager();

    render() {
      return (
        <AppProviderContext.Consumer>
          {(polaris) => (
            <AppProviderContext.Provider
              value={{
                ...polaris,
                stickyManager: this.stickyManager,
              }}
            >
              <WrappedComponent {...this.props as any} />
            </AppProviderContext.Provider>
          )}
        </AppProviderContext.Consumer>
      );
    }
  }

  return WithScrollable;
}

export default function withAppProvider<OwnProps>({
  withinScrollable,
}: Options = {}) {
  return function addProvider<C>(
    WrappedComponent: ReactComponent<OwnProps & WithAppProviderProps, C>,
  ): React.ComponentClass<OwnProps> & C {
    // eslint-disable-next-line react/prefer-stateless-function
    class WithProvider extends React.Component<OwnProps, never> {
      static contextTypes = WrappedComponent.contextTypes;

      render() {
        return (
          <AppProviderContext.Consumer>
            {(polaris) => {
              return (
                <ThemeProviderContext.Consumer>
                  {(polarisTheme) => {
                    return (
                      <IntlContext.Consumer>
                        {(intl) => {
                          return (
                            <ScrollLockManagerContext.Consumer>
                              {(scrollLockManager) => {
                                const polarisContext: PolarisContext = {
                                  ...polaris,
                                  intl,
                                  scrollLockManager,
                                  theme: polarisTheme,
                                };

                                if (Object.keys(polaris).length < 1) {
                                  throw new Error(
                                    `The <AppProvider> component is required as of v2.0 of Polaris React. See https://polaris.shopify.com/components/structure/app-provider for implementation instructions.`,
                                  );
                                }

                                return (
                                  <WrappedComponent
                                    {...this.props as any}
                                    polaris={polarisContext}
                                  />
                                );
                              }}
                            </ScrollLockManagerContext.Consumer>
                          );
                        }}
                      </IntlContext.Consumer>
                    );
                  }}
                </ThemeProviderContext.Consumer>
              );
            }}
          </AppProviderContext.Consumer>
        );
      }
    }

    let WithScrollable: React.ComponentClass<any> | undefined;
    if (withinScrollable) {
      WithScrollable = withScrollable(WithProvider);
    }

    const FinalComponent = hoistStatics(
      WithScrollable || WithProvider,
      WrappedComponent as React.ComponentClass<any>,
    );

    return FinalComponent as React.ComponentClass<OwnProps> & C;
  };
}
