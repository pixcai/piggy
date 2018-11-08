/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object,
  };

  onSignup = () => {
    this.context.fetch({
      method: 'post',
      url: '/api/register',
      data: {
        username: 'root',
        email: 'root@admin.com',
        password: '123456',
      },
    });
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <button onClick={this.onSignup}>Sign up</button>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
