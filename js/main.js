// ======= Carousel Slider Logic =======

// Current index of active slide
let currentSlide = 0;

// Get all carousel items
const slides = document.querySelectorAll('.carousel-item');

// Total number of slides
const totalSlides = slides.length;

// Function to show slide at given index
function showSlide(index) {
  // Wrap index if out of bounds
  if (index >= totalSlides) currentSlide = 0;
  else if (index < 0) currentSlide = totalSlides - 1;
  else currentSlide = index;

  // Hide all slides and remove active class
  slides.forEach(slide => slide.classList.remove('active'));

  // Show current slide
  slides[currentSlide].classList.add('active');
}

// Show next slide
function nextSlide() {
  showSlide(currentSlide + 1);
}

// Show previous slide
function prevSlide() {
  showSlide(currentSlide - 1);
}

// Auto-slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto-slide on mouse enter, resume on mouse leave
const carousel = document.getElementById('carousel');
if (carousel) {
  carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
  carousel.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
}

// Initialize carousel display
showSlide(currentSlide);

// ======= Toggle Features Section =======

function toggleFeatures() {
  const features = document.getElementById('featuresSection');
  if (!features) return;

  if (features.style.display === 'none' || features.style.display === '') {
    features.style.display = 'block';
  } else {
    features.style.display = 'none';
  }
}

// ======= Tile Click Handling (optional) =======

// You can add event listeners here to handle clicks on tiles.
// Currently, the <a> links handle navigation, so no extra JS needed.

// Example: Log the clicked tile item (if you want later)
document.querySelectorAll('.tile a').forEach(link => {
  link.addEventListener('click', e => {
    // Get href attribute or data attribute (for example)
    const href = e.currentTarget.getAttribute('href');
    console.log('Tile clicked:', href);
    // You can do extra things here if needed
  });
});

