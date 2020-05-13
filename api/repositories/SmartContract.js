import {config} from 'dotenv';
import {Transaction} from 'ethereumjs-tx';
import Web3 from 'web3';
import Common from 'ethereumjs-common';
import { newKit } from '@celo/contractkit';

config();

const mnemonic = process.env.mnemonic;
const privateKey = Buffer.from(mnemonic, 'hex');
const host = process.env.host || 'http://localhost:8545';
const account = process.env.account;
const from = {from: account};

class SmartContract {
  constructor(contract, address) {
    this.contract = contract;
    this.address = address;
    this.kit = newKit(host);
    this.web3 = this.kit.web3;
    this.instance = new this.web3.eth.Contract(contract.abi, address, {gasLimit: 5000000, ...from});
  }

  /**
   * Post makes calls to the writing instance functions
   * @param functionName {String} The expected instance function to be executed
   * @param params {[Any]} Expected parameters the instance function receives.
   * @returns {Promise<String>} A transaction hash on successful operations.
   */
  post(functionName, ...params) {
    return new Promise((resolve, reject) => {
      const contractFunction = this.instance.methods[functionName](...params);
      const functionAbi = contractFunction.encodeABI();
      contractFunction.estimateGas(from)
        .then(gas => this.sign(functionAbi, gas))
        .then(serializedTx => this.web3.eth.sendSignedTransaction(`0x${serializedTx}`))
        .then((tx) => resolve(tx.transactionHash))
        .catch((e) => {
          console.error(`Post(${this.contract.contractName}: ${functionName}): ${e}`);
          reject(e);
        });
    });
  }

  /**
   * Get makes calls to the only read instance functions
   * @param functionName The expected instance function to be consulted
   * @param params Expected parameters the instance function receives
   * @returns {Promise<any>} A tuple of n-th elements the function returns
   */
  get(functionName, ...params) {
    return new Promise((resolve, reject) => {
      this.instance.methods[functionName](...params).call(from)
        .then(resolve)
        .catch((e) => {
          console.error(`Get(${functionName}): ${e}`);
          reject(e);
        });
    });
  }

  /**
   * Calculates gas price and signs the transaction to the block chain
   * @param functionAbi the contract function encode as ABI
   * @param gasLimit Number that indicates the gas limit
   * @returns {Promise<string>} Serialized transaction
   */
  sign(functionAbi, gasLimit) {
    const customCommon = Common.forCustomChain(
      'mainnet',
      {
        name: 'alfajores',
        networkId: 44786,
        chainId: 44786,
      },
      'istanbul',
    )
    return new Promise((resolve, reject) => {
      try {
        this.web3.eth.getGasPrice()
          .then(gasPrice => {
            return [
              this.web3.eth.getTransactionCount(account),
              gasPrice,
            ];
          })
          .then(promises => Promise.all(promises))
          .then(([nonce, gasPrice]) => {
            const txParams = {
              gasPrice: this.web3.utils.toHex(gasPrice),
              gasLimit,
              to: this.address,
              data: functionAbi,
              nonce,
            };
            const tx = new Transaction(txParams, {common: customCommon});
            tx.sign(privateKey);
            resolve(tx.serialize().toString('hex'));
          })
          .catch(e => {
            console.error(`Signing error: ${e}`);
            reject(e);
          });
      } catch (e) {
        console.error(`Try signing error: ${e}`);
        reject(e);
      }
    });
  }
}

module.exports = SmartContract;
