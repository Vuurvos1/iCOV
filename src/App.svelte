<script>
  import { onMount } from 'svelte';

  // import { q, qa } from './modules/helper';

  import { cardsData } from './store';

  import Card from './components/Card.svelte';
  import NetworkGraph from './components/NetworkGraph.svelte';
  import NetworkGraphSearch from './components/NetgraphSearch.svelte';

  onMount(async () => {});
</script>

<style>
  :global(body) {
    max-height: 100vh;
    overflow-y: hidden;
  }

  :global(a) {
    text-decoration: none;
  }

  :global(.button) {
    min-width: 8.8rem;

    font-size: 0.9rem;

    padding: 0.6 0.8rem;

    background-color: var(--blue);
    border-radius: 0.2rem;

    color: var(--white);
  }

  :global(a.button--icon) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  :global(a.button--icon img) {
    margin-right: 0.6rem;
    height: 1.2rem;
    width: auto;
  }

  header {
    position: fixed;
    top: 0.6rem;
    left: 0;

    width: 100vw;
    height: 2rem;

    padding: 0 2rem 0 1rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  header img {
    /* height: 2rem;
    width: auto;
    padding: 0.2rem 0; */
  }

  main {
    display: grid;
    grid-template-columns: 55vw 45vw;
  }

  #networkGraph {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;

    background-color: var(--white);
  }

  #cardCanvas {
    background-color: var(--lightGray);
  }
</style>

<svelte:head>
  <title>iCOV</title>
  <html lang="nl" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<header>
  <!-- <a class="button button--icon" href="back"
    ><img src="./img/icon/round_arrow.svg" alt="" /> Hoofdmenu</a
  > -->
  <img src="./img/iCOV.png" alt="iCOV" />
</header>

<main>
  <section id="networkGraph">
    <NetworkGraphSearch />
    <NetworkGraph />
  </section>
  <section id="cardCanvas">
    {#each $cardsData as item}
      <Card item={item.data} />
    {/each}
  </section>
</main>
