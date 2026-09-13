// ==========================================
// 5-Second Redirect to https://dnc.mscprpcem.tech/
// ==========================================
(function initRedirect() {
  const TARGET_URL = "https://dnc.mscprpcem.tech/";
  let seconds = 5;
  const countEl = document.getElementById("redirect-countdown");
  const barEl = document.getElementById("redirect-progress-bar");
  const overlay = document.getElementById("redirect-overlay");
  const topBar = document.getElementById("redirect-top-bar");
  const stayBtn = document.getElementById("redirect-stay-btn");
  const goBtn = document.getElementById("redirect-btn");
  const directLink = document.getElementById("direct-url-link");

  let cancelled = false;

  function executeRedirect() {
    window.location.href = TARGET_URL;
  }

  const timer = setInterval(() => {
    if (cancelled) return;
    seconds--;
    if (countEl) countEl.textContent = seconds;
    if (barEl) {
      const progress = ((5 - seconds) / 5) * 100;
      barEl.style.width = progress + "%";
    }
    if (seconds <= 0) {
      clearInterval(timer);
      executeRedirect();
    }
  }, 1000);

  if (goBtn) {
    goBtn.addEventListener("click", function(e) {
      e.preventDefault();
      clearInterval(timer);
      executeRedirect();
    });
  }

  if (directLink) {
    directLink.addEventListener("click", function(e) {
      e.preventDefault();
      clearInterval(timer);
      executeRedirect();
    });
  }

  if (stayBtn) {
    stayBtn.addEventListener("click", function() {
      cancelled = true;
      clearInterval(timer);
      if (overlay) overlay.style.display = "none";
      if (topBar) topBar.style.display = "block";
    });
  }
})();


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