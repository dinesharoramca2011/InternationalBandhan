// checkout.js

// Check user's 'fromCountry' and show appropriate payment methods
document.addEventListener("DOMContentLoaded", function () {
  const fromCountryInput = document.querySelector('input[name="fromCountry"]');
  const paymentDiv = document.getElementById("paymentMethods");

  // Sample logic to dynamically update payment methods
  fromCountryInput.addEventListener("change", function () {
    const country = fromCountryInput.value.trim().toLowerCase();
    paymentDiv.innerHTML = ""; // Clear existing

    if (country === "india") {
      paymentDiv.innerHTML = `
        <label><input type="radio" name="payment" value="upi" required /> UPI</label><br>
        <label><input type="radio" name="payment" value="bank" required /> Bank Transfer</label><br>
        <label><input type="radio" name="payment" value="card" required /> Debit/Credit Card</label>
      `;
    } else {
      paymentDiv.innerHTML = `
        <label><input type="radio" name="payment" value="international_card" required /> International Card</label>
      `;
    }
  });
});

// Dummy order placement
function placeOrder() {
  alert("Order placed successfully!\nOrder ID: ORD" + Math.floor(Math.random() * 100000));
  window.location.href = "confirmation.html";
}
