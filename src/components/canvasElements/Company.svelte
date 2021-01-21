<script>
  import { onMount } from 'svelte';

  import { cardsData, highlightedCard } from './../../store';
  import { qa, getAtribute } from './../../modules/helper';

  import Card from './../Card.svelte';
  import Building from './../icons/Building.svelte';

  let sortMode;

  const sortOptions = [
    {
      value: 'dateNewOld',
      name: 'Nieuw naar oud',
    },
    { value: 'dateOldNew', name: 'Oud naar nieuw' },
    { value: 'other', name: `Extern / ZZP'er` },
  ];

  function sortChange() {
    if (sortMode == 'dateNewOld') {
      let tempArr = [];
      for (const i of $cardsData) {
        if (!i.clicked && i.NodeID == 'PEOPLE') {
          i.date = getAtribute(i.Attributes.Attribute, 'DATE_OF_BIRTH');
          tempArr.push(i);
        }
      }

      tempArr = tempArr.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      $cardsData = [...tempArr];
    } else if (sortMode == 'dateOldNew') {
      let tempArr = [];
      for (const i of $cardsData) {
        if (!i.clicked && i.NodeID == 'PEOPLE') {
          i.date = getAtribute(i.Attributes.Attribute, 'DATE_OF_BIRTH');
          tempArr.push(i);
        }
      }

      tempArr = tempArr.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      $cardsData = [...tempArr];
    }
  }

  onMount(async () => {
    const collapsibles = qa('.collapsible');

    for (const i of collapsibles) {
      i.addEventListener('click', () => {
        i.classList.toggle('active');
        const content = i.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });
</script>

<style lang="scss">
  h3 {
    margin-bottom: 0;
    padding: 0 1rem 0.6em 1rem;

    color: var(--white);
    border-bottom: 1px solid var(--white);
  }

  h4 {
    font-size: 1rem;
    margin: 0.4rem 0 0.2em 0;
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
    }

    &__filter {
      padding: 1rem 0;

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

  .list--icon {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  :global(.icon--large) {
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

  .collapsible {
    background-color: var(--menuBack);
    cursor: pointer;
    padding: 1rem;
    width: 100%;
    border: none;

    outline: none;
    font-size: 1rem;
    font-weight: bold;

    text-align: left;
    color: var(--white);

    border-bottom: 1px solid var(--white);

    &::after {
      content: '';

      width: 1.4rem;
      height: 1.4em;

      background-image: url('/img/icon/arrow_up.svg');
      background-size: contain;
      background-repeat: no-repeat;

      filter: invert(1);

      transition: transform 0.2s ease;

      float: right;
      margin-left: 0.5rem;
    }
  }

  :global(.active::after) {
    transform: rotate(180deg);
  }

  .content {
    padding: 0 1rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;

    display: flex;
    flex-direction: column;

    :first-child {
      margin-top: 0.6rem;
    }
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
    <h3>Filter/sorteer</h3>

    <button class="collapsible">Sorteer op</button>
    <div class="content">
      {#each sortOptions as value}
        <label>
          <input
            type="radio"
            value={value.value}
            bind:group={sortMode}
            on:change={sortChange}
          />
          {value.name}
        </label>
      {/each}
    </div>

    <button class="collapsible">Filter</button>
    <div class="content">
      <h4>Arbeidsduur</h4>

      <label>
        <input type="checkbox" name="scales" checked />
        Nieuwe werknemer
      </label>

      <label>
        <input type="checkbox" name="horns" checked />
        Uit dienst
      </label>

      <label>
        <input type="checkbox" name="scales" checked />
        Al werkzaam
      </label>

      <label>
        <input type="checkbox" name="horns" checked />
        ZZP'er
      </label>

      <h4>Type functie</h4>

      <label>
        <input type="checkbox" name="scales" checked />
        Directeur
      </label>

      <label>
        <input type="checkbox" name="horns" checked />
        Manager
      </label>

      <label>
        <input type="checkbox" name="scales" checked />
        Medewerker
      </label>

      <label>
        <input type="checkbox" name="horns" checked />
        ZZP'er
      </label>
    </div>
  </div>
</section>

<ul class="cardList">
  {#each $cardsData as item}
    <Card {item} />
  {/each}
</ul>
