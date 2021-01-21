import { cardsData, cardCanvasState, highlightedCard } from './../store';
import { get } from 'svelte/store';
import { q, qa } from './helper';

export const linkedNodes = (e, d, nodes, edges) => {
  const linked = [];

  for (const i of edges.NetworkEdges.EdgeSets.EdgeSet) {
    // remove ToNodeSID if only want single direction links
    if (
      i.FromNodeSID == d.__proto__.data.SID ||
      i.ToNodeSID == d.__proto__.data.SID
    ) {
      linked.push(i);
    }
  }

  let connectedNodes = [];

  for (const i of linked) {
    const x = nodes.NetworkNodes.Nodes.Node.filter((el) => {
      return el.SID == i.ToNodeSID || el.SID == i.FromNodeSID;
    });

    connectedNodes.push(x);
  }

  connectedNodes = [...new Set(connectedNodes.flat())];

  for (const i of connectedNodes) {
    if (i.SID == d.__proto__.data.SID) {
      i.clicked = true;
      highlightedCard.set(i);
      cardCanvasState.set(i.NodeID.toLowerCase());
    } else {
      i.clicked = false;
    }
  }

  cardsData.set(connectedNodes);
};

// highlight all connected nodes
export const highlightConnected = () => {
  const nodes = qa('.node');
  for (const i of nodes) {
    i.style.opacity = '0.3';
  }

  for (const i of get(cardsData)) {
    q(`.a${i.SID}`).style.opacity = '1';
  }
};
