const spotlightButton = document.getElementById("spotlight-button");
const spotlightResult = document.getElementById("spotlight-result");

spotlightButton.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/spotlight");
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const exhibit = await response.json();

    spotlightResult.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = exhibit.name;

    const desc = document.createElement("p");
    desc.textContent = exhibit.description;

    const link = document.createElement("a");
    link.href = `/zones/${exhibit.zone_slug}`;
    link.textContent = `Find it in the ${exhibit.zone_name}`;

    spotlightResult.appendChild(heading);
    spotlightResult.appendChild(desc);
    spotlightResult.appendChild(link);
  } catch (err) {
    console.error("Spotlight failed:", err);
    spotlightResult.textContent = "Sorry, try again in a moment.";
  }
});
