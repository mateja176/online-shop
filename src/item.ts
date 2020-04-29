// @ts-ignore
import preval from 'babel-plugin-preval/macro';
import { Item } from 'models';

export const item: Item = preval`
const fs = require('fs');
module.exports = fs.readFileSync(__dirname + '/resources/data/data.json', 'utf8');
`;
