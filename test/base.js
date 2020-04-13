import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import chaiFs from'chai-fs';
import {app} from '../app'

chai.use(chaiHttp);
chai.use(chaiFs);
chai.use(chaiAsPromised);

export const {expect} = chai;

export const request = chai.request(app).keepOpen();
