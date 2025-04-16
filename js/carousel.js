let current = 0;

function update() {
  const track = document.querySelector('.track');
  const total = document.querySelectorAll('.slide').length;
  const isMobile = window.innerWidth < 768;

  const slideWidth = isMobile ? window.innerWidth : window.innerWidth / 2;
  const translateValue = `translateX(-${current * slideWidth}px)`;
  track.style.transform = translateValue;
}

function next() {
  const total = document.querySelectorAll('.slide').length;
  current = (current + 1) % total;
  update();
}

function prev() {
  const total = document.querySelectorAll('.slide').length;
  current = (current - 1 + total) % total;
  update();
}

function updateTrackSize() {
  const track = document.querySelector('.track');
  const total = document.querySelectorAll('.slide').length;
  const isMobile = window.innerWidth < 768;

  const slideWidth = isMobile ? window.innerWidth : window.innerWidth / 2;
  track.style.width = `${slideWidth * total}px`;
}

let startX;

document.querySelector('.carousel').addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

document.querySelector('.carousel').addEventListener('touchend', e => {
  let dx = e.changedTouches[0].clientX - startX;
  if (dx < -50) next();
  if (dx > 50) prev();
});

window.addEventListener('resize', () => {
  updateTrackSize();
  update();
});

updateTrackSize();
update();