const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let slideInterval = setInterval(nextSlide, 3000); // Automatic slide every 3 seconds

function updateSliderPosition() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSliderPosition();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSliderPosition();
}

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Pause automatic sliding on hover
slider.addEventListener('mouseover', () => clearInterval(slideInterval));
slider.addEventListener('mouseout', () => slideInterval = setInterval(nextSlide, 3000));

// Button event listeners
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSliderPosition();
  });
});

// Swipe functionality for touch devices
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX < touchStartX) nextSlide();
  if (touchEndX > touchStartX) prevSlide();
});
