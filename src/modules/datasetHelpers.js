export const getData = async () => {
  const edgesData = await (await fetch(`./data/edges.json`)).json();
  const nodesData = await (await fetch(`./data/nodes.json`)).json();

  return [nodesData, edgesData];
};

export const dataPreprocess = async () => {
  let newData = {};

  const nodes = await (await fetch(`./data/nodes.json`)).json();
  const links = await (await fetch(`./data/edges.json`)).json();

  // console.log(links.NetworkEdges.EdgeSets.EdgeSet);
  // console.log(nodes.NetworkNodes.Nodes.Node);

  newData.nodes = [];
  for (const i of nodes.NetworkNodes.Nodes.Node) {
    newData.nodes.push({
      id: i.SID,
      data: i,
    });
  }

  newData.links = [];
  for (const i of links.NetworkEdges.EdgeSets.EdgeSet) {
    newData.links.push({
      source: i.FromNodeSID,
      target: i.ToNodeSID,
      value: 1,
    });
  }

  // {nodes: [{id: '', group: 1}], links: [{source: '', target: '', value: 1}]}
  return newData;
};
