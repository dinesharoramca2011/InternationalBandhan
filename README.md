# InternationalBandhan

InternationalBandhan/
│
├── index.html                → Home page (carousel + featured tiles)
├── details.html              → Product detail (with + / - qty and add to cart)
├── cart.html                 → Cart page (item list, total, discount code)
├── checkout.html             → Checkout page (from/to address, payment options)
├── confirmation.html         → Thank you / order confirmation
├── contact.html              → ✅ Contact Us form (name, email, message)
│
├── /assets/                  → Images and icons
│   ├── rakhi1.jpg
│   └── banner1.jpg
│
├── /css/
│   └── style.css             → Custom styling for all pages
│
├── /js/
│   ├── main.js               → Homepage logic (carousel, feature toggles)
│   ├── cart.js               → Add to cart, qty handling, totals
│   ├── checkout.js           → Address handling, payment logic
│   └── contact.js            → ✅ Form submission + EmailJS or Formspree logic
│
├── /functions/               → Serverless functions for backend tasks
│   ├── createStripePayment.js → Create Stripe payment session securely
│   └── sendEmailBackup.js     → Optional: fallback email or DB writing
│
├── README.md                 → Project notes & setup instructions
└── netlify.toml              → Netlify configuration (for deploying & functions)
