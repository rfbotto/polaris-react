import React from 'react';
import {ThemeProvider} from '../../utilities/theme';
import {I18n, I18nContext} from '../../utilities/i18n';
import {
  ScrollLockManager,
  ScrollLockManagerContext,
} from '../../utilities/scroll-lock-manager';
import {StickyManager, createAppProviderContext} from './utilities';
import AppProviderContext, {AppProviderContextType} from './context';
import {AppProviderProps} from './types';

interface State {
  context: AppProviderContextType;
  intl: I18n;
}

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `AppProvider extends React.Component<AppProviderProps>`
interface Props extends AppProviderProps {}

export default class AppProvider extends React.Component<Props, State> {
  private stickyManager: StickyManager;
  private scrollLockManager: ScrollLockManager;

  constructor(props: Props) {
    super(props);
    this.stickyManager = new StickyManager();
    this.scrollLockManager = new ScrollLockManager();
    const {theme, children, i18n, ...rest} = this.props;

    this.state = {
      context: createAppProviderContext({
        ...rest,
        stickyManager: this.stickyManager,
      }),
      intl: new I18n(i18n),
    };
  }

  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document);
    }
  }

  componentDidUpdate({
    i18n: prevI18n,
    linkComponent: prevLinkComponent,
    apiKey: prevApiKey,
    shopOrigin: prevShopOrigin,
    forceRedirect: prevForceRedirect,
  }: Props) {
    const {i18n, linkComponent, apiKey, shopOrigin, forceRedirect} = this.props;

    if (
      i18n === prevI18n &&
      linkComponent === prevLinkComponent &&
      apiKey === prevApiKey &&
      shopOrigin === prevShopOrigin &&
      forceRedirect === prevForceRedirect
    ) {
      return;
    }

    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      context: createAppProviderContext({
        linkComponent,
        apiKey,
        shopOrigin,
        forceRedirect,
        stickyManager: this.stickyManager,
      }),
      intl: new I18n(i18n),
    });
  }

  render() {
    const {theme = {logo: null}, children} = this.props;
    const {
      context: {...appProviderContext},
      intl,
    } = this.state;

    return (
      <AppProviderContext.Provider value={appProviderContext}>
        <I18nContext.Provider value={intl}>
          <ScrollLockManagerContext.Provider value={this.scrollLockManager}>
            <ThemeProvider theme={theme}>
              {React.Children.only(children)}
            </ThemeProvider>
          </ScrollLockManagerContext.Provider>
        </I18nContext.Provider>
      </AppProviderContext.Provider>
    );
  }
}
