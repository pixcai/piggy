/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import axios from 'axios';

function createFetch(options) {
  // NOTE: Tweak the default options to suite your application needs
  return axios.create(options);
}

export default createFetch;
