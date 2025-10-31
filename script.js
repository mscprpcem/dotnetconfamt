const menuBtn = document.getElementById("navbar-menu-btn");
      const nav = document.getElementById("navbar-links");
      const icon = document.getElementById("hamburger-icon");
      const overlay = document.getElementById("menu-overlay");

      menuBtn.addEventListener("click", () => {
        const isActive = nav.classList.toggle("active");
        icon.classList.toggle("open", isActive);
        overlay.classList.toggle("active", isActive);
      });

      overlay.addEventListener("click", () => {
        nav.classList.remove("active");
        icon.classList.remove("open");
        overlay.classList.remove("active");
      });

      document.querySelectorAll(".navbar-links a").forEach((link) => {
        link.addEventListener("click", () => {
          nav.classList.remove("active");
          icon.classList.remove("open");
          overlay.classList.remove("active");
        });
      });


// === Element References ===
const uploadBtn = document.getElementById("uploadBtn");
const uploadInput = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const downloadBtn = document.getElementById("downloadBtn");
const removeBtn = document.getElementById("removeBtn");
const shapeBtns = document.querySelectorAll(".shape-btn");

// === Frame URL ===
const frameURL = "./image/frame.png";

// === Variables ===
let uploadedImage = null;
let currentShape = "square"; // Default shape
let frameImage = new Image();
frameImage.src = frameURL;

// === Function to Draw Badge ===
function drawBadge() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 10; 
  const size = canvas.width - padding * 2;
  const x = padding;
  const y = padding;

  // Draw background
  ctx.fillStyle = "#0a0f0f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Create circular mask for both image and frame if needed
  if (currentShape === "circle") {
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
  }

  // Draw uploaded image
  if (uploadedImage) {
    drawImageCover(uploadedImage, x, y, size, size);
  }

  // Draw frame (inside clip if circular)
  ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

  // Restore context if circular mask was applied
  if (currentShape === "circle") {
    ctx.restore();
  }
}

// === Utility: Cover-fit like CSS background-size: cover ===
function drawImageCover(img, x, y, w, h) {
  const imgRatio = img.width / img.height;
  const canvasRatio = w / h;

  let drawWidth = w;
  let drawHeight = h;
  let offsetX = x;
  let offsetY = y;

  if (imgRatio > canvasRatio) {
    drawHeight = h;
    drawWidth = img.width * (h / img.height);
    offsetX = x - (drawWidth - w) / 2;
  } else {
    drawWidth = w;
    drawHeight = img.height * (w / img.width);
    offsetY = y - (drawHeight - h) / 2;
  }

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

// === Upload Button Click ===
uploadBtn.addEventListener("click", () => uploadInput.click());

// === Handle Image Upload ===
uploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    uploadedImage = new Image();
    uploadedImage.onload = () => {
      drawBadge();
      downloadBtn.disabled = false;
      removeBtn.style.display = "block";
    };
    uploadedImage.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

// === Shape Button Logic ===
shapeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    shapeBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    currentShape = btn.dataset.shape;
    drawBadge();
  });
});

// === Download Badge ===
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = `dotnetconf_badge_${currentShape}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});



// === Remove Image ===
removeBtn.addEventListener("click", () => {
  uploadedImage = null;
  uploadInput.value = "";
  downloadBtn.disabled = true;
  removeBtn.style.display = "none";
  drawBadge();
});

// === Draw Default Frame on Load ===
frameImage.onload = () => drawBadge();
