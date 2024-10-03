document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
});

function fetchProducts() {
    fetch('http://vakajose.online/api/products')
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
                <p class="card-text"><strong>Quantity: </strong>${product.quantity}</p>
                <button class="btn btn-primary buy-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Buy Now</button>
            </div>
        </div>
    `;

    const buyButton = card.querySelector('.buy-btn');
    buyButton.addEventListener('click', function() {
        openBuyModal(this.dataset.id, this.dataset.name, this.dataset.price);
    });

    return card;
}

function openBuyModal(productId, productName, productPrice) {
    const modal = new bootstrap.Modal(document.getElementById('buyModal'));
    document.getElementById('modalProductName').textContent = productName;
    document.getElementById('modalProductPrice').textContent = productPrice;

    const confirmButton = document.getElementById('confirmBuy');
    confirmButton.onclick = function() {
        buyProduct(productId);
        modal.hide();
    };

    modal.show();
}

function buyProduct(productId) {
    // Here you would typically send a request to your backend to process the purchase
    console.log(`Buying product with ID: ${productId}`);
    alert('Thank you for your purchase!');
}