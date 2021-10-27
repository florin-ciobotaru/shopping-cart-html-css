let total;
let subtotal;
const DISCOUNTED_SUBTOTAL = 1000;
const SHIPPING_COST = 20;

const products = [
    {   
        id: 1,
        name: "Monitor",
        image: "./produs1.jpg",
        price: 800,
        quantity: 1
    },
    {   
        id: 2,
        name: "PC",
        image: "./produs2.jpg",
        price: 1200,
        quantity: 1
    },
    {   
        id: 3,
        name: "Laptop",
        image: "./produs3.jpg",
        price: 2200,
        quantity: 1
    }
];

updateCart();

function updateCart() {
    const cartContent = document.querySelector('.cart-content');
    const cartTotalCost = document.querySelector('.cart-total-cost');

    cartContent.innerHTML = "";
    subtotal = 0;
    total = 0;
    let content = "";
    
    products.forEach((p, i) => {
        subtotal += p.price * p.quantity;
        if (i % 2 === 0) {
            content = `<div class="cart-item spacing">
                            <img src="${p.image}" alt="${p.name}" class="cart-img">
                            <div class="cart-description">
                                <p>${p.name}</p>
                                <p>Price: $${p.price}</p>
                            </div>
                            <div class="cart-controls">
                                <button class="btn" id="plus-item${p.id}" value="${p.id - 1}">+</button>
                                <input type="text" id="name" name="name" minlength="1" maxlength="1" value="${p.quantity}">
                                <button class="btn" id="min-item${p.id}" value="${p.id - 1}">-</button>
                            </div>
                            <div class="cart-price">
                                <p>$${p.price * p.quantity}</p>
                            </div>
                        </div>`;
        } else {
            let options = "";
            for (let i = 1; i <= 10; i++) {
                if(i === parseInt(p.quantity)) {
                    options += `<option value="${i}" selected>${i}</option>`;
                } else {
                    options += `<option value="${i}">${i}</option>`;
                }
            }
            content = `<div class="cart-item spacing">
                            <img src="${p.image}" alt="${p.name}" class="cart-img">
                            <div class="cart-description">
                                <p>${p.name}</p>
                                <p>Price: $${p.price}</p>
                            </div>
                            <div class="cart-controls">
                                <select class="cart-select" name="${p.id - 1}">  
                                    ${options}
                                </select>
                            </div>
                            <div class="cart-price">
                                <p>$${p.price * p.quantity}</p>
                            </div>
                        </div>`;
        }

        cartContent.innerHTML += content;
    });

    placeBtns();

    subtotal >= DISCOUNTED_SUBTOTAL ? total = subtotal : total = subtotal + SHIPPING_COST;

    cartTotalCost.innerHTML = `
        <div class="row">
            <p class="col spacing">Subtotal: $${subtotal}</p>
            <p class="col spacing">Shipping: $${SHIPPING_COST}</p>
        </div>
        <p class="spacing">Total: $${total}</p>
        <p class="spacing free">* Free shipping on orders over $${DISCOUNTED_SUBTOTAL}</p>
    `;

}

function placeBtns() {
    // buttons with inputs
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => btn.addEventListener("click", function(event){
            let stringId = event.target.id;
            let product = products[event.target.value];
            if(stringId.indexOf("plus") > -1 && product.quantity < 10) {
                product.quantity++; 
            }
            if(stringId.indexOf("min") > -1 && product.quantity > 1) {
                product.quantity--; 
            }
            updateCart();   
        }));

    // dropdown
    const select = document.querySelectorAll('.cart-select');
    select.forEach(sel => sel.addEventListener("change", function() {
        let product = products[parseInt(sel.name)];
        let index = sel.selectedIndex;
        let value = sel.options[index].value;
        product.quantity = value;
        updateCart();   
    }));
}

// closing and opening cart
const cartBtn = document.getElementById("cart");
const shoppingCart = document.querySelector(".cart-container");
const closeCartBtn = document.getElementById("closeShoppingCart");
const overlay = document.getElementById("overlay");

cartBtn.addEventListener("click", function() {
    shoppingCart.classList.add("open");
    shoppingCart.classList.remove("close");
    overlay.classList.add("overlay-on");
    overlay.classList.remove("overlay-off");

});

closeCartBtn.addEventListener("click", function() {
    shoppingCart.classList.add("close");
    shoppingCart.classList.remove("open");    
    overlay.classList.add("overlay-off");
    overlay.classList.remove("overlay-on");
});