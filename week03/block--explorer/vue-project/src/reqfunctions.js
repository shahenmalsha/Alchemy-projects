import axios from 'axios';
//const axios = require('axios'); //im using this import when testing out in nodejs env
import dotenv from 'dotenv';

const url = `https://eth-mainnet.g.alchemy.com/v2/${api_key}`;


async function getBlockNumber() { // get current block number
    const response = await axios.post(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_blockNumber",
    });
    
    return response.data.result;
}

async function get_blockbynumber(search) { // get block info by number
  try {
    const format_data = String(search).startsWith('0x') ? String(search).slice(2) : String(search);

    const response = await axios.post(url, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getBlockByNumber',
      params: [
        `0x${format_data}`,
        false
      ]
    });
    const format_Json = JSON.stringify(response.data.result, null, 2);
    return format_Json;
  } catch (error) {
    console.error('Error occurred during block retrieval:', error);
    throw error;
  }
}

async function get_gas() { // get current block number
  const response = await axios.post(url, {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_gasPrice",
  });
  todeci = parseInt(response.data.result, 16);
  togewi = todeci / 1e9;
  return togewi; // returns in gwei
}

async function get_balance(search) { // get eth account balance
  try {
    const format_data = String(search).startsWith('0x') ? String(search).slice(2) : String(search);

    const response = await axios.post(url, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getBalance',
      params: [
        `0x${format_data}`,
        false
      ]
    });
    return response.data.result;
  } catch (error) {
    console.error('Error occurred during block retrieval:', error);
    throw error;
  }
}


(async () => { // to test the async functions... this is not imported in app.vue
  try {
    const gas = await get_gas();
    console.log('Current gas:', gas);
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();

export {getBlockNumber}
export {get_blockbynumber}
export {get_gas}
export {get_balance}