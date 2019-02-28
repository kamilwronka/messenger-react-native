import React, { Component } from 'react';
import { connect } from 'react-redux';

import apiConfig from './config/api_config';
import SocketContext from '@/helpers/socketContext';
import io from 'socket.io-client';
import { getUserData } from './selectors/user.selectors';

class AppSocketWrapper extends Component {
  socket = io(apiConfig.ROOT_URL, {
    query: {
      token: this.props.user.token,
    },
  });

  componentWillReceiveProps(nextProps) {
    if (this.props.user.logged !== nextProps.user.logged || nextProps.user.logged === true) {
      this.socket = io(apiConfig.ROOT_URL, {
        query: {
          token: nextProps.user.token,
        },
      });
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    this.socket.on('message2', msg =>
      console.log('new msg in background -> go update mothafcking conversations', msg)
    );
    return (
      <SocketContext.Provider value={this.socket}>{this.props.children}</SocketContext.Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserData(state),
  };
};

export default connect(mapStateToProps)(AppSocketWrapper);
