//! Filter Functionality
function filterItems(category, event) {
  // Selecting all cards
  let cards = document.querySelectorAll(".card");

  // Selecting all filter buttons
  let buttons = document.querySelectorAll("#filter_btns > button");

  // Looping through each card
  cards.forEach((card) => {
    // If user selects ALL → show all cards
    if (category.toLowerCase() == "all") {
      card.style.display = "flex";
    } else {
      // If card has the selected category → show, else hide
      if (card.classList.contains(category)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    }
  });

  // Remove active class from all buttons
  buttons.forEach((btn) => btn.classList.remove("active"));

  // Add active class to clicked button
  event.target.classList.add("active");
}

//! Add To Cart Functionality
let cart = []; // Array to store cart items

let cards = document.querySelectorAll(".card"); // All product cards

cards.forEach((card) => {
  // Getting product name
  let name = card.querySelector(".card_one > .card_info > h2").innerText;

  // Getting product price (remove ₹ and /-)
  let price = Number(
    card
      .querySelector(".card_one > .card_info > p")
      .innerText.replace("₹", "")
      .replace("/-", "")
  );

  // Quantity DOM element
  let quantity = card.querySelector(".card_two > .card_quantity > .quantity");

  // PLUS button → increase quantity
  let plusBtn = card.querySelector(".plus");
  plusBtn.addEventListener("click", () => {
    quantity.innerText = Number(quantity.innerText) + 1;
  });

  // MINUS button → decrease quantity (but not below 0)
  let minusBtn = card.querySelector(".minus");
  minusBtn.addEventListener("click", () => {
    let current = Number(quantity.innerText);
    if (current > 0) quantity.innerText = current - 1;
  });

  // ADD TO CART button
  let addBtn = card.querySelector(".addToCart > button");
  addBtn.addEventListener("click", () => {
    let qty = Number(quantity.innerText);

    // Check min 1 quantity
    if (qty > 0) {
      let existingItem = cart.find((item) => item.name == name);

      // If already in cart → increase qty
      if (existingItem) {
        existingItem.qty += qty;
      } else {
        // Else add new item to cart array
        cart.push({ name, qty, price });

        // Button turns green to show success
        addBtn.style.background = "green";
      }

      updateCart(); // Update totals + sidebar
    } else {
      alert("PLEASE ADD MIN OF 1 ITEM");
    }
  });

  //! Update Cart Function
  function updateCart() {
    let totalQty = 0;
    let totalPrice = 0;

    // Loop cart and calculate totals
    cart.forEach((item) => {
      totalQty += item.qty;
      totalPrice += item.price * item.qty;
    });

    // Select total UI elements
    let cart_qty = document.getElementById("cart_quantity");
    let cart_price = document.getElementById("cart_price");

    // Update UI safely
    if (cart_qty) cart_qty.innerText = totalQty;
    if (cart_price) cart_price.innerText = `₹${totalPrice.toFixed(2)}`;

    // UPDATE SIDEBAR ITEMS — MOVED INSIDE updateCart (correct)
    let sidebar_items = document.querySelector("#sidebar_collections");
    sidebar_items.innerHTML = ""; // Clear old items

    // Add each item to sidebar dynamically
    cart.forEach((item) => {
      sidebar_items.innerHTML += `
        <div class='items_info'>
          <h1>Product: ${item.name}</h1>
          <p>Quantity: ${item.qty}</p>
          <h2>Price: ₹${item.price}</h2>
        </div>
        <hr>
      `;
    });
  }
});

//! Sidebar functionality
let cart_icon = document.getElementById("cart_icon");
let sidebar = document.getElementById("sidebar");

// When user clicks cart → show sidebar
cart_icon.addEventListener("click", () => {
  sidebar.style.right = "0px";
});

// Close button → hide sidebar
let close_sidebar = document.getElementById("close_sidebar");
close_sidebar.addEventListener("click", () => {
  sidebar.style.right = "-350px";
});
