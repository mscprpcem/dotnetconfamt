// Countdown Timer (if exists on page)
const countdownElement = document.getElementById("countdown");
if (countdownElement) {
  const targetDate = new Date("2025-12-18T09:00:00").getTime();
  const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    if (distance < 0) {
      clearInterval(countdown);
      countdownElement.innerHTML = "The event has started!";
    }
  }, 1000);
}

// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("show");
    document.body.classList.toggle("menu-open");
  });
}


// Badge
 // 🎯 Get all necessary DOM elements
  const uploadBtn = document.getElementById("uploadBtn");
  const uploadInput = document.getElementById("upload");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const downloadBtn = document.getElementById("downloadBtn");
  const removeBtn = document.getElementById("removeBtn");
  const shapeBtns = document.querySelectorAll(".shape-btn");

  const linkedinShare = document.getElementById("linkedinShare");
  const twitterShare = document.getElementById("twitterShare");
  const instagramShare = document.getElementById("instagramShare");

  // 🖼️ Initialize variables
  let uploadedImg = null;
  let shape = "square";

  // 🧩 Load the frame overlay
  const frame = new Image();
  frame.crossOrigin = "anonymous"; // Prevent CORS issues for canvas export
  frame.src = "./assets/frame.png";

  // Draw default frame when loaded
  frame.onload = () => drawBadge();

  // 📤 Handle Upload Button
  uploadBtn.addEventListener("click", () => uploadInput.click());

  // 📸 Handle Image Upload
  uploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      uploadedImg = new Image();
      uploadedImg.onload = drawBadge;
      uploadedImg.src = event.target.result;
    };
    reader.readAsDataURL(file);

    removeBtn.style.display = "block";
  });

  // ❌ Remove Uploaded Image
  removeBtn.addEventListener("click", () => {
    uploadedImg = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBadge();
    downloadBtn.disabled = true;
    uploadInput.value = "";
    removeBtn.style.display = "none";
  });

  // ⚙️ Shape Selector (Square / Circle)
  shapeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      shapeBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      shape = btn.dataset.shape;
      drawBadge();
    });
  });

  // 🧠 Main Drawing Function
  function drawBadge() {
    const size = canvas.width;
    ctx.clearRect(0, 0, size, size);
    ctx.save();

    // Apply circular clipping if needed
    if (shape === "circle") {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2);
      ctx.clip();
    }

    // Draw uploaded image if available
    if (uploadedImg) {
      ctx.drawImage(uploadedImg, 0, 0, size, size);
    }

    // Draw badge frame
    ctx.drawImage(frame, 0, 0, size, size);

    ctx.restore();
    downloadBtn.disabled = false;
  }

  // 💾 Download the badge as PNG
  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "dotnetconf-badge.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  // 🔗 Social Share Links
  const registrationLink = "https://dotnetconfamravati.com/register";
  const message = encodeURIComponent(
    "I'm attending .NET Conf Amravati! 🎉 Join me here 👉 " + registrationLink
  );

  linkedinShare.href = `https://www.linkedin.com/sharing/share-offsite/?url=${registrationLink}`;
  twitterShare.href = `https://twitter.com/intent/tweet?text=${message}`;
  instagramShare.href = `https://www.instagram.com/`;

    const shareData = {
    title: '.NET Conf Amravati',
    text: "I'm attending .NET Conf Amravati! 🎉 Join me 👉 https://dotnetconfamravati.com/register",
    files: []
  };

  document.getElementById("shareBtn").addEventListener("click", async () => {
    if (navigator.share) {
      const blob = await (await fetch(canvas.toDataURL())).blob();
      const file = new File([blob], "dotnetconf-badge.png", { type: "image/png" });
      shareData.files = [file];
      await navigator.share(shareData);
    } else {
      alert("Sharing not supported on this device/browser.");
    }
  });


 