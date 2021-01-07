<script>
  let focused = false;
  let initialX = 0;
  let initialY = 0;
  let startX = 0;
  let startY = 0;
  let x = 0;
  let y = 0;

  function cardClick(e) {
    focused = true;

    startX = e.offsetX;
    startY = e.offsetY;

    x = e.offsetX;
    y = e.offsetY;
  }

  function cardDrag(e) {
    if (focused) {
      e.preventDefault();

      console.log(e.offsetX);

      const newX = e.offsetX - startX;
      const newY = e.offsetY - startY;

      // e.target / e.srcElement
      e.target.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  }

  function cardEnd() {
    focused = false;
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

<div
  class="card"
  on:mousedown={cardClick}
  on:mousemove={cardDrag}
  on:mouseup={cardEnd}>
  <h3>Card title</h3>
</div>
