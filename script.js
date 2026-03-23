const form = document.getElementById("waitlistForm");
const msg = document.getElementById("responseMsg");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch("YOUR_GOOGLE_SCRIPT_URL", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(() => {
    msg.innerText = "✅ You're on the early access list!";
    msg.style.color = "lightgreen";
    form.reset();
  })
  .catch(() => {
    msg.innerText = "❌ Something went wrong!";
    msg.style.color = "red";
  });
});