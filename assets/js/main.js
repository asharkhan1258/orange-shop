document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.back-to-top');
  if (btn) {
    window.addEventListener('scroll', () => {
      btn.style.display = window.scrollY > 350 ? 'grid' : 'none';
    });
    btn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const alertBox = form.querySelector('.form-message');
      if (alertBox) {
        alertBox.classList.remove('d-none');
        alertBox.textContent = 'Thanks. Your form is ready to connect to your preferred email or backend service.';
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       CART DATA
    ========================================== */

    let cart = JSON.parse(localStorage.getItem("genconCart")) || [];


    /* ==========================================
       CREATE CART LINK IN NAVBAR
    ========================================== */

    const navbarList = document.querySelector(".navbar-nav");

    if (navbarList && !document.getElementById("cartToggle")) {

        const cartLi = document.createElement("li");

        cartLi.className = "nav-item";

        cartLi.innerHTML = `
            <a class="nav-link gencon-cart-link" href="#cart" id="cartToggle">
                <i class="bi bi-cart3"></i>
                Add to Cart
                <span class="gencon-cart-count" id="cartCount">0</span>
            </a>
        `;

        navbarList.appendChild(cartLi);
    }


    /* ==========================================
       CREATE CART PANEL
       IF PAGE DOES NOT HAVE ONE
    ========================================== */

    if (!document.getElementById("cartPanel")) {

        const cartPanel = document.createElement("div");

        cartPanel.className = "gencon-cart-panel";

        cartPanel.id = "cartPanel";

        cartPanel.innerHTML = `
            
            <div class="gencon-cart-header">

                <h4>
                    <i class="bi bi-cart3"></i>
                    Your Cart
                </h4>

                <button
                    type="button"
                    class="gencon-cart-close"
                    id="cartClose"
                >
                    <i class="bi bi-x-lg"></i>
                </button>

            </div>


            <div
                class="gencon-cart-items"
                id="cartItems"
            >
            </div>


            <div class="gencon-cart-footer">

                <div class="gencon-cart-total">

                    <span>Total</span>

                    <strong id="cartTotal">
                        $0.00 USD
                    </strong>

                </div>


                <div class="gencon-cart-actions">

                    <a
                        href="tel:+18889912915"
                        class="gencon-purchase-btn"
                    >
                        Purchase
                    </a>

                    <button
                        type="button"
                        class="gencon-checkout-btn"
                    >
                        Check Out
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(cartPanel);
    }


    /* ==========================================
       GET CART ELEMENTS
    ========================================== */

    const cartToggle =
        document.getElementById("cartToggle");

    const cartClose =
        document.getElementById("cartClose");

    const cartPanel =
        document.getElementById("cartPanel");

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    /* ==========================================
       OPEN CART
       ONLY WHEN NAVBAR CART IS CLICKED
    ========================================== */

    if (cartToggle) {

        cartToggle.addEventListener("click", function (e) {

            e.preventDefault();

            cartPanel.classList.add("active");

        });
    }


    /* ==========================================
       CLOSE CART
    ========================================== */

    if (cartClose) {

        cartClose.addEventListener("click", function () {

            cartPanel.classList.remove("active");

        });
    }


    /* ==========================================
       ADD TO CART BUTTONS
    ========================================== */

    const addToCartButtons =
        document.querySelectorAll(".add-to-cart");


    addToCartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productName =
                button.getAttribute("data-name");

            const productPrice =
                parseFloat(
                    button.getAttribute("data-price")
                );


            /* Add product */

            cart.push({

                name: productName,

                price: productPrice

            });


            /* Save cart */

            localStorage.setItem(
                "genconCart",
                JSON.stringify(cart)
            );


            /* Update count */

            updateCart();


            /*
            IMPORTANT:
            Cart menu does NOT open automatically.
            */

        });

    });


    /* ==========================================
       UPDATE CART
    ========================================== */

    function updateCart() {

        if (!cartCount || !cartItems || !cartTotal) {
            return;
        }


        /* Cart count */

        cartCount.textContent = cart.length;


        /* Empty cart */

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <p class="gencon-empty-cart">
                    Your cart is empty.
                </p>
            `;

            cartTotal.textContent =
                "$0.00 USD";

            return;
        }


        let total = 0;

        cartItems.innerHTML = "";


        /* Products */

        cart.forEach(function (item, index) {

            total += Number(item.price);


            const itemElement =
                document.createElement("div");

            itemElement.className =
                "gencon-cart-item";


            itemElement.innerHTML = `

                <span class="gencon-cart-item-name">
                    ${item.name}
                </span>

                <span class="gencon-cart-item-price">
                    $${Number(item.price).toFixed(2)} USD
                </span>

            `;


            cartItems.appendChild(itemElement);

        });


        /* Total */

        cartTotal.textContent =
            "$" + total.toFixed(2) + " USD";


        /* Save again */

        localStorage.setItem(
            "genconCart",
            JSON.stringify(cart)
        );
    }


    /* ==========================================
       LOAD SAVED CART
    ========================================== */

    updateCart();

});