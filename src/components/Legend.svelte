<script>
  import House from './icons/House.svelte';
  import Building from './icons/Building.svelte';
  import Person from './icons/Person.svelte';
</script>

<style lang="scss">
  ul {
    list-style: none;
  }

  h2 {
    margin-bottom: 0.2em;
    text-align: center;
  }

  .legend {
    position: fixed;
    bottom: 0.5rem;
    left: 0.5rem;

    padding: 0.6rem 1rem;
    border-radius: 0.5rem;

    background-color: var(--lightGray);

    p {
      max-width: 8rem;
      font-size: 0.75rem;
    }

    &__items {
      display: flex;
      flex-direction: row;
      align-items: center;

      margin-bottom: 0.6rem;

      :global(.legend__item) {
        background-color: hotpink;
        border-radius: 100rem;
        padding: 0.2rem;
        box-sizing: content-box;

        margin-right: 0.4rem;
      }

      :global(.legend__item--person) {
        background-color: var(--person);
      }
      :global(.legend__item--company) {
        background-color: var(--company);
      }

      :global(.legend__item--relation) {
        background-color: var(--employe);
      }
      :global(.legend__item--realEstate) {
        background-color: var(--realEstate);
      }

      :global(.legend__item path:last-child) {
        fill: var(--white);
      }
    }
  }
</style>

<div class="legend">
  <h2>Legenda</h2>
  <ul>
    <li class="legend__items">
      <Person class="legend__item legend__item--person" />
      <p>Persoon waar scan van is opgevraagd</p>
    </li>
    <li class="legend__items">
      <Building class="legend__item legend__item--company" />
      <p>Bedrijf van of waar de opgevraagde persoon werkzaam is</p>
    </li>
    <li class="legend__items">
      <Person class="legend__item legend__item--relation" />
      <p>Relaties van de op gevraagde persoon</p>
    </li>
    <li class="legend__items">
      <House class="legend__item legend__item--realEstate" />
      <p>Vastgoed van de op gevraagde persoon</p>
    </li>
  </ul>
</div>
