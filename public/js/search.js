const searchInput = document.getElementById("search-input");
const resultsList = document.getElementById("search-results");

let debounceTimer;

searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  const query = searchInput.value.trim();

  if (query.length === 0) {
    resultsList.innerHTML = "";
    return;
  }

  debounceTimer = setTimeout(() => {
    runSearch(query);
  }, 250);
});

async function runSearch(query) {
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const results = await response.json();
    renderResults(results);
  } catch (err) {
    console.error("Search failed:", err);
    resultsList.innerHTML = "<li>Something went wrong. Please try again.</li>";
  }
}

function renderResults(results) {
  resultsList.innerHTML = "";

  if (results.length === 0) {
    resultsList.innerHTML = "<li>No exhibits found.</li>";
    return;
  }

  results.forEach(item => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `/zones/${item.zone_slug}`;
    link.textContent = `${item.name} (${item.zone_name})`;
    li.appendChild(link);
    resultsList.appendChild(li);
  });
}
