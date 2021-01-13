<script>
  import { onMount } from "svelte";

  import { q, qa } from "./modules/helper";

  import { cardsData } from "./store";

  import Card from "./components/Card.svelte";
  import NetworkGraph from "./components/NetworkGraph.svelte";

  let checkboxState = {
    people: true,
    address: true,
    department: true,
  };

  function checkboxChange() {
    const states = Object.keys(checkboxState);

    for (const state of states) {
      const elements = qa(`.${state}`);
      for (const el of elements) {
        el.style.opacity = checkboxState[state] ? "1" : "0.3";
      }
    }
  }

  onMount(async () => {});
</script>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 2rem;

    padding: 0 2rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  header img {
    height: 2rem;
    width: auto;
    padding: 0.2rem 0;
  }

  main {
    margin-top: 2rem;

    display: grid;
    grid-template-columns: 60vw 40vw;
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

  :global(.node) {
    transition: opacity 0.3s ease-out;
  }
</style>

<svelte:head>
  <title>iCOV</title>
  <html lang="nl" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap"
    rel="stylesheet" />
</svelte:head>

<header><a href="#">Menu</a> <img src="./img/iCOV.png" alt="iCOV" /></header>

<main>
  <section id="networkGraph">
    <NetworkGraph />
  </section>
  <section id="cardCanvas">
    <div>
      <input
        type="checkbox"
        id="personen"
        name="personen"
        bind:checked={checkboxState.people}
        on:change={checkboxChange} />
      <label for="personen">Personen</label>
    </div>

    <div>
      <input
        type="checkbox"
        id="vastgoed"
        name="vastgoed"
        bind:checked={checkboxState.address}
        on:change={checkboxChange} />
      <label for="vastgoed">Vastgoed</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="bedrijven"
        name="bedrijven"
        bind:checked={checkboxState.department}
        on:change={checkboxChange} />
      <label for="bedrijven">Bedrijven</label>
    </div>

    {#each $cardsData as item}
      <Card item={item.data} />
    {/each}

    <!-- <Card /> -->
  </section>
</main>
