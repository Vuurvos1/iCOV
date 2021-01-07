<script>
  let state = {
    dragging: false,
    hidden: false,

    deltaX: 0,
    deltaY: 0,

    x: 50,
    y: 50,
  };

  function dragStart(e) {
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
    var w = document.querySelector(".window");
    // renderWindow(w, state);

    w.style.transform = "translate(" + state.x + "px, " + state.y + "px)";
  }

  function dragEnd() {
    state.dragging = false;
  }
</script>

<style>
  .window {
    position: absolute;

    width: 320px;
    height: 220px;

    padding: 0.4rem;

    background-color: hotpink;
  }

  .window__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>

<div
  class="window"
  on:mousedown={dragStart}
  on:mousemove={dragMove}
  on:mouseup={dragEnd}>
  <div class="window__header">
    <h3>Card title</h3>
    <button>Close</button>
  </div>

  <div class="window__body">
    <p>test</p>
  </div>
</div>
