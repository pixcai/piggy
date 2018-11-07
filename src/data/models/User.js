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
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
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

    password_hash: {
      type: DataType.STRING,
      allowNull: false,
    },

    password: {
      type: DataType.VIRTUAL,
      set: val => {
        this.setDataValue('password', val);
        this.setDataValue('password_hash', this.genPasswordHash(val));
      },
    },

    salt: {
      type: DataType.STRING,
      allowNull: false,
      defaultValue: () => Math.round(Date.now() * Math.random()).toString(16),
    },
  },
  {
    indexes: [{ fields: ['username', 'email'] }],
    createdAt: true,
    updatedAt: true,
    validate: {
      authenticate(password) {
        return this.genPasswordHash(password) === this.password_hash;
      },
      genPasswordHash(password) {
        const hash = crypto.createHmac('sha1', this.salt).update(password);
        return hash.digest('hex');
      },
    },
  },
);

export default User;
