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

// === Detail Page Quantity & Add to Cart ===

// Ensure DOM has loaded before attaching events
document.addEventListener('DOMContentLoaded', function () {
  const qtyInput = document.getElementById('quantity');
  const increaseBtn = document.getElementById('increase');
  const decreaseBtn = document.getElementById('decrease');
  const addToCartBtn = document.getElementById('addToCart');

  if (qtyInput && increaseBtn && decreaseBtn && addToCartBtn) {
    increaseBtn.addEventListener('click', () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    decreaseBtn.addEventListener('click', () => {
      if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
      }
    });

    addToCartBtn.addEventListener('click', () => {
      const product = {
        id: 'rakhi1',
        name: 'Designer Rakhi Combo',
        price: 9.99,
        qty: parseInt(qtyInput.value),
        image: 'assets/rakhi1.jpg'
      };

      // Store in localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.qty += product.qty;
      } else {
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart!');
    });
  }
});

// ---------- CART LOGIC FOR cart.html ----------

// Dummy cart data
const cartItems = [
  {
    id: 1,
    name: "Rakhi Combo",
    price: 499,
    quantity: 2,
    image: "assets/rakhi1.jpg"
  },
  {
    id: 2,
    name: "Traditional Rakhi",
    price: 299,
    quantity: 1,
    image: "assets/rakhi2.jpg"
  }
];

let discountValue = 0;

// Render cart items
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = "";

  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <div class="quantity">
          <button onclick="updateQuantity(${index}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <p>Total: ₹${item.price * item.quantity}</p>
      </div>
    `;
    cartContainer.appendChild(itemDiv);
  });

  updateTotals();
}

// Update quantity
function updateQuantity(index, change) {
  cartItems[index].quantity += change;
  if (cartItems[index].quantity < 1) cartItems[index].quantity = 1;
  renderCart();
}

// Calculate totals
function updateTotals() {
  let subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = discountValue;
  let total = subtotal - discount;

  document.getElementById('subtotal').textContent = subtotal;
  document.getElementById('discount').textContent = discount;
  document.getElementById('total').textContent = total;
}

// Apply discount code
document.getElementById('apply-discount')?.addEventListener('click', () => {
  const code = document.getElementById('discount-code').value.trim();
  if (code === "RAKHI10") {
    discountValue = 100;
  } else {
    discountValue = 0;
    alert("Invalid discount code");
  }
  updateTotals();
});

// Init render if on cart page
if (document.querySelector("#cart-items")) {
  renderCart();
}


