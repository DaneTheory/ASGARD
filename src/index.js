require('express-mongoose');

import DefaultAppConfig from '../DefaultAppConfig'; // eslint-disable-line import/first
import service from './Config/Express'; // eslint-disable-line import/first
import Mongoose from './Config/Mongoose'; // eslint-disable-line import/first

import AsgardConfig from '../Asgard_Configs';


const config = DefaultAppConfig();
const debug = require('debug')(`${config.get('name')}:index`); // eslint-disable-line no-unused-vars

const mongooseInst = () => Mongoose(config);

Promise = require('bluebird'); // eslint-disable-line no-global-assign

mongooseInst();

const globalSetup = () => {
  let dataPlaceHolder
  return AsgardConfig()
    .then(data => {
      dataPlaceHolder = data
      return data
    })
    .catch(e => {
      console.error(e)
      return new Error(e)
    })
}

globalSetup()


export default service;
