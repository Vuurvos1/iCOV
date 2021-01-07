<script>
  let focused = false;
  let x = 0;
  let y = 0;

  function cardClick(e) {
    focused = true;

    x = e.offsetX;
    y = e.offsetY;
  }

  function cardDrag(e) {
    if (focused) {
      // e.target / e.srcElement
      console.log(e.);
    }
  }
</script>

<style>
  .card {
    background-color: hotpink;
    width: 8rem;
    height: 12rem;

    padding: 0.4rem;
  }
</style>

<div class="card" on:mousedown={cardClick} on:mousemove={cardDrag}>
  <h3>Card title</h3>
</div>
