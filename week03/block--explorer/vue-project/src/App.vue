<template>
  <div class="search-page">
    <div class="search-container">
      <input
        type="text"
        class="search-input"
        placeholder="Enter block number, eth address"
        v-model="searchQuery"
      />
      <button class="search-button" @click="search">Search</button>
    </div>
    <div v-if="showSearchQuery" class="search-results">
      <h2>Search Query:</h2>
      <p>{{ searchQuery }}</p>
    </div>
    <div v-if="blockNumber" class="block-number">
      <p>CURRENT Block-Number: {{ blockNumber }}</p>
      <p v-if="isHexadecimal(searchQuery)">Balance: {{ balanceResult }}</p>
      <p v-else>Gas Price: {{ gasPrice }} Gwei</p>
    </div>
    <div v-if="blockResult" class="block-result-container">
      <h2>Search Result:</h2>
      <pre class="block-result">{{ blockResult }}</pre>
    </div>
  </div>
</template>

<script>
import { getBlockNumber, get_blockbynumber, get_gas, get_balance } from './reqfunctions.js';

export default {
  data() {
    return {
      searchQuery: '',
      showSearchQuery: false,
      blockNumber: null,
      blockResult: null,
      gasPrice: null,
      balanceResult: null,
    };
  },
  methods: {
    async search() {
      if (this.searchQuery !== '') {
        this.showSearchQuery = true;
        if (this.isHexadecimal(this.searchQuery)) {
          try {
            this.balanceResult = await get_balance(this.searchQuery);
          } catch (error) {
            console.error('Error occurred:', error);
          }
        } else {
          try {
            this.blockResult = await get_blockbynumber(this.searchQuery);
          } catch (error) {
            console.error('Error occurred:', error);
          }
        }
      }
    },
    isHexadecimal(value) {
      const hexRegex = /^[0-9a-fA-F]{42}$/;
      return hexRegex.test(value);
    },
  },
  async mounted() {
    try {
      this.blockNumber = await getBlockNumber();
      this.gasPrice = await get_gas();
    } catch (error) {
      console.error('Error occurred:', error);
    }
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  background-color: #222;
}

.search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  width: 400px;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
  border-radius: 20px;
}

.search-button {
  width: 100px;
  height: 40px;
  font-size: 16px;
  border-radius: 20px;
}

.search-results {
  color: #fff;
}

.block-number {
  color: #fff;
}

.block-result-container {
  display: flex;
  justify-content: center;
  overflow: auto;
  max-width: 100%;
  max-height: 300px; 
}

.block-result {
  white-space: pre-wrap;
  padding: 10px;
  background-color: #333;
  border-radius: 4px;
  color: #fff;
}
</style>
