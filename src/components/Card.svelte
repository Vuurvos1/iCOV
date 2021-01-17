<script>
  import { q, qa, moveInArray } from './../modules/helper';
  import { onMount } from 'svelte';

  export let item;

  // let state = {
  //   dragging: false,
  //   hidden: false,

  //   deltaX: 0,
  //   deltaY: 0,

  //   x: 0,
  //   y: 0,
  // };

  /*
  function dragStart(e) {
    e.preventDefault();

    state.dragging = true;
    state.xDiff = e.pageX - state.x;
    state.yDiff = e.pageY - state.y;
  }

  function dragMove(e) {
    if (state.dragging) {
      // add clamp functions
      state.x = e.pageX - state.xDiff;
      state.y = e.pageY - state.yDiff;
    }

    // Update window position
    let w = e.target || e.srcElement;

    if (w.classList[0] == "window") {
      w.style.transform = "translate(" + state.x + "px, " + state.y + "px)";
    }
    // console.log(w);
    // var w = document.querySelector(".window");

    // renderWindow(w, state);
  }

  function dragEnd() {
    state.dragging = false;
  }

  function windowClick(e) {
    let windows = qa(".window");

    let windowArray = [...windows].sort((el) => {
      el.style.zIndex;
    });

    // move e to index 0
    let focusIndex = windowArray.indexOf(e.srcElement);

    // remove selected from array
    windowArray.splice(focusIndex, 1);
    // move selected to spot number 0
    windowArray.splice(0, 0, e.srcElement);

    for (let i = 0; i < windowArray.length; i++) {
      windowArray[i].style.zIndex = windowArray.length - i;
    }
  }
  */

  onMount(() => {});
</script>

<style>
  .window {
    /* position: absolute; */

    width: 320px;
    height: 220px;

    padding: 0.4rem;

    background-color: hotpink;

    z-index: 1;

    /* temp */
    overflow: hidden;
  }

  .window--clicked {
    background-color: orangered;
  }

  .window__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    /* cursor: move; */

    /* pointer-events: ; */
  }

  .window__header:active {
    user-select: none;
  }

  .window__header:hover {
    cursor: move;
  }
</style>

<!-- add class based on id to remove later -->
<div class={`window ${item.clicked ? 'window--clicked' : ''}`}>
  <div class="window__header">
    <h3>{item.Label}</h3>
    <button>Close</button>
  </div>

  <div class="window__body">
    <p>{JSON.stringify(item)}</p>
  </div>
</div>
