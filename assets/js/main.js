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
       GET CART ELEMENTS
    ========================================== */

    const cartToggle = document.getElementById("cartToggle");
    const cartClose = document.getElementById("cartClose");
    const cartPanel = document.getElementById("cartPanel");
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");


    /* ==========================================
       CART LINK
       HIDDEN UNTIL PRODUCT IS ADDED
    ========================================== */

    function updateCartLink() {

        if (!cartToggle) {
            return;
        }

        if (cart.length > 0) {
            cartToggle.style.display = "inline-flex";
        } else {
            cartToggle.style.display = "none";
        }
    }


    /* ==========================================
       OPEN CART
    ========================================== */

    if (cartToggle && cartPanel) {

        cartToggle.addEventListener("click", function (e) {

            e.preventDefault();

            cartPanel.classList.add("active");

        });
    }


    /* ==========================================
       CLOSE CART
    ========================================== */

    if (cartClose && cartPanel) {

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


            /* Update cart */

            updateCart();


            /* Show cart link after adding product */

            updateCartLink();

        });

    });


    /* ==========================================
       UPDATE CART
    ========================================== */

    function updateCart() {

        /* Update navbar cart */

        if (cartCount) {
            cartCount.textContent = cart.length;
        }


        /* Cart content */

        if (cartItems && cartTotal) {

            /* Empty cart */

            if (cart.length === 0) {

                cartItems.innerHTML = `
                    <p class="gencon-empty-cart">
                        Your cart is empty.
                    </p>
                `;

                cartTotal.textContent =
                    "$0.00 USD";

            } else {

                let total = 0;

                cartItems.innerHTML = "";


                /* Products */

                cart.forEach(function (item) {

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

            }

        }


        /* Save cart */

        localStorage.setItem(
            "genconCart",
            JSON.stringify(cart)
        );


        /* Update visibility */

        updateCartLink();

    }


    /* ==========================================
       LOAD SAVED CART
    ========================================== */

    updateCart();

});