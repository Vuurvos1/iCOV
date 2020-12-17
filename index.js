const fs = require('fs');

const nodes = require('./public/data/nodes.json');
const edges = require('./public/data/edges.json');
const { time } = require('console');

// data.NetworkEdges.EdgeSets.EdgeSet,
// nodesData.NetworkNodes.Nodes.Node,

// console.log(nodes.NetworkNodes.Nodes.Node);

let home = {};
for (const i of nodes.NetworkNodes.Nodes.Node) {
  if (i.Label == 'Steven King') {
    home = i;
  }
}

// console.log(home);
// sid 2458292

let firstMatch = [];

for (const i of edges.NetworkEdges.EdgeSets.EdgeSet) {
  if (home.SID == i.FromNodeSID || home.SID == i.ToNodeSID) {
    firstMatch.push(i);
  }
}

// console.log(firstMatch);

const secondMatch = [];
for (const i of firstMatch) {
  let match = nodes.NetworkNodes.Nodes.Node.find((el) => el.SID == i.ToNodeSID);
  secondMatch.push(match);
}

// console.log(secondMatch);

// filter time bound
let timeBound = [];
for (const i of secondMatch) {
  for (const j of i.Attributes.Attribute) {
    if (j.Name == 'FROM_DATE') {
      timeBound.push(i);
    }
  }
}

// console.log(timeBound);

const thirdMatch = [[], []];
for (const [i, v] of timeBound.entries()) {
  // i.SID
  //   console.log(i, v);
  //   console.log(nodes.NetworkNodes.Nodes.Node[1]);

  thirdMatch[i] = edges.NetworkEdges.EdgeSets.EdgeSet.filter((el) => {
    // console.log(el)
    if (el.FromNodeSID == v.SID) {
      return el;
    }
  });
}

fs.writeFileSync(`output/data2.json`, JSON.stringify(thirdMatch));
