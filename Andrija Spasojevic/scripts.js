document.addEventListener('DOMContentLoaded', () => {
    const sizeButtons = document.querySelectorAll('.pantalone-size-btn');
    const colorButtons = document.querySelectorAll('.pantalone-color-btn');
    const addToCartButton = document.querySelector('.pantalone-add-to-cart-btn');
    const korpaIkonica = document.querySelector('.korpa-ikonica');
    const quantityInput = document.querySelector('.pantalone-quantity-input');
    const minusButton = document.querySelector('.pantalone-quantity-btn.minus');
    const plusButton = document.querySelector('.pantalone-quantity-btn.plus');
    
    // Učitavanje korpe prilikom učitavanja stranice
    loadCart();

    minusButton.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
        }
    });

    plusButton.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
    });

    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            colorButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    addToCartButton.addEventListener('click', () => {
        const selectedSize = document.querySelector('.pantalone-size-btn.active').textContent;
        const selectedColor = document.querySelector('.pantalone-color-btn.active').textContent;
        const quantity = parseInt(quantityInput.value);
        const title = document.querySelector('.pantalone-title').textContent;
        const price = document.querySelector('.pantalone-price').textContent;
        const imageSrc = document.querySelector('.pantalone-image img').src;
    
        let existingItem = findCartItem(title, selectedSize, selectedColor);

        if (existingItem) {
            let existingQuantity = existingItem.quantity;
            updateCartItem(existingItem, existingQuantity + quantity);
        } else {
            const newItem = {
                title,
                size: selectedSize,
                color: selectedColor,
                quantity,
                price,
                imageSrc
            };
            addToCart(newItem);
        }
    
        toggleKorpaSidebar();
        updateKorpaContent();
    });

    korpaIkonica.addEventListener('click', () => {
        toggleKorpaSidebar();
        updateKorpaContent();
    });
});

function toggleKorpaSidebar() {
    var korpa = document.getElementById('korpa');
    var content = document.querySelector('.main-content');

    korpa.classList.toggle('active');
    if (korpa.classList.contains('active')) {
        content.classList.add('blur-background');
    } else {
        content.classList.remove('blur-background');
    }
}

function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function findCartItem(title, size, color) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.find(item => item.title === title && item.size === size && item.color === color);
}

function updateCartItem(item, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let updatedCart = cart.map(cartItem => {
        if (cartItem.title === item.title && cartItem.size === item.size && cartItem.color === item.color) {
            return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
}

function loadCart() {
    const korpaContent = document.querySelector('.korpa-content');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        korpaContent.innerHTML = '<p>Vaša korpa je prazna.</p>';
    } else {
        updateKorpaContent();
    }
}

function updateKorpaContent() {
    const korpaContent = document.querySelector('.korpa-content');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        korpaContent.innerHTML = '<p>Vaša korpa je prazna.</p>';
    } else {
        korpaContent.innerHTML = ''; 
        cart.forEach(item => {
            const cartItemHtml = `
                <div class="korpa-item">
                    <img src="${item.imageSrc}" alt="${item.title}" class="korpa-item-image">
                    <div class="korpa-item-details">
                        <p class="korpa-item-title">${item.title}</p>
                        <p class="korpa-item-price">${item.price}</p>
                        <p class="korpa-item-size">Veličina: ${item.size}</p>
                        <p class="korpa-item-color">Boja: ${item.color}</p>
                        <p class="korpa-item-quantity">Količina: ${item.quantity}</p>
                    </div>
                </div>
            `;
            korpaContent.insertAdjacentHTML('beforeend', cartItemHtml);
        });
    }
}

function clearCart() {
    localStorage.setItem('cart', JSON.stringify([])); // Postavljanje korpe na prazan niz
    updateKorpaContent(); // Ažuriranje sadržaja korpe
}
function orderItems() {
    localStorage.setItem('cart', JSON.stringify([])); // Postavljanje korpe na prazan niz
    updateKorpaContent(); // Ažuriranje sadržaja korpe
    alert("Uspesno ste porucili!")
}

function showMessage() {
    alert("Hvala što ste nas kontaktirali! Odgovorićemo u najkraćem mogućem roku.");
}
