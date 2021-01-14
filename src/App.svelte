<script>
  import { onMount } from 'svelte';

  import { q, qa } from './modules/helper';

  import { cardsData } from './store';

  import Card from './components/Card.svelte';
  import NetworkGraph from './components/NetworkGraph.svelte';

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
        el.style.opacity = checkboxState[state] ? '1' : '0.3';
      }
    }
  }

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

  .graphFilters {
    margin-top: 3rem;

    list-style: none;
    display: flex;
    flex-direction: row;

    background-color: var(--blue);

    justify-content: space-between;

    width: 100%;

    color: var(--white);
  }

  .graphFilter__item:hover .filter__items {
    display: block;
  }

  .graphFilter__item {
    width: auto;
    padding: 0.6rem 0;
    background-color: var(--blue);

    cursor: pointer;
  }

  .graphFilter__item:first-child {
    padding-left: 1rem;
  }

  .graphFilter__item:last-child {
    padding-right: 1rem;
  }

  .graphFilter__item span {
    display: flex;
    flex-direction: row;
    align-items: center;

    color: var(--white);
  }

  .graphFilter__item img {
    margin-right: 0.2rem;
  }

  .filter__items {
    list-style: none;

    display: none;
    position: absolute;
    background-color: var(--blue);

    margin-left: -1rem;
    min-width: 9rem;

    padding: 0.4rem 1rem 0.8rem 1rem;

    z-index: 1;
  }

  .filter__items li {
    padding-bottom: 0.4rem;
  }

  .filter__items label {
    color: var(--white);
  }

  .graphFilter__item label,
  .graphFilter__item input {
    cursor: pointer;
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
    rel="stylesheet"
  />
</svelte:head>

<header>
  <a class="button button--icon" href="back"
    ><img src="./img/icon/round_arrow.svg" alt="" /> Hoofdmenu</a
  >
  <img src="./img/iCOV.png" alt="iCOV" />
</header>

<main>
  <section id="networkGraph">
    <ul class="graphFilters">
      <li class="graphFilter__item">
        <span><img src="./img/icon/filter.svg" alt="" />Filters</span>
        <ul class="filter__items">
          <li>
            <input
              type="checkbox"
              id="personen"
              name="personen"
              bind:checked={checkboxState.people}
              on:change={checkboxChange}
            />
            <label for="personen">Personen</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="vastgoed"
              name="vastgoed"
              bind:checked={checkboxState.address}
              on:change={checkboxChange}
            />
            <label for="vastgoed">Vastgoed</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="bedrijven"
              name="bedrijven"
              bind:checked={checkboxState.department}
              on:change={checkboxChange}
            />
            <label for="bedrijven">Bedrijven</label>
          </li>
        </ul>
      </li>
      <li class="graphFilter__item">
        <img src="./img/icon/user.svg" alt="" /> Relaties
      </li>
      <li class="graphFilter__item">
        <img src="./img/icon/euro.svg" alt="" /> Vermogen
      </li>
      <li class="graphFilter__item">
        <img src="./img/icon/home2.svg" alt="" /> Vastgoed
      </li>
      <li class="graphFilter__item">
        <img src="./img/icon/werk.svg" alt="" /> Werk geschiedenis
      </li>
      <li class="graphFilter__item">
        <img src="./img/icon/time.svg" alt="" /> Exacte datum
      </li>
    </ul>

    <NetworkGraph />
  </section>
  <section id="cardCanvas">
    {#each $cardsData as item}
      <Card item={item.data} />
    {/each}
  </section>
</main>
