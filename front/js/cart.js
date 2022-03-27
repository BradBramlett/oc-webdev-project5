let btn = document.getElementById('order');
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
        document.getElementById('totalPrice').innerHTML = total;
        articles += product.qty;
        document.getElementById('totalQuantity').innerHTML = articles;
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



const validateInput = (Input) =>{
  console.log(Input);
  let value = document.getElementById(`${Input}`).value;
  let erroMsg = document.getElementById(`${Input}ErrorMsg`);
  erroMsg.innerHTML= "";
  let output = true;
  //Validate empty value
  if(value==""){
    erroMsg.innerHTML =`Please kindly provide the ${Input}`;
    output= false;
  }
  //Validate Lenght
  if(value.length <3){
    erroMsg.innerHTML +=` Please ensure the ${Input} is at least 3 characters `;
    output= false;
  }

  //Validate Email
  if(Input=="email"){
    const re = /\S+@\S+\.\S+/g;

    if(!re.test(value)){
      erroMsg.innerHTML +=` Please provide a valid email `;
      output= false;
    }
  }

  return output;
  
}

//Validate Function

const validateAll = (contact) =>{

  let output = true;

  for (const [key, value] of Object.entries(contact)) {

    if(validateInput(`${key}`)==false){
      output = false;
    }
  }
return output;
}
let orderBtn = document.getElementById("order")
orderBtn.addEventListener("click", () => {
  postOrder();
});

loadCart();



const postOrder = () =>{

  /* CONTACT INPUTS */
let firstName = document.getElementById("firstName").value;
let name = document.getElementById("lastName").value;
let address = document.getElementById("address").value;
let city = document.getElementById("city").value;
let email = document.getElementById("email").value;

let  contact ={firstName:firstName,lastName:name,address:address,city:city,email:email};
  let products = JSON.parse(localStorage.getItem("cart"));

  products.forEach((entry,index) =>{
    products[index]=entry.id;
  })

  let postData = {contact:contact,products:products}

  if(validateAll(contact)){

    
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
      };



    fetch('http://localhost:3000/api/products/order', options)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
        }).then(response => {        
        order = response.orderId;
        console.log(order);
        window.location.href=window.location.origin+"/html/confirmation.html?orderId="+response.orderId ;

        
        }).catch(e => {
        console.log(e);
        });

  }
};

console.log(order);
