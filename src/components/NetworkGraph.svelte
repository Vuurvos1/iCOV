<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  import { q, qa } from './../modules/helper';

  import { cardsData } from './../store';

  import { personPath, companyPath } from './../modules/icons';

  const nodeSize = 12;

  let nodesData = {};

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

    // {nodes: [{id: '', group: 1}], links: [{source: '', target: '', value: 1}]}
    return newData;
  }

  dataPre();

  function zoom(value) {
    // doesn't work, scale is gotten but not applied

    // get current scale

    // set new scale
    const graph = q('.graph__transform');

    const style = window.getComputedStyle(graph);
    const matrix = style.transform || style.mozTransform;

    if (matrix) {
      const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
      graph.style.transform = `${matrixValues[0] + value}, ${
        matrixValues[1]
      }, ${matrixValues[2]}, ${matrixValues[3]}, ${matrixValues[4]}, ${
        matrixValues[5]
      }`;

      console.log(matrixValues);

      // style transform(translate() scale())
    }
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
        'link',
        d3.forceLink(links).id((d) => d.id)
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const svg = d3.select('.graph').attr('viewBox', [0, 0, width, height]);

    const g = svg.append('g').attr('class', 'graph__transform');

    const link = g
      .append('g')
      .attr('class', 'graph__links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    // basic node group
    const node = g
      .append('g')
      .attr('class', 'graph__nodes')
      .selectAll('g')
      .data(nodes)
      .join('g')

      .on('click', (e, d) => {
        $cardsData = [...$cardsData, { data: d.__proto__.data }];
      })

      .attr('class', (d) => {
        // expand to be more generic classes?
        return `node ${d.__proto__.data.NodeID.toLowerCase()}`;
      })
      .call(drag(simulation));

    // node background circle
    node.append('circle').attr('r', nodeSize / 2);

    // node icons
    node
      .append('g')
      .attr(
        'transform',
        `translate(-${nodeSize / 2}, -${nodeSize / 2})scale(${nodeSize / 24})`
      )
      .attr('class', 'graphIcon')
      .append('path')
      .attr('d', (d) => {
        switch (d.__proto__.data.NodeID.toLowerCase()) {
          case 'people':
            return personPath;

          case 'department':
            return companyPath;

          default:
            return '';
        }
      });

    // node titels
    node.append('title').text((d) => d.data.Label || d.data.NodeID);

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('transform', (d) => `translate(${d.x} ${d.y})`);
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
        .on('zoom', ({ transform }) => {
          g.attr('transform', transform);
        })
    );

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
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  });
</script>

<style>
  svg {
    width: 100%;
    height: 100%;
  }

  :global(.graph__links line) {
    stroke: #999;
    stroke-opacity: 0.6;
  }

  :global(.node) {
    transition: opacity 0.3s ease-out;
  }

  /* default node color */
  :global(.node circle) {
    fill: var(--red);
  }
  :global(.node.people circle) {
    fill: var(--blue);
  }

  :global(.node.address circle) {
    fill: var(--yellow);
  }

  :global(.node.department circle) {
    fill: var(--green);
  }
</style>

<svg class="graph" />

<!-- 
  <button on:click={() => zoom(0.25)}><img
    src="./img/icon/zoom_in.svg"
    alt="" /></button>
  <button on:click={() => zoom(-0.25)}><img
    src="./img/icon/zoom_out.svg"
    alt="" /></button> 
-->
