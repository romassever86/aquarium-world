const form = document.getElementById("contact-form");

form.addEventListener("submit", (event) => {
  const email = document.getElementById("email");
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  if (!isValid) {
    event.preventDefault();
    alert("Please enter a valid email address.");
  }
});