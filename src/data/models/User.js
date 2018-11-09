/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import crypto from 'crypto';
import DataType from 'sequelize';
import Model from '../sequelize';

const User = Model.define(
  'users',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
    },

    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true },
    },

    password: {
      type: DataType.STRING,
      set(value) {
        this.setDataValue('password', this.genPasswordHash(value));
      },
    },

    role: {
      type: DataType.INTEGER,
      defaultValue: 0,
    },

    salt: {
      type: DataType.STRING,
      allowNull: false,
      defaultValue: () => crypto.randomBytes(32).toString('hex'),
    },
  },
  {
    indexes: [{ fields: ['username', 'email'] }],
    timestamps: true,
  },
);

User.prototype.authenticate = function authenticate(password) {
  return this.genPasswordHash(password) === this.password;
};

User.prototype.genPasswordHash = function genPasswordHash(password) {
  return crypto
    .createHmac('sha1', this.salt)
    .update(password)
    .digest('hex');
};

export default User;
