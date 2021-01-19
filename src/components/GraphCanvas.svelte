<script>
  import { cardsData, cardCanvasState, highlightedCard } from './../store';
  import { getAtribute } from './../modules/helper';
  import Card from './Card.svelte';
  import House from './icons/House.svelte';
  import Building from './icons/Building.svelte';
  import Female from './icons/Female.svelte';
  import Male from './icons/Male.svelte';

  function getSex() {
    return getAtribute($highlightedCard.Attributes.Attribute, 'SEX');
  }
</script>

<style>
  h3 {
    color: var(--white);
  }

  .mapImg {
    width: 100%;
    height: auto;
    border-radius: 0.8rem;
  }

  .graphCanvas {
    max-height: 100vh;
    overflow-y: scroll;

    padding: 2.6rem 1rem 0 1rem;
  }

  .icon :global(.icon--large) {
    height: 6rem;
    width: 100%;

    margin: 0 auto;
  }

  .icon :global(.icon--large--white path:last-child) {
    fill: var(--white);
  }

  .icon :global(.cardList__icon) {
    height: 1.2em;
    width: auto;
  }

  .icon :global(.cardList__icon path:last-child) {
    fill: var(--white);
  }

  .addressBox {
    color: var(--white);
    background-color: var(--realEstate);

    width: 100%;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 3.4rem;

    display: grid;
    grid-template-columns: auto 65%;
  }

  .addressBox--department {
    background-color: var(--company);
    color: var(--black);
  }

  .addressBox--person {
    background-color: var(--person);
  }

  .addressBox li {
    margin-bottom: 0.5em;
  }

  ul {
    list-style: none;
  }

  .cardList {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
    grid-template-rows: repeat(auto, 12rem);
    grid-column-gap: 1.4rem;
    grid-row-gap: 1.4rem;

    width: 100%;

    margin-bottom: 1.4rem;
  }
</style>

<div class="graphCanvas">
  {#if $cardCanvasState == 'people'}
    <h1>
      U bekijkt nu {$highlightedCard.Label}
    </h1>

    <section class="addressBox addressBox--people">
      <div class="icon">
        <h3>
          {$highlightedCard.Label}
        </h3>

        <ul>
          <li>
            Geslacht:
            <b>{getAtribute($highlightedCard.Attributes.Attribute, 'SEX')} </b>
            {#if getSex() == 'MALE'}
              <Male class="cardList__icon" />
            {:else}
              <Female class="cardList__icon" />
            {/if}
          </li>
          <li>
            Connecties:
            <b>
              {$cardsData.length - 1}
            </b>
          </li>
          <li>
            Geboortedatum:
            <b>
              {getAtribute(
                $highlightedCard.Attributes.Attribute,
                'DATE_OF_BIRTH'
              )}
            </b>
          </li>
        </ul>
      </div>
    </section>
  {:else if $cardCanvasState == 'department'}
    <h1>
      {`U bekijkt nu ${getAtribute(
        $highlightedCard.Attributes.Attribute,
        'DEPARTMENT_NAME'
      )}`}
    </h1>

    <h3>
      Zip: {getAtribute($highlightedCard.Attributes.Attribute, 'LOCATION_ID')}
    </h3>

    <section class="addressBox addressBox--department">
      <div class="icon">
        <Building class="icon--large" />

        <ul>
          <li>
            Department ID:
            <b
              >{`${getAtribute(
                $highlightedCard.Attributes.Attribute,
                'DEPARTMENT_ID'
              )}`}
            </b>
          </li>
          <li>
            Aantal werknemers:
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
    <h1>U bekijkt nu Steven King</h1>

    <section class="addressBox addressBox--person">
      <div class="icon">
        <h3>Steven King</h3>

        <ul>
          <li>
            Geslacht:
            <b>man </b>
            <Male class="cardList__icon" />
          </li>
          <li>
            Connecties:
            <b> 19 </b>
          </li>
          <li>
            Geboortedatum:
            <b> 1955-04-08 </b>
          </li>
        </ul>
      </div>
    </section>
  {/if}
</div>
