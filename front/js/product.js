//Global Variables
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id')

let products = []

let x =1;


// let newList = JSON.parse(localCart);


//Grabs the API info
fetch('http://localhost:3000/api/products/' + id)
.then(data => {
return data.json();
})

.then(data => {

// Setting properties for products
    document.title = data.name;
    let productImage = document.getElementsByClassName('item__img')[0];
    productImage.innerHTML += `<img src="${data.imageUrl}" alt="${data.name}">`;
    let productName = document.getElementById('title');
    productName.innerHTML += data.name;
    let productPrice = document.getElementById('price');
    productPrice.innerHTML += data.price;
    let productDescription = document.getElementById('description');
    productDescription.innerHTML += data.description;
    let colors = document.getElementById('colors');
    let options = '';
    let quant = document.getElementById('quantity');
// Gets the color dropdown  options
    data.colors.forEach(color => {
    options += ` <option value="${color}">${color}</option>`        
    });

    colors.innerHTML += options;

    let colorSel = document.getElementById('colors');
    let btn = document.getElementById('addToCart');

//Adds localStorage to products array.
let localCart = localStorage.getItem('cart');

if(localCart == null) {
} else {
    localCart = JSON.parse(localCart);
    localCart.forEach (item => {
    products.push(item);
    });
};

//Appends item to the 'products' array, then writes the array to localStorage

    btn.addEventListener("click", () => {
        let entry = {id:data._id, qty:parseInt(quant.value), col:colorSel.value};
        let index1 = products.findIndex(object => object.id == entry.id);
        let index2 = products.findIndex(object => object.col == entry.col);
        products.forEach(item => {
            item.qty = parseInt(item.qty);
        });
        //check if color or qty are missing
        if(entry.col == '' || entry.qty == 0) {alert("Error: Missing quantity and/or color of product");
            
        } else {
            //If ID is not found, add in entry
            if( index1 == -1){
                products.push(entry);
                //else continue checking
            } else if (index1 != -1) {
                if (index2 !=-1){
                    products[index2].qty += entry.qty;
                }
                else {
                    products.push(entry);
                };
            };
            };
        
        localStorage.setItem('cart', JSON.stringify(products));
        console.log(products)
    })
});
