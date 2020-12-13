<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  let dataTracker = {};

  let width = 800;
  let height = 600;

  let nodesData = {};

  let tooltipData = [];

  async function getData() {
    const baseUrl = `${window.location.origin}/data`;
    const url = `${baseUrl}/edges.json`;
    let data = await (await fetch(url)).json();

    nodesData = await (await fetch(`${baseUrl}/nodes.json`)).json();

    // console.log(data, data.NetworkEdges.EdgeSets.EdgeSet[3]);
    // console.log(nodesData, nodesData.NetworkNodes.Nodes.Node);

    return [
      data.NetworkEdges.EdgeSets.EdgeSet,
      nodesData.NetworkNodes.Nodes.Node,
    ];
    // return data.NetworkEdges.EdgeSets.EdgeSet;
    // return '🦝';
  }

  async function dataPre() {
    const baseUrl = `${window.location.origin}/data`;
    let newData = {};

    const nodes = await (await fetch(`${baseUrl}/nodes.json`)).json();
    const links = await (await fetch(`${baseUrl}/edges.json`)).json();

    // console.log(links.NetworkEdges.EdgeSets.EdgeSet);
    // console.log(nodes.NetworkNodes.Nodes.Node);

    newData.nodes = [];
    for (const i of nodes.NetworkNodes.Nodes.Node) {
      newData.nodes.push({
        id: i.SID,
        data: i,
        // i.Attributes
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

    console.log(newData);

    // {nodes: [{id: '', group: 1}], links: [{source: '', target: '', value: 1}]}
    return newData;
  }

  dataPre();

  function findNode(id) {
    return nodesData.NetworkNodes.Nodes.Node.find((el) => el.SID == id);
  }

  function getPoint(id) {
    if (!dataTracker[id]) {
      dataTracker[id] = {
        x: ~~(Math.random() * width),
        y: ~~(Math.random() * height),
      };
    }

    return dataTracker[id];
  }

  function nodeColor(key) {
    key = key.toLowerCase();
    let col = "";

    switch (key) {
      case "people":
        col = "blue";
        break;

      case "flag":
        col = "#FFC300";
        break;

      case "department":
        col = "green";
        break;

      case "address":
        col = "#1E8449";
        break;

      default:
        col = "#000000";
        break;
    }

    return col;
  }

  onMount(async () => {
    const height = 450;
    const width = 650;

    const data = await dataPre();

    const links = data.links.map((d) => Object.create(d));
    const nodes = data.nodes.map((d) => Object.create(d));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const svg = d3.select(".graph").attr("viewBox", [0, 0, width, height]);

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", (d) => nodeColor(d.__proto__.data.NodeID))
      .on("click", (e, d) => {
        console.log(d.__proto__.data.Attributes.Attribute);
        tooltipData = d.__proto__.data.Attributes.Attribute;
      })
      .call(drag(simulation));

    node.append("title").text((d) => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  });
</script>

<style>
  h1 {
    font-weight: bold;
    text-align: center;
  }

  svg {
    width: 100vw;
    height: 50rem;
  }

  main {
    overflow-x: hidden;
  }

  .bold {
    font-weight: bold;
  }

  .nodeInfo {
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>

<main>
  <h1>iCOV graph</h1>

  <svg class="graph" />

  <div class="nodeInfo">
    <ul>
      {#each tooltipData as tooltip}
        <li><span class="bold">{tooltip.Name}:</span>{` ${tooltip.Value}`}</li>
      {/each}
    </ul>
  </div>
</main>
