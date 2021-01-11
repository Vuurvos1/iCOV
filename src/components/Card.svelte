<script>
  import { q, qa, moveInArray } from "./../modules/helper";
  import { onMount } from "svelte";

  let state = {
    dragging: false,
    hidden: false,

    deltaX: 0,
    deltaY: 0,

    x: 50,
    y: 50,
  };

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
      windowArray[i].style.zIndex = i + 1;
    }
  }

  onMount(() => {});
</script>

<style>
  .window {
    position: absolute;

    width: 320px;
    height: 220px;

    padding: 0.4rem;

    background-color: hotpink;

    z-index: 1;
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

<div
  class="window"
  on:mousedown={dragStart}
  on:mousemove={dragMove}
  on:mouseup={dragEnd}
  on:click={windowClick}
  style="z-index: 3">
  <div class="window__header">
    <h3>Card title</h3>
    <button>Close</button>
  </div>

  <div class="window__body">
    <p>test</p>
  </div>
</div>
