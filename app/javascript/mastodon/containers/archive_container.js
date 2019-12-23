import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import configureStore from '../store/configureStore';
import { hydrateStore } from '../actions/store';
import { IntlProvider, addLocaleData } from 'react-intl';
import { getLocale } from '../locales';
import ArchiveTimeline from '../features/standalone/archive_timeline';
import ModalContainer from '../features/ui/containers/modal_container';
import initialState from '../initial_state';

const { localeData, messages } = getLocale();
addLocaleData(localeData);

const store = configureStore();

if (initialState) {
  store.dispatch(hydrateStore(initialState));
}

export default class ArchiveContainer extends React.PureComponent {

  static propTypes = {
    locale: PropTypes.string.isRequired,
  };

  static defaultProps = {
    local: !initialState.settings.known_fediverse,
  };

  render () {
    const { locale } = this.props;

    let timeline = <ArchiveTimeline />;

    return (
      <IntlProvider locale={locale} messages={messages}>
        <Provider store={store}>
          <Fragment>
            {timeline}

            {ReactDOM.createPortal(
              <ModalContainer />,
              document.getElementById('modal-container'),
            )}
          </Fragment>
        </Provider>
      </IntlProvider>
    );
  }

}
