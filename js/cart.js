// ---------- CART LOGIC FOR cart.html ----------

// Load cart from localStorage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

let discountValue = 0;

// Render cart items
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    updateTotals();
    return;
  }

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
  localStorage.setItem("cart", JSON.stringify(cartItems)); // save updated cart
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
