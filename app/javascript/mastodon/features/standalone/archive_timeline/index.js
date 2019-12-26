import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { expandArchiveTimeline } from 'mastodon/actions/timelines';
import Masonry from 'react-masonry-infinite';
import { List as ImmutableList, Map as ImmutableMap } from 'immutable';
import ArchivedStatusContainer from 'mastodon/features/status/containers/archived_status_container';
import { debounce } from 'lodash';
import LoadingIndicator from 'mastodon/components/loading_indicator';

const mapStateToProps = (state) => {
  const timeline = state.getIn(['timelines', 'archive'], ImmutableMap());

  return {
    statusIds: timeline.get('items', ImmutableList()),
    isLoading: timeline.get('isLoading', false),
    hasMore: timeline.get('hasMore', false),
  };
};

export default @connect(mapStateToProps)
class ArchiveTimeline extends React.PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    statusIds: ImmutablePropTypes.list.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
  };

  componentDidMount () {
    this._connect();
  }

  componentDidUpdate () {
    this._connect();
  }

  _connect () {
    const { dispatch } = this.props;

    dispatch(expandArchiveTimeline());
  }

  handleLoadMore = () => {
    const { dispatch, statusIds  } = this.props;
    const maxId = statusIds.last();

    if (maxId) {
      dispatch(expandArchiveTimeline({ maxId }));
    }
  }

  setRef = c => {
    this.masonry = c;
  }

  handleHeightChange = debounce(() => {
    if (!this.masonry) {
      return;
    }

    this.masonry.forcePack();
  }, 50)

  render () {
    const { statusIds, hasMore, isLoading } = this.props;

    const sizes = [
      { columns: 1, gutter: 0 },
      { mq: '415px', columns: 1, gutter: 10 },
      { mq: '640px', columns: 2, gutter: 10 },
      { mq: '960px', columns: 3, gutter: 10 },
      { mq: '1255px', columns: 3, gutter: 10 },
    ];

    const loader = (isLoading && statusIds.isEmpty()) ? <LoadingIndicator key={0} /> : undefined;

    return (
      <Masonry ref={this.setRef} className='archive-statuses-grid' hasMore={hasMore} loadMore={this.handleLoadMore} sizes={sizes} loader={loader}>
        {statusIds.map(statusId => (
          <div className='archive-statuses-grid__item' key={statusId}>
            <ArchivedStatusContainer
              id={statusId}
              compact
              measureHeight
              onHeightChange={this.handleHeightChange}
            />
          </div>
        )).toArray()}
      </Masonry>
    );
  }

}
