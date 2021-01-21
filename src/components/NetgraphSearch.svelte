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

<style lang="scss">
  .graphFilters {
    margin-top: 3rem;

    list-style: none;
    display: flex;
    flex-direction: row;

    background-color: var(--menuBack);

    width: 100%;

    color: var(--white);
  }

  .graphFilter__item {
    padding: 0.6rem 0.8rem;
    background-color: var(--menuBack);

    display: flex;
    flex-direction: row;
    align-items: center;

    cursor: pointer;

    position: relative;

    border-left: 1px solid gray;
    border-right: 1px solid gray;

    &:hover .filter__items {
      display: block;
    }

    &:first-child {
      border-left: none;
    }

    &:last-child {
      border-right: none;
    }

    img {
      height: 1rem;
      width: auto;
      margin-right: 0.2rem;
      filter: invert(1);
    }

    span {
      display: flex;
      flex-direction: row;
      align-items: center;

      color: var(--white);
    }
  }

  .filter__items {
    list-style: none;

    display: none;
    position: absolute;
    top: 2.4rem;
    left: 0;
    background-color: var(--menuBack);

    min-width: 9rem;

    padding: 0.4rem 0.8rem 0.8rem 0.8rem;

    z-index: 1;

    white-space: nowrap;

    li {
      padding-bottom: 0.4rem;
    }

    label {
      color: var(--white);
    }
  }

  .graphFilter__item label,
  .graphFilter__item input {
    cursor: pointer;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    color: var(--white);
    font-size: 1rem;
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
        <label for="personen">Relaties</label>
      </li>
      <li>
        <input
          type="checkbox"
          id="vastgoed"
          name="vastgoed"
          bind:checked={checkboxState.address}
          on:change={checkboxChange}
        />
        <label for="vastgoed">Eigendommen</label>
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
      <li>
        <button
          on:click={() => {
            for (const i of qa('.node')) {
              i.style.opacity = '1';
            }
          }}> Reset </button>
      </li>
    </ul>
  </li>
  <li class="graphFilter__item">
    <span><img src="./img/icon/user.svg" alt="" />Relaties</span>
    <ul class="filter__items">
      <li>
        <input type="checkbox" id="a" name="a" checked />
        <label for="a">Arbeidsrelaties</label>
      </li>
      <li>
        <input type="checkbox" id="b" name="b" checked />
        <label for="b">Financiële</label>
      </li>
      <li>
        <input type="checkbox" id="c" name="c" checked />
        <label for="c">Justitionele</label>
      </li>
      <li>
        <input type="checkbox" id="d" name="d" checked />
        <label for="d">Persoonlijke</label>
      </li>
    </ul>
  </li>
  <li class="graphFilter__item">
    <img src="./img/icon/euro.svg" alt="" /> Vermogen
  </li>
  <li class="graphFilter__item">
    <span><img src="./img/icon/home.svg" alt="" /> Vastgoed</span>

    <ul class="filter__items">
      <li>
        <input
          type="checkbox"
          id="vastgoedBedrijven"
          name="vastgoedBedrijven"
          checked
        />
        <label for="vastgoedBedrijven">Bedrijven</label>
      </li>
      <li>
        <input
          type="checkbox"
          id="vastgoedVastgoed"
          name="vastgoedVastgoed"
          checked
        />
        <label for="vastgoedVastgoed">Vastgoed</label>
      </li>
      <li>
        <input
          type="checkbox"
          id="vastgoedVoertuig"
          name="vastgoedVoertuig"
          checked
        />
        <label for="vastgoedVoertuig">Voertuigen</label>
      </li>
    </ul>
  </li>
  <li class="graphFilter__item">
    <img src="./img/icon/work.svg" alt="" /> Werk geschiedenis
  </li>
  <li class="graphFilter__item">
    <img src="./img/icon/time.svg" alt="" /> Exacte datum
  </li>
</ul>
