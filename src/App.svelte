<script>
  export let name;

  // get local datasets

  let dataTracker = {};
  let arr = [1, 2, 3];

  let width = 800;
  let height = 600;

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
    // return data.NetworkEdges.EdgeSets.EdgeSet;
    // return '🦝';
  }

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
    let col = '';

    switch (key) {
      case 'people':
        col = 'blue';
        break;

      case 'flag':
        col = '#FFC300';
        break;

      case 'department':
        col = 'green';
        break;

      case 'address':
        col = '#1E8449';
        break;

      default:
        col = '#000000';
        break;
    }

    return col;
  }
</script>

<style>
  h1 {
    font-weight: bold;
  }

  line {
    stroke: hotpink;
  }
</style>

<main>
  <h1>Hello {name}!</h1>

  {#await getData()}
    <h2>loading data</h2>
  {:then cookies}
    <svg {width} {height}>
      <!-- draw dots -->
      <g>
        <!-- {console.log(cookies)} -->
        {#each cookies[1] as node}
          <circle
            cx={getPoint(node.SID).x}
            cy={getPoint(node.SID).y}
            r="15"
            fill={nodeColor(node.NodeID)}
            on:click={() => {
              console.log(node);
              // console.log(findNode(node.FromNodeSID));
            }}>
            <!-- <title>{item}</title> -->
          </circle>
        {/each}
      </g>

      <!-- draw lines -->
      <g>
        {#each cookies[0] as line}
          <line
            x1={getPoint(line.FromNodeSID).x}
            y1={getPoint(line.FromNodeSID).y}
            x2={getPoint(line.ToNodeSID).x}
            y2={getPoint(line.ToNodeSID).y} />
        {/each}
      </g>
    </svg>
  {/await}
</main>
