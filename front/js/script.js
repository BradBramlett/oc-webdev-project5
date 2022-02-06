fetch('http://localhost:3000/api/products')
.then(data => {
return data.json();
})

.then(products => {
    let productDiv = document.getElementById('items');
    console.log(products);
    products.forEach( (product) => {
        productDiv.innerHTML += `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3 class="name">${product.name}</h3>
      <h4 class="price">$${product.price}</h4>
      <p class="productDescription">${product.description}</p>
    </article>
    </a>`;
    })
    });