//VARIABLES 
var firstName = "";
var lastName = "";
var address = "";
var city = "";
var email = "";


//FONCTIONS

function check_contact(varContact) {
    
}

function reqDataContact() {
    firstName = document.getElementById('firstName').value;
    lastName = document.getElementById('lastName').value;
    address = document.getElementById('address').value;
    city = document.getElementById('city').value;
    email = document.getElementById('mail').value;
    contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
    };


    return contact;
}

//permet de recuperer l'ensemble des id des produits du panier
function reqDataProducts() {
    var products = [];
    for (let i = 0; i < JSON.parse(localStorage.produits).length; i++) {
        products.push(JSON.parse(localStorage.produits)[i][0]);
    }
    return products;
}

//envoi une requete 'POST' a /order avec les informations de contact et id du panier
//pour recuperation du orderId
function getOrderId(varContact, varProducts){
    (async() => {
        const rawResponse = await fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({contact: varContact, products: varProducts})
        });
            var content = await rawResponse.json();
            orderId = content.orderId;
            localStorage.setItem("orderId", orderId);
            document.location.href = 'http://localhost:5500/frontend/merci.html';
    })();
}

//permet de vider le panier
function emptyCart() {
    localStorage.removeItem("produits");
}



// Affichage du produit mit dans le panier
let myCart = JSON.parse(window.localStorage.getItem("produits"));
let finalCart = document.getElementById("finalCart");
var finalPrice = Number();

for (let i=0; i<myCart.length; i++) {
    let final = `
    <div class="text-center>
        <p class="cartProductName">${myCart[i][2]}</p>
        <p class="cartQuantityValue">${myCart[i][1]}</p>
        <p class="cartProductPrice">${myCart[i][3]}</p>
        <img src="${myCart[i][4]}" class="cartProductPicture mb-5"/>
    </div>
    `;
    finalCart.innerHTML += final;

    //calcul du prix total du panier
    let tempPrice = myCart[i][3];
    let tempQuantity = myCart[i][1];
    tempPrice = tempPrice.replace(",",".");
    tempPrice = tempPrice.slice(0, -1);
    tempPrice = Number(tempPrice * tempQuantity);

    finalPrice += tempPrice;  
}

if(!String(finalPrice).includes(".")) {
    document.getElementById("finalCart").innerHTML += "<p id='finalPrice'>" + String(finalPrice) + ",00€" + "</p>";
}
else {
    document.getElementById("finalCart").innerHTML += "<p id='finalPrice'>" + String(finalPrice) + "€" + "</p>";
}

//enregistrement du prix total dans le localStorage
let finalPriceRecap = document.getElementById("finalPrice").textContent;
localStorage.setItem("prixTotal", finalPriceRecap);



//envoie données boutons envoie formulaire
let cartButton = document.getElementById("cartButton");
var orderId = "";

cartButton.addEventListener('click', function(event) {
    event.preventDefault();
    let dataContact = reqDataContact();
    let dataProductsId = reqDataProducts();
    getOrderId(dataContact, dataProductsId);
    emptyCart();
});



//On met la premiere lettre du prenom en majuscule et le reste en minuscule


/*

//first_name[0].toUpperCase() + first_name.slice(1).toLowerCase()

//Creation d'une regex qui teste que le premier caractere est en maj et le reste en min
let regName = "/^[A-Z][a-z]*$/"

//Booleen pour valider le prenom
let validFirstName = False;

//On verifie que le prenom repond bien aux critères de la regex
if (regName.test(first_name))  //Si le prenom repond aux critères
{
    validFirstName = True;          //Le prenom est valide
}


//Regex et conditions pour le nom de famille 
last_name = last_name[0].toUpperCase() + last_name.slice(1).toLowerCase();

let validLastName = False; 

if (regName.test(last_name)) 
{
    validLastName = True;
}

//Regex et conditions pour l'adresse 
address = address[0].toUpperCase() + address.slice(1).toLowerCase();

let regAddress = /^[a-zA-Z0-9\s,'-]*$/

let address = False; 

if (regAddress.test(address)) 
{
    validaddress = True;
}

//Regex et conditions pour la ville 
city = city[0].toUpperCase() + city.slice(1).toLowerCase();

let validcity = False; 

let regcity = /^[a-zA-Z0-9\s-]*$/

if (regcity.test(city)) 
{
    validcity = True;
}

//Regex et conditions pour l'adresse mail 
mail = mail.toLowerCase();

let regmail = /^[a-z0-9-.]+@[a-z0-9-.]+.[a-z]+$/

let mail = False; 

if (regmail.test(mail)) 
{
    validmail = True;
}
*/


//VARIABLES 

//Recuperation des valeurs entrées dans le formulaire
/*
//Prenom
var first_name_value = "";
let first_name = document.getElementById("firstName");
first_name.addEventListener('input', function(e_first_name) {
    first_name_value = e_first_name.target.value;
});

//Nom
var last_name_value = "";
let last_name = document.getElementById("lastName");
last_name.addEventListener('input', function(e_last_name) {
    last_name_value = e_last_name.target.value;
});

//Adresse
var address_value = "";
let address = document.getElementById("address");
address.addEventListener('input', function(e_address) {
    address_value = e_address.target.value;
});

//Ville
var city_value = "";
let city = document.getElementById("city");
city.addEventListener('input', function(e_city) {
    city_value = e_city.target.value;
});

//Mail
var mail_value = "";
let mail = document.getElementById("mail");
mail.addEventListener('input', function(e_mail) {
    mail_value = e_mail.target.value;
});
*/

//FONCTIONS
//Creation du formulaire de contact et envoi de la requete POST