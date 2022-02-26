const loadCart = () => {
let products = localStorage.getItem('cart');
products = JSON.parse(products);
let total = 0;
let articles = 0;
let cart = document.getElementById('cart__items');
cart.innerHTML = "";
 products.forEach(product => {
   fetch(`http://localhost:3000/api/products/${product.id}`)
     .then(response => {
      response.json().then(p => {
      //---------------Function Variables-------------------------------------------------------------------    
      let cartItem = "";
      let cartPrice = document.getElementById('totalPrice');
      let cost = parseInt(product.qty)*parseInt(product.price)
// ----------------------------Each Item block----------------------------------------------------
         cartItem += `<article class="cart__item" data-id="${product.id}" data-color="${product.col}">
           <div class="cart__item__img">
             <img src="${p.imageUrl}" alt="Photo of a sofa">
           </div>
           <div class="cart__item__content">
             <div class="cart__item__content__description">
               <h2>${p.name}</h2>
               <p>${product.col}</p>
               <p>${cost}</p>
             </div>
             <div class="cart__item__content__settings">
               <div class="cart__item__content__settings__quantity">
                 <p>Qté : ${product.qty} </p>
                 <input id="${product.id}${product.col}" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.qty} onChange="updateCart('${product.id}','${product.col}')">
               </div>
               <div class="cart__item__content__settings__delete">
                 <p class="deleteItem" onclick="deleteItem('${product.id}','${product.col}')">Delete</p>
               </div>
             </div>
           </div>`;
           cart.innerHTML += cartItem;
//---------------------------Get Total Cost-------------------------------------------------------------
        total += p.price*product.qty;
        console.log(total); 
        document.getElementById('totalPrice').innerHTML = total;
        articles += product.qty;
        document.getElementById('totalQuantity').innerHTML = articles;
        console.log(products);
      });
   });
});
};

const deleteItem = (id, color) => {
  let products = localStorage.getItem('cart');
  products = JSON.parse(products);
  let index = products.findIndex(object => object.id == id && object.col == color);
  products.splice(index, 1);
  console.log(index);
  localStorage.setItem('cart', JSON.stringify(products));
  loadCart();
};

const updateCart = (id, color) => {
  let products = localStorage.getItem('cart');
  let quantity = document.getElementById(`${id}${color}`).value;
  products = JSON.parse(products);
  let idx = products.findIndex(object => object.id == id && object.col == color);
  products[idx].qty = parseInt(quantity);
  if(products[idx].qty == 0){
   deleteItem(); 
  }
  else {
  console.log(products[idx]);
  localStorage.setItem('cart', JSON.stringify(products));
  loadCart();
  };
};









loadCart();

