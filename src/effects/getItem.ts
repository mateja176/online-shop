// @ts-ignore
import preval from 'babel-plugin-preval/macro';
import { Item } from 'models';

export const getItem = () => {
  const item: Item = preval`
  const fs = require('fs');
  const { join } = require('path');
  module.exports = JSON.parse(fs.readFileSync(join(__dirname, '..', 'resources/data/data.json'), 'utf8'));
  `;

  return Promise.resolve(item);
};
