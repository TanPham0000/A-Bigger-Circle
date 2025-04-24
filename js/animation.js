// Help modal functionality
const helpBtn = document.getElementById('helpButton');
const helpModal = document.getElementById('helpModal');
const closeBtn = document.querySelector('.close-btn');

helpBtn.addEventListener('click', () => {
  helpModal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  helpModal.classList.remove('active');
});

// Read more functionality
const readMoreBtn = document.getElementById('readMoreBtn');
const moreContent = document.getElementById('moreContent');
const closeContent = document.querySelector('.close-content');

readMoreBtn.addEventListener('click', () => {
  moreContent.classList.add('active');
});

closeContent.addEventListener('click', () => {
  moreContent.classList.remove('active');
});

// Scroll navigation
const scrollUpBtn = document.getElementById('scrollUp');
const scrollDownBtn = document.getElementById('scrollDown');

scrollUpBtn.addEventListener('click', () => {
  window.scrollBy({
    top: -window.innerHeight,
    behavior: 'smooth'
  });
});

scrollDownBtn.addEventListener('click', () => {
  window.scrollBy({
    top: window.innerHeight, 
    behavior: 'smooth'
  });
});