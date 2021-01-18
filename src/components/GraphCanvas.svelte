<script>
  import { cardsData, cardCanvasState, highlightedCard } from './../store';
  import { getAtribute } from './../modules/helper';
  import Card from './Card.svelte';
  import House from './icons/House.svelte';
</script>

<style>
  h1 {
    margin-top: 2.2rem;
  }

  .mapImg {
    width: 100%;
    height: auto;
    border-radius: 0.8rem;
  }

  .icon :global(.icon--large) {
    height: 6rem;
    width: 100%;

    margin: 0 auto;
  }

  .icon :global(.icon--large--white path:last-child) {
    fill: var(--white);
  }

  .addressBox {
    background-color: var(--realEstate);

    width: 100%;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 3.4rem;

    display: grid;
    grid-template-columns: auto 65%;
  }

  .addressBox li {
    color: var(--white);
    margin-bottom: 0.5em;
  }

  ul {
    list-style: none;
  }

  .cardList {
    display: grid;
    grid-template-columns: repeat(auto-fit, 14rem);
    grid-template-rows: repeat(auto-fit, 12rem);
    grid-column-gap: 1.4rem;
    grid-row-gap: 1.4rem;

    margin-bottom: 1.4rem;
  }
</style>

<div>
  {#if $cardCanvasState == 'people'}
    <h1>person</h1>
  {:else if $cardCanvasState == 'department'}
    <h1>company</h1>
  {:else if $cardCanvasState == 'address'}
    <h1>
      {`U bekijkt nu ${getAtribute(
        $highlightedCard.Attributes.Attribute,
        'STREET_ADDRESS'
      )}`}
    </h1>

    <h3>address</h3>
    <section class="addressBox">
      <div class="icon">
        <House class="icon--large icon--large--white" />

        <ul>
          <li>
            Datum van aankoop:
            <b
              >{`${getAtribute(
                $highlightedCard.Attributes.Attribute,
                'FROM_DATE'
              )}`}
            </b>
          </li>
          <li>
            Aantal bewoners:
            <b>
              {$cardsData.length - 1}
            </b>
          </li>
        </ul>
      </div>
      <div>
        <img class="mapImg" src="./img/map.png" alt="" />
      </div>
    </section>

    <ul class="cardList">
      {#each $cardsData as item}
        <Card {item} />
      {/each}
    </ul>

    <section>
      <h2>
        {!$cardsData[0].clicked ? $cardsData[0].Label : $cardsData[1].Label} bezit
        ook:
      </h2>

      <ul>
        <li>img</li>
        <li>img</li>
        <li>img</li>
      </ul>
    </section>
  {:else}
    <h1>other</h1>
  {/if}
</div>
