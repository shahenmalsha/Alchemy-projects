const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');
const ethereumCryptography = require('ethereum-cryptography');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
function convert_to_merkle_root(){
    const list = niceList;
    const merkle_tree = ethereumCryptography.createMerkleTree(list);
    const get_root = merkle_tree.root;
    const remove_prefix = get_root.slice(2);
    return remove_prefix;
}
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = convert_to_merkle_root();

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const name = body.name;
  const proof = body.proof;

  // TODO: prove that a name is in the list 
  function isInTheList(){
    if(verifyProof(proof, name, MERKLE_ROOT)){
      return true;
    }
  }
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
