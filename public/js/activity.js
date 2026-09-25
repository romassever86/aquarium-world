const tiles = document.querySelectorAll(".fact-tile");
const progressText = document.getElementById("progress");
const completionMessage = document.getElementById("completion-message");
let revealedCount = 0;

tiles.forEach(tile => {
  tile.addEventListener("click", handleTileClick);
});

function handleTileClick(event) {
  const tile = event.currentTarget;

  if (tile.classList.contains("revealed")) {
    return;
  }

  tile.textContent = tile.dataset.fact;
  tile.classList.add("revealed");
  revealedCount += 1;
  updateProgress();
}

function updateProgress() {
  progressText.textContent = `${revealedCount} of ${tiles.length} facts revealed`;

  if (revealedCount === tiles.length) {
    completionMessage.hidden = false;
  }
}
