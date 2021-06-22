import Post from '@models/Post';
import './styles/styles.css';
import json from './assets/json';
import WebpackLogo from '@/assets/webpack-logo';
import xml from './assets/data.xml';
import csv from './assets/data.csv';
import * as $ from 'jquery';

const post = new Post('Webpack Post title', WebpackLogo)

$('pre').html(post.toString())

console.log(post.toString());

console.log('JSON', json);
console.log('XML', xml);
console.log('CSV', csv);