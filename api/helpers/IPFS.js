import IPFS from 'ipfs-http-client';
require('dotenv').config();

const host = process.env.ipfs_host || 'ipfs.infura.io';
const port = process.env.ipfs_port || '5001';
const protocol = process.env.ipfs_protocol || 'https';

export const ipfs = IPFS({ host, port, protocol });
