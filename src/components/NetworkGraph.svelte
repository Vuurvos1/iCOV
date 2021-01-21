<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  import { linkedNodes, highlightConnected } from './../modules/graphFunctions';
  import { getData, dataPreprocess } from './../modules/datasetHelpers';

  import { personPath, companyPath, realEstatePath } from './../modules/icons';

  const nodeSize = 12;

  onMount(async () => {
    const height = 650;
    const width = 750;

    const data = await dataPreprocess();
    let nodes2, links2;
    [nodes2, links2] = await getData();

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
        linkedNodes(e, d, nodes2, links2);
        highlightConnected();
      })

      .attr('class', (d) => {
        // expand to be more generic classes?
        return `node ${d.__proto__.data.NodeID.toLowerCase()} a${
          d.__proto__.data.SID
        }`;
      })
      .call(drag(simulation));

    // node background circle
    node.append('circle').attr('r', nodeSize / 2);

    // node icons
    node
      .append('g')
      .attr(
        'transform',
        `translate(-${(nodeSize - 2) / 2}, -${(nodeSize - 1) / 2})scale(${
          (nodeSize - 2) / 24
        })`
      )
      .attr('class', 'graphIcon')
      .append('path')
      .attr('d', (d) => {
        switch (d.__proto__.data.NodeID.toLowerCase()) {
          case 'people':
            return personPath;

          case 'department':
            return companyPath;

          case 'address':
            return realEstatePath;

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
    fill: var(--person);
  }
  :global(.node.people circle) {
    fill: var(--employe);
  }

  :global(.node.address circle) {
    fill: var(--realEstate);
  }

  :global(.node.department circle) {
    fill: var(--company);
  }
</style>

<svg class="graph" />
