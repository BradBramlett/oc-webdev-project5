let products = localStorage.getItem('cart');
products = JSON.parse(products);
console.log(products);

 products.forEach(product => {
   fetch(`http://localhost:3000/api/products/${product.id}`)
     .then(response => {
       response.json().then(p => {    
       let cart = document.getElementById('cart__items')
       let cartItem = "";
         cartItem += `<article class="cart__item" data-id="${product.id}" data-color="${product.col}">
           <div class="cart__item__img">
             <img src="${p.imageUrl}" alt="Photo of a sofa">
           </div>
           <div class="cart__item__content">
             <div class="cart__item__content__description">
               <h2>${p.name}</h2>
               <p>${product.col}</p>
               <p>${p.price}</p>
             </div>
             <div class="cart__item__content__settings">
               <div class="cart__item__content__settings__quantity">
                 <p>Qté : ${product.qty} </p>
                 <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.qty}>
               </div>
               <div class="cart__item__content__settings__delete">
                 <p class="deleteItem">Delete</p>
               </div>
             </div>
           </div>`;
           cart.innerHTML += cartItem;
   });
 });});
