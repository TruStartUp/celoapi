import fileType from 'file-type';
import {ipfs} from '../helpers/IPFS';

require('dotenv').config();

/**
 * @typedef {Object} IPFSResponse
 * @property {String} hash Resulting Buffer's hash
 * @property {String} name Buffer name
 */
/**
 * Saves a Buffer into the specified IPFS network
 * @param {Buffer} buffer - The buffer to save into IPFS
 * @param {Boolean} validate - Determines if the add function uploads the file (default), or only gets the document IPFS hash
 * @returns {Promise<IPFSResponse>} An object with the IPFS hash.
 */
const add = (buffer) => new Promise((resolve, reject) => {
  if (!(buffer instanceof Buffer)) {
    reject(new Error('Not a buffer'));
  }else {
    const options = {
      pin: process.env.pin || false
    };
    ipfs.add(buffer, options, (err, response) => {
      if(err) reject(new Error('Unable to upload file to IPFS'));
      resolve({hash: response[0].hash});
    })
  }
});

/**
 * Gets the binary file by its hash
 * @param hash IPFS hash
 * @returns {Promise<{type: 'MIME_TYPE', content: 'BUFFER'}>}
 */
const get = hash => new Promise((resolve, reject) => {
  ipfs.cat(hash, (err, response) => {
    if (err) reject(new Error('Not a valid IPFS hash'));
    const type = fileType(response);
    resolve({type, content: response});
  });
});

export default {
  add,
  get,
}
