<script>
  import { cardsData, cardCanvasState, highlightedCard } from './../../store';
  import { getAtribute, convertDate } from './../../modules/helper';

  import Card from './../Card.svelte';
  import Building from './../icons/Building.svelte';
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

  .infoBox {
    display: grid;
    grid-template-columns: 1fr 16rem;
    grid-column-gap: 1rem;

    margin-bottom: 2rem;

    color: var(--black);

    &__info {
      display: flex;
      flex-direction: row;

      min-height: 16rem;
      width: 100%;

      padding: 1rem;

      border-radius: 0.5rem;

      background-color: var(--company);

      :global(.icon--large) {
        width: 100%;
        height: 5rem;

        margin: 0 auto;
      }
    }

    &__filter {
      padding: 1rem;

      border-radius: 0.5rem;

      color: var(--white);
      background-color: var(--menuBack);
    }

    &__img {
      width: 14rem;
      border-radius: 0.8rem;
      object-fit: cover;
    }
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

  .icon .icon :global(.icon--large) {
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

    width: 100%;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 3.4rem;

    display: grid;
    grid-template-columns: auto 65%;
  }

  .infoBox li {
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

<h1>
  {`U bekijkt nu ${getAtribute(
    $highlightedCard.Attributes.Attribute,
    'DEPARTMENT_NAME'
  )}`}
</h1>

<h3>
  Zip: {getAtribute($highlightedCard.Attributes.Attribute, 'LOCATION_ID')}
</h3>

<section class="infoBox infoBox--department">
  <div class="infoBox__info">
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

    <img class="infoBox__img" src="./img/map.png" alt="" />
  </div>

  <div class="infoBox__filter">
    <div>Filter/sorteer</div>
  </div>
</section>

<ul class="cardList">
  {#each $cardsData as item}
    <Card {item} />
  {/each}
</ul>
