<script>
  import { q, qa } from './../modules/helper';

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
</script>

<style>
  .graphFilters {
    margin-top: 3rem;

    list-style: none;
    display: flex;
    flex-direction: row;

    background-color: var(--blue);

    /* justify-content: space-evenly; */

    width: 100%;

    color: var(--white);
  }

  .graphFilter__item:hover .filter__items {
    display: block;
  }

  .graphFilter__item {
    /* width: 100%; */
    padding: 0.6rem 0.8rem;
    background-color: var(--blue);

    cursor: pointer;

    border-left: 1px solid gray;
    border-right: 1px solid gray;
  }

  .graphFilter__item:first-child {
    border-left: none;
  }

  .graphFilter__item:last-child {
    border-right: none;
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

    padding: 1rem 1rem 0.8rem 1rem;

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
</style>

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
