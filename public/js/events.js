const yearSelect = document.getElementById("year-select");
const categorySelect = document.getElementById("category-select");
const eventsList = document.getElementById("events-list");

yearSelect.addEventListener("change", updateEvents);
categorySelect.addEventListener("change", updateEvents);

async function updateEvents() {
  const year = yearSelect.value;
  const category = categorySelect.value;
  try {
    const response = await fetch(`/api/events?year=${encodeURIComponent(year)}&category=${encodeURIComponent(category)}`);
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const events = await response.json();
    renderEvents(events);
  } catch (err) {
    console.error("Events update failed:", err);
    eventsList.innerHTML = "<li>Something went wrong. Please try again.</li>";
  }
}

function renderEvents(events) {
  eventsList.innerHTML = "";
  if (events.length === 0) {
    eventsList.innerHTML = "<li>No events found for these filters.</li>";
    return;
  }
  events.forEach(event => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `/events/${event.id}`;
    link.textContent = event.title;
    li.appendChild(link);
    li.appendChild(document.createTextNode(` — ${event.event_date} (${event.category})`));
    eventsList.appendChild(li);
  });
}
