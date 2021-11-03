let total;
let subtotal;
const DISCOUNTED_SUBTOTAL = 5000;
const SHIPPING_COST = 20;

let products = [];

if(getDataFromLocalStorage()) {
    products = getDataFromLocalStorage();
} else {
    products = [
        {   
            name: "Monitor",
            image: "./produs1.jpg",
            price: 800,
            quantity: 1
        },
        {   
            name: "PC",
            image: "./produs2.jpg",
            price: 1200,
            quantity: 1
        },
        {   
            name: "Laptop",
            image: "./produs3.jpg",
            price: 1500,
            quantity: 1
        }
    ];
}

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
                                <button class="btn" id="plus-item${i}" value="${i}">+</button>
                                <input type="text" id="name" name="name" minlength="1" maxlength="1" value="${p.quantity}">
                                <button class="btn" id="min-item${i}" value="${i}">-</button>
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
        <div class="row">
            <p class="col spacing">Total: $${total}</p>
            <button id="btn-add" class="col spacing btn-order">Add item</button>
        </div>
        <p class="spacing free">* Free shipping on orders over $${DISCOUNTED_SUBTOTAL}</p>
    `;

        
    // adding a new item
    const btnAdd = document.querySelector("#btn-add");
    btnAdd.addEventListener("click", function() {
        addNewItem();
    });

    saveDataToLocalStorage();
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

// getting modal content to show the item to delete
const modalContent = document.querySelector('.modal-content');  
const modalTitle = document.querySelector('.modal-title');

btnModalCancel.addEventListener("click", function() {
    showModal(false);
    showCart(true);
    showOverlay(true);
});

// added object
let objectToAdd = {   
    name: "",
    image: "./produs1.jpg",
    price: 0,
    quantity: 1
};

// if ok button is pressed
btnModalOk.addEventListener("click", function(ev) {
    let choice = ev.target.textContent.toLowerCase();
    console.log(choice);
    showModal(false);
    showCart(true);
    showOverlay(true);  

    switch (choice) {
        case "add":
            products.push(objectToAdd);
            objectToAdd = {   
                name: "",
                image: "./produs1.jpg",
                price: 0,
                quantity: 1
            };
            break;
        case "delete":         
            isConfirmed = true;
            if (isConfirmed && deleteItemPosition !== -1) {
                products.splice(deleteItemPosition, 1);
                isConfirmed = false;
                deleteItemPosition = -1;
            }
            break;
        default:
            break;
    }
    updateCart();
});


// deleting element at i
function deleteElement(i) {
    let p = products[i];
    btnModalOk.classList.add("danger");
    btnModalOk.classList.remove("info");
    btnModalOk.textContent = "Delete";

    modalTitle.textContent = "Are you sure ?";
    modalContent.innerHTML = `<p class="spacing">The product you want to remove:</p>
                            <div class="cart-item spacing">
                                <img src="${p.image}" alt="${p.name}" class="cart-img">
                                <div class="cart-description">
                                    <p>${p.name}</p>
                                    <p>Price: $${p.price}</p>
                                </div>
                                <div class="cart-controls">
                                    <input type="text" id="name" name="name" minlength="1" maxlength="1" value="${p.quantity}" disabled>
                                </div>
                                <div class="cart-price">
                                    <p>$${p.price * p.quantity}</p>
                                </div>
                            </div>`;
    showCart(false);
    showOverlay(true);
    showModal(true);
    deleteItemPosition = i;
}

function addNewItem() {
    console.log("Add new item called!");
    showOverlay(true);
    showModal(true);
    showCart(false);
    modalTitle.textContent = "Add a new item";
    modalContent.innerHTML = `
        <div class="row">Product name:</div>
        <div class="row">
            <input type="text" id="name" name="name" onkeyup="updateObjectInputs(this)" class="col" value="${objectToAdd.name}">
        </div>
        <div class="row">Image link for the product:</div>
        <div class="row">
            <input type="text" id="image" name="image" onkeyup="updateObjectInputs(this)" class="col" value="${objectToAdd.image}">
        </div>
        <div class="row">Price:</div>
        <div class="row">
            <input type="text" id="price" name="price" class="col" onkeyup="updateObjectInputs(this)" value="${objectToAdd.price}">
        </div>
    `;

    btnModalOk.classList.add("info");
    btnModalOk.classList.remove("danger");
    btnModalOk.textContent = "Add";
    updateCart();
}

// update objectToAdd properties
function updateObjectInputs(ev) {
    objectToAdd[ev.name] = ev.value;
}

function saveDataToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('products'));
}