// checkout.js

// Dummy discount codes for testing
const validDiscounts = {
  "SAVE10": 0.10,  // 10% off
  "FESTIVE20": 0.20, // 20% off
};

// Store applied discount percentage
let appliedDiscount = 0;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  const discountInput = document.getElementById("discountCode");
  const applyDiscountBtn = document.getElementById("applyDiscount");
  const discountMessage = document.getElementById("discountMessage");
  const paymentRadios = document.getElementsByName("paymentMethod");

  // Handle discount apply button
  applyDiscountBtn.addEventListener("click", () => {
    const code = discountInput.value.trim().toUpperCase();
    if (validDiscounts[code]) {
      appliedDiscount = validDiscounts[code];
      discountMessage.textContent = `Discount code applied! You get ${appliedDiscount * 100}% off.`;
      discountMessage.style.color = "green";
    } else {
      appliedDiscount = 0;
      discountMessage.textContent = "Invalid discount code.";
      discountMessage.style.color = "red";
    }
  });

  // Adjust payment options based on fromCountry
  form.fromCountry.addEventListener("change", () => {
    const fromCountry = form.fromCountry.value.trim().toLowerCase();
    if (fromCountry === "india") {
      enablePaymentOptions(["card", "upi", "bank"]);
    } else {
      enablePaymentOptions(["card"]);
      // Select card if others are selected
      if (![...paymentRadios].some(r => r.checked && r.value === "card")) {
        paymentRadios[0].checked = true;
      }
    }
  });

  // Enable only allowed payment options
  function enablePaymentOptions(allowed) {
    paymentRadios.forEach(radio => {
      radio.disabled = !allowed.includes(radio.value);
    });
  }

  // On form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic form validation handled by required attributes

    // Get cart items from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Calculate total price
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Apply discount if any
    if (appliedDiscount > 0) {
      total = total * (1 - appliedDiscount);
    }

    // Create order object
    const order = {
      id: "ORD" + Date.now(), // simple unique order ID
      date: new Date().toISOString(),
      from: {
        name: form.fromName.value,
        email: form.fromEmail.value,
        phone: form.fromPhone.value,
        address: form.fromAddress.value,
        city: form.fromCity.value,
        state: form.fromState.value,
        zip: form.fromZip.value,
        country: form.fromCountry.value,
      },
      to: {
        name: form.toName.value,
        email: form.toEmail.value,
        phone: form.toPhone.value,
        address: form.toAddress.value,
        city: form.toCity.value,
        state: form.toState.value,
        zip: form.toZip.value,
        country: form.toCountry.value,
      },
      paymentMethod: [...paymentRadios].find(r => r.checked).value,
      discountCode: discountInput.value.trim().toUpperCase(),
      discountApplied: appliedDiscount,
      totalAmount: total.toFixed(2),
      items: cart,
    };

    // For now, just save order in localStorage (simulate backend)
    localStorage.setItem("latestOrder", JSON.stringify(order));

    // Clear cart
    localStorage.removeItem("cart");

    // TODO: Integrate real payment gateway here based on paymentMethod

    // Redirect to confirmation page with order ID in query string
    window.location.href = `confirmation.html?orderId=${order.id}`;
  });
});
