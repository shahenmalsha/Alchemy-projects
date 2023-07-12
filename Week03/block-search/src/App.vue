<template>
  <div>
    <div class="header">
      <div class="search-bar">
        <input type="text" v-model="searchValue" placeholder="Search blocks...">
        <button type="submit" @click="searchBlock">Search</button>
      </div>
      <div class="block-info">
        Gas: {{ gasValue }} Gwei | ETH Price: -- | Current Block: <span id="block-code">{{ currentBlock }}</span>
      </div>
    </div>

    <div class="container">
      <h2>B Container</h2>
      <div v-if="searchResult">
        <p class="block-info-line"><strong>BaseFeePerGas:</strong> {{ formatResult(searchResult) }}</p>
        <p class="block-info-line"><strong>Difficulty:</strong> {{ formatResult(searchResult1) }}</p>
        <p class="block-info-line"><strong>ExtraData:</strong> {{ formatResult(searchResult2) }}</p>
        <p class="block-info-line"><strong>GasLimit:</strong> {{ formatResult(searchResult3) }}</p>
        <p class="block-info-line"><strong>GasUsed:</strong> {{ formatResult(searchResult4) }}</p>
        <p class="block-info-line"><strong>Hash:</strong> {{ formatResult(searchResult5) }}</p>
        <p class="block-info-line"><strong>Miner:</strong> {{ formatResult(searchResult6) }}</p>
        <p class="block-info-line"><strong>Nonce:</strong> {{ formatResult(searchResult7) }}</p>
        <p class="block-info-line"><strong>Time Stamp:</strong> {{ formatResult(searchResult8) }}</p>
      </div>
      <div v-else>
        <p>No data available.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { get_gas, getBlockNumber, get_blockbynumber } from './reqfunctions';

export default {
  name: 'MuTemplate',
  data() {
    return {
      currentBlock: '0xhhhhh',
      gasValue: '0',
      searchValue: '',
      searchResult: null,
      searchResult1: '',
      searchResult2: '',
      searchResult3: '',
      searchResult4: '',
      searchResult5: '',
      searchResult6: '',
      searchResult7: '',
      searchResult8: '',
    };
  },
  async mounted() {
    this.currentBlock = await getBlockNumber();
    this.gasValue = await get_gas();
  },
  methods: {
    async searchBlock() {
      if (this.searchValue) {
        this.searchResult = await get_blockbynumber(this.searchValue, 0);
        this.searchResult1 = await get_blockbynumber(this.searchValue, 1);
        this.searchResult2 = await get_blockbynumber(this.searchValue, 2);
        this.searchResult3 = await get_blockbynumber(this.searchValue, 3);
        this.searchResult4 = await get_blockbynumber(this.searchValue, 4);
        this.searchResult5 = await get_blockbynumber(this.searchValue, 5);
        this.searchResult6 = await get_blockbynumber(this.searchValue, 7);
        this.searchResult7 = await get_blockbynumber(this.searchValue, 9);
        this.searchResult8 = await get_blockbynumber(this.searchValue, 16);
      }
    },
    formatResult(value) {
      if (value && typeof value === 'string') {
        return value.replace(/,/g, ', ');
      }
      return value;
    },
  },
};
</script>

<style>
body {
  background-color: #333333;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  min-height: 100vh;
}

.header {
  background-color: blue;
  color: white;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
}

.search-bar {
  display: flex;
  flex-grow: 1;
  margin-right: 20px;
}

.search-bar input[type="text"] {
  padding: 5px;
  width: calc(30% - 10px);
}

.search-bar button {
  padding: 5px 10px;
}

.container {
  background-color: white;
  padding: 142px;
  text-align: center;
  width: 200%; 
}

.container p {
  color: #333333;
}

.block-info-line {
  display: flex;
  align-items: flex-start;
}
.block-info-line strong {
  width: 120px;
}
.block-info-line strong::after {
  content: ':';
  margin-right: 5px;
}
</style>
