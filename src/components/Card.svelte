<script>
  import { q, qa, getAtribute } from './../modules/helper';
  import Female from './icons/Female.svelte';
  import Male from './icons/Male.svelte';

  export let item;
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
  <div class={`window ${item.clicked ? 'window--clicked' : ''}`}>
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
            {getAtribute(item.Attributes.Attribute, 'DATE_OF_BIRTH')}
          </b>
        </li>
      </ul>

      <!-- <p>{JSON.stringify(item)}</p> -->
    </div>
  </div>
{/if}

<!-- {
  "SID": "2458635",
  "NetworkSID": "2458250",
  "NetworkLayerSID": "2458271",
  "NodeID": "ADDRESS",
  "SubNodeID": "ADDRESS",
  "NodeType": "NODE",
  "Label": "Vliegenstraat Leiden",
  "Key": "VliegenstraatNederland2222BBLeiden",
  "Evaluated": "1",
  "Flagged": "1",
  "StepsFromStart": "4",
  "StepsFromStartInLayer": "2",
  "NumberOfFlags": "0",
  "NetworkStartNode": "0",
  "TopNode": "0",
  "DisplayProperties": {
    "NodeIcons": "",
    "IconOverride": "FutureUse",
    "Size": "FutureUse",
    "AuraWeight": "FutureUse",
    "AuraColour": "FutureUse"
  },
  "Attributes": {
    "Attribute": [
      {
        "Name": "CITY",
        "Value": "Leiden"
      },
      {
        "Name": "COUNTRY",
        "Value": "Nederland"
      },
      {
        "Name": "FROM_DATE",
        "Value": "2016-12-01"
      },
      {
        "Name": "POSTAL_CODE",
        "Value": "2222BB"
      },
      {
        "Name": "STREET_ADDRESS",
        "Value": "Vliegenstraat"
      },
      {
        "Name": "LABEL",
        "Value": "Vliegenstraat Leiden"
      }
    ]
  }
}, -->
