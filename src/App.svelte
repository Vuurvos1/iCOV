<script>
  import { onMount } from "svelte";

  import Card from "./components/Card.svelte";

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

    background-color: lightblue;
  }

  #networkGraph img {
    width: 6rem;
    height: auto;

    margin: 0 auto;
  }

  #networkGraph h3 {
    text-align: center;
  }
</style>

<header><a href="#">Menu</a> <img src="./img/iCOV.png" alt="iCOV" /></header>

<main>
  <section id="networkGraph">
    <div>
      <h3>Network graph</h3>

      <img src="img/icon/account_circle.svg" alt="main icon" />
    </div>
  </section>
  <section>
    <Card />
    <Card />
  </section>
</main>
