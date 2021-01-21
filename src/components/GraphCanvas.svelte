<script>
  import { cardsData, cardCanvasState, highlightedCard } from './../store';
  import { getAtribute, convertDate } from './../modules/helper';
  import Card from './Card.svelte';
  import House from './icons/House.svelte';
  import Female from './icons/Female.svelte';
  import Male from './icons/Male.svelte';

  import Company from './canvasElements/Company.svelte';

  function getSex() {
    return getAtribute($highlightedCard.Attributes.Attribute, 'SEX');
  }

  function subLocation() {
    let zip = getAtribute($highlightedCard.Attributes.Attribute, 'POSTAL_CODE');
    const city = getAtribute($highlightedCard.Attributes.Attribute, 'CITY');

    console.log(zip, city);

    zip = zip.slice(0, 4) + ' ' + zip.slice(4);

    return `${zip},  ${city}`;
  }
</script>

<style lang="scss">
  h2 {
    font-size: 1rem;
    color: var(--black);
    font-weight: 400;
  }
  h3 {
    color: var(--black);
  }

  .zeroState {
    margin-top: 8rem;
  }

  .mapImg {
    width: 100%;
    height: auto;
    border-radius: 0.8rem;
  }

  .graphCanvas {
    max-height: 100vh;
    overflow-y: scroll;

    padding: 3.6rem 1rem 0 1rem;
  }

  .list--icon {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .list--icon b {
    margin-left: 0.4em;
  }

  .icon {
    h3 {
      color: var(--white);
    }
    :global(.icon--large) {
      height: 6rem;
      width: 100%;

      margin: 0 auto;
    }
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
    grid-template-columns: 1fr 60%;
    grid-column-gap: 1rem;
  }

  .addressBox--person {
    background-color: var(--person);
    max-width: 24rem;
    min-height: 16rem;
    margin: 2rem auto 0 auto;
  }

  .addressBox li {
    margin-bottom: 0.5em;
  }

  ul {
    list-style: none;
  }

  .cardList {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
    grid-template-rows: auto;
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

    <section class="addressBox addressBox--person">
      <div class="icon">
        <h3>
          {$highlightedCard.Label}
        </h3>

        <ul>
          <li class="list--icon">
            Geslacht:
            <b> {getSex().toLowerCase()} </b>
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
              {convertDate(
                getAtribute(
                  $highlightedCard.Attributes.Attribute,
                  'DATE_OF_BIRTH'
                )
              )}
            </b>
          </li>
        </ul>
      </div>
    </section>
  {:else if $cardCanvasState == 'department'}
    <Company />
  {:else if $cardCanvasState == 'address'}
    <h1>
      {`U bekijkt nu ${getAtribute(
        $highlightedCard.Attributes.Attribute,
        'STREET_ADDRESS'
      )}`}
    </h1>

    <h3>{subLocation()}</h3>
    <section class="addressBox">
      <div class="icon">
        <House class="icon--large icon--large--white" />

        <ul>
          <li>
            Datum van aankoop:
            <b>
              {convertDate(
                getAtribute($highlightedCard.Attributes.Attribute, 'FROM_DATE')
              )}
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
      <img class="mapImg" src="./img/map.png" alt="" />
    </section>

    <ul class="cardList">
      {#each $cardsData as item}
        <Card {item} />
      {/each}
    </ul>

    <section>
      <h3>
        {!$cardsData[0].clicked ? $cardsData[0].Label : $cardsData[1].Label} bezit
        ook:
      </h3>

      <ul>
        <!-- <li>img</li>
        <li>img</li>
        <li>img</li> -->
      </ul>
    </section>
  {:else}
    <div class="zeroState">
      <h1>Uw canvas is leeg</h1>
      <h2>Klik op een dot in de Relatie Scan om meer informatie te zien</h2>
    </div>
  {/if}
</div>
