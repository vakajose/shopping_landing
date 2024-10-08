//http://shopping.vakajose.online/api/products
document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
});

function fetchProducts() {
    fetch('http://shopping.vakajose.online/api/products')
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productList.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col';
    card.innerHTML = `
        <div class="card h-100">
            <img src="${product.url}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text"><strong>Price: </strong>$${product.price}</p>
                <p class="card-text"><strong>Brand: </strong>${product.brand}</p>
                <p class="card-text"><strong>Available: </strong>${product.quantity}</p>
                <div class="input-group mb-3">
                    <button class="btn btn-outline-secondary" type="button" onclick="decrementQuantity(${product.id})">-</button>
                    <input type="number" class="form-control text-center" id="quantity-${product.id}" value="1" min="1" max="${product.quantity}" onchange="validateQuantity(${product.id}, ${product.quantity})">
                    <button class="btn btn-outline-secondary" type="button" onclick="incrementQuantity(${product.id}, ${product.quantity})">+</button>
                </div>
                <div id="quantity-error-${product.id}" class="text-danger"></div>
                <button class="btn btn-primary buy-btn mt-2" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Buy Now</button>
            </div>
        </div>
    `;

    const buyButton = card.querySelector('.buy-btn');
    buyButton.addEventListener('click', function() {
        const quantity = document.getElementById(`quantity-${product.id}`).value;
        openBuyModal(this.dataset.id, this.dataset.name, this.dataset.price, quantity);
    });

    return card;
}

function validateQuantity(productId, maxQuantity) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const errorElement = document.getElementById(`quantity-error-${productId}`);
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
        errorElement.textContent = 'Quantity must be at least 1';
        quantityInput.value = 1;
    } else if (quantity > maxQuantity) {
        errorElement.textContent = `Maximum quantity is ${maxQuantity}`;
        quantityInput.value = maxQuantity;
    } else {
        errorElement.textContent = '';
    }
}

function decrementQuantity(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        validateQuantity(productId, parseInt(quantityInput.max));
    }
}

function incrementQuantity(productId, maxQuantity) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < maxQuantity) {
        quantityInput.value = currentValue + 1;
        validateQuantity(productId, maxQuantity);
    }
}

function openBuyModal(productId, productName, productPrice, quantity) {
    const modal = new bootstrap.Modal(document.getElementById('buyModal'));
    document.getElementById('modalProductName').textContent = productName;
    document.getElementById('modalProductPrice').textContent = productPrice;
    document.getElementById('modalProductQuantity').textContent = quantity;
    document.getElementById('modalProductTotal').textContent = (productPrice * quantity).toFixed(2);

    const confirmButton = document.getElementById('confirmBuy');
    confirmButton.onclick = function() {
        buyProduct(productId, quantity);
        modal.hide();
    };

    modal.show();
}

function buyProduct(productId, quantity) {
    fetch(`http://shopping.vakajose.online/api/products/${productId}/sale`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: parseInt(quantity) }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Thank you for your purchase!');
        // Refresh the product list to update quantities
        fetchProducts();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was a problem with your purchase. Please try again.');
    });
}