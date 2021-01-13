<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import { q, qa } from "./../modules/helper";

  const personSvgPath =
    "M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z";
  const companySvgPath =
    "M17,11V3H7v4H3v14h8v-4h2v4h8V11H17z M7,19H5v-2h2V19z M7,15H5v-2h2V15z M7,11H5V9h2V11z M11,15H9v-2h2V15z M11,11H9V9h2 V11z M11,7H9V5h2V7z M15,15h-2v-2h2V15z M15,11h-2V9h2V11z M15,7h-2V5h2V7z M19,19h-2v-2h2V19z M19,15h-2v-2h2V15z";

  let dataTracker = {};

  const nodeSize = 12;

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

  function nodeColor(key) {
    key = key.toLowerCase();
    let col = "";

    switch (key) {
      case "people":
        col = "#8E44AE";
        break;

      case "flag":
        col = "#27AE60";
        break;

      case "department":
        col = "#27AE60";
        break;

      case "address":
        col = "#E74A3C";
        break;

      default:
        col = "#000000";
        break;
    }

    return col;
  }

  function zoom(value) {
    // get current scale

    // set new scale
    const graph = q(".graph__transform");
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

    const g = svg.append("g").attr("class", "graph__transform");

    const link = g
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const node = g
      .append("g")

      // .attr("stroke", "#fff")
      // .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("g")
      .attr("class", (d) => {
        // expand to be more generic?
        return `node ${d.__proto__.data.NodeID.toLowerCase()}`;
      })
      .call(drag(simulation));

    node
      .append("circle")
      .attr("r", nodeSize / 2)
      .attr("fill", (d) => nodeColor(d.__proto__.data.NodeID))
      .on("click", (e, d) => {
        console.log(d.__proto__.data.Attributes.Attribute);
        tooltipData = d.__proto__.data.Attributes.Attribute;
      })
      .append("title")
      .text((d) => d.id);

    node
      .append("g")
      .attr(
        "transform",
        `translate(-${nodeSize / 2}, -${nodeSize / 2})scale(${nodeSize / 24})`
      )
      .attr("class", "graphIcon")
      .append("path")
      .attr("d", (d) => {
        switch (d.__proto__.data.NodeID.toLowerCase()) {
          case "people":
            return personSvgPath;

          case "department":
            return companySvgPath;

          default:
            return "";
        }
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x} ${d.y})`);
    });

    // zoom and pan logic
    svg.call(
      d3
        .zoom()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0.5, 8])
        .on("zoom", zoomed)
    );

    function zoomed({ transform }) {
      g.attr("transform", transform);
    }

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
    width: 100%;
    height: 100%;
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

<svg class="graph" />

<button on:click={() => zoom(0.25)}><img
    src="./img/icon/zoom_in.svg"
    alt="" /></button>
<button on:click={() => zoom(-0.25)}><img
    src="./img/icon/zoom_out.svg"
    alt="" /></button>
