// js/carousel.js

let currentSlide = 0;
let data = [];

function fetchCarouselData() {
  fetch("./carousel_data.json")
    .then((response) => response.json())
    .then((json) => {
      data = json;
      renderCarouselItems();
      updateSlide();
    })
    .catch((error) => console.error("Error loading carousel data:", error));
}

// Updated renderCarouselItems() function
function renderCarouselItems() {
  const track = document.querySelector(".carousel-track");
  track.innerHTML = "";

  data.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "carousel-item";
    slide.setAttribute("data-index", index);

    if (item.type === "video") {
      slide.innerHTML = `
        <video class="background" autoplay loop muted playsinline>
          <source src="${item.background}" type="video/mp4">
        </video>
        <a href="${item.clickout}" target="_blank" rel="noopener noreferrer">
          <div class="overlay-text">${item.text}</div>
        </a>
      `;
    } else {
      slide.innerHTML = `
        <img class="background" src="${item.background}" alt="Carousel image ${index + 1}">
        <a href="${item.clickout}" target="_blank" rel="noopener noreferrer">
          <div class="overlay-text">${item.text}</div>
        </a>
      `;
    }

    track.appendChild(slide);
  });
}

document.querySelector(".carousel-btn.next").addEventListener("click", goToNextSlide);
document.querySelector(".carousel-btn.prev").addEventListener("click", goToPrevSlide);

function updateSlide() {
  const track = document.querySelector(".carousel-track");
  const orientation = window.innerWidth > window.innerHeight ? "horizontal" : "vertical";
  const translate = orientation === "horizontal"
    ? `translateY(-${currentSlide * 100}%)`
    : `translateX(-${currentSlide * 100}%)`;
  track.style.transform = translate;
}

function goToNextSlide() {
  currentSlide = (currentSlide + 1) % data.length;
  updateSlide();
}

function goToPrevSlide() {
  currentSlide = (currentSlide - 1 + data.length) % data.length;
  updateSlide();
}

function handleSwipe() {
  let startX, startY;

  document.querySelector(".carousel").addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.querySelector(".carousel").addEventListener("touchend", (e) => {
    const deltaX = e.changedTouches[0].clientX - startX;
    const deltaY = e.changedTouches[0].clientY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < -50) goToNextSlide();
      else if (deltaX > 50) goToPrevSlide();
    } else {
      if (deltaY < -50) goToNextSlide();
      else if (deltaY > 50) goToPrevSlide();
    }
  });
}

function setupCarousel() {
  fetchCarouselData();
  handleSwipe();

  // Optional: autoplay every 15s
  setInterval(goToNextSlide, 45000);
}

setupCarousel();