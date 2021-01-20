<script>
  import { q, qa, getAtribute, convertDate } from './../modules/helper';
  import Female from './icons/Female.svelte';
  import Male from './icons/Male.svelte';

  export let item;

  function highlightGraph(element) {
    const allNodes = qa('.node');
    for (const i of allNodes) {
      i.style.opacity = '0.3';
    }

    q(`.a${element}`).style.opacity = '1';
  }
</script>

<style>
  h3 {
    color: var(--white);
    font-size: 1.2rem;

    margin-bottom: 0.4em;
  }

  .window {
    width: 100%;
    height: 100%;

    padding: 0.4rem;

    padding: 1rem;
    background-color: var(--employe);
    border-radius: 0.5rem;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .window--clicked {
    background-color: orangered;
  }

  .window__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .cardList__item {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: var(--white);

    margin-bottom: 0.2rem;
  }

  .cardList__item--date {
    display: inline;
  }

  .cardList__item b {
    margin-left: 0.4em;
  }

  .cardList__item :global(.cardList__icon) {
    height: 1.2em;
    width: auto;
  }

  .cardList__item :global(.cardList__icon path:last-child) {
    fill: var(--white);
  }
</style>

<!-- add class based on id to remove later -->
{#if !item.clicked}
  <div
    class={`window ${item.clicked ? 'window--clicked' : ''}`}
    on:click={highlightGraph(item.SID)}
  >
    <div class="window__header">
      <h3>{item.Label}</h3>
    </div>

    <div class="window__body">
      <ul class="cardList">
        <li class="cardList__item">
          Geslacht:
          <b>
            {getAtribute(item.Attributes.Attribute, 'SEX').toLowerCase()}
          </b>
          {#if getAtribute(item.Attributes.Attribute, 'SEX') == 'MALE'}
            <Male class="cardList__icon" />
          {:else}
            <Female class="cardList__icon" />
          {/if}
        </li>
        <li class="cardList__item cardList__item--date">
          Geboortedatum:
          <b>
            <br />
            {convertDate(
              getAtribute(item.Attributes.Attribute, 'DATE_OF_BIRTH')
            )}
          </b>
        </li>
      </ul>
    </div>
  </div>
{/if}
