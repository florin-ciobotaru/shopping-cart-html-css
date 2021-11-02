let total;
let subtotal;
const DISCOUNTED_SUBTOTAL = 5000;
const SHIPPING_COST = 20;

let products = [
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
        price: 1500,
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
                                <button class="btn" id="plus-item${p.id}" value="${i}">+</button>
                                <input type="text" id="name" name="name" minlength="1" maxlength="1" value="${p.quantity}">
                                <button class="btn" id="min-item${p.id}" value="${i}">-</button>
                            </div>
                            <div class="cart-price">
                                <p>$${p.price * p.quantity}</p>
                            </div>
                            <div class="cart-delete">
                                <button onclick="deleteElement(${i})"><i class='bx bxs-trash'></i></button>
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
                                <select class="cart-select" name="${i}">  
                                    ${options}
                                </select>
                            </div>
                            <div class="cart-price">
                                <p>$${p.price * p.quantity}</p>
                            </div>
                            <div class="cart-delete">
                                <button onclick="deleteElement(${i})"><i class='bx bxs-trash'></i></button>
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

// closing and opening modal
const modal = document.querySelector('.modal');

cartBtn.addEventListener("click", function() {
    showCart(true);
    showOverlay(true);
});

// showing overlay
function showOverlay(visible) {
    if(visible) {
        overlay.classList.add("overlay-on");
        overlay.classList.remove("overlay-off");
    } else {
        overlay.classList.add("overlay-off");
        overlay.classList.remove("overlay-on");
    }
}

// showing cart
function showCart(visible) {
    if(visible) {
        shoppingCart.classList.add("open");
        shoppingCart.classList.remove("close");
    } else {
        shoppingCart.classList.add("close");
        shoppingCart.classList.remove("open");    
    }
}

// showing modal
function showModal(visible) {
    if(visible) {
        modal.classList.add("modal-show");
        modal.classList.remove("modal-off");    
    } else {
        modal.classList.add("modal-off");
        modal.classList.remove("modal-show");    
    }
}

closeCartBtn.addEventListener("click", function() {
    showCart(false);
    showOverlay(false);
});

// was the ok buttons pressed?
let isConfirmed = false;
let deleteItemPosition = -1;

// getting modal buttons
const btnModalOk = document.querySelector("#btn-modal-ok");
const btnModalCancel = document.querySelector("#btn-modal-cancel");
btnModalCancel.addEventListener("click", function() {
    showModal(false);
    showCart(true);
    showOverlay(true);
});

// if ok button is pressed
btnModalOk.addEventListener("click", function() {
    isConfirmed = true;
    console.log("Ok button is pressed: " + isConfirmed);
    showModal(false);
    showCart(true);
    showOverlay(true);    
    if (isConfirmed && deleteItemPosition !== -1) {
        console.log("delete at " + deleteItemPosition);
        console.log("Elementul de la " + deleteItemPosition + " va fi sters!");
        products.splice(deleteItemPosition, 1);
        console.log(products);
        isConfirmed = false;
        deleteItemPosition = -1;
        updateCart();
    }
});


// deleting element at i
function deleteElement(i) {
    showCart(false);
    showOverlay(true);
    showModal(true);
    deleteItemPosition = i;
}