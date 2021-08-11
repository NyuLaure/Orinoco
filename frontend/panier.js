//VARIABLES 
var firstName = "";
var lastName = "";
var address = "";
var city = "";
var email = "";


//FONCTIONS

// fonction verifiant le bon format du prenom et nom
function checkFirstLastName(prenom, nom) {
    let reg = /^[A-Za-z]+$/
    let firstNameValid = false;
    let lastNameValid = false;
    let boolArray = [];
    if (!reg.test(prenom))
    {
        console.log("Prenom invalide");
        firstNameValid = false;
    } else {
        firstNameValid = true;
    }
    if (!reg.test(nom))
    {
        console.log("Nom invalide");
        lastNameValid = false;
    } else {
        lastNameValid = true;
    }
    boolArray.push(firstNameValid, lastNameValid);
    return boolArray;
}

// fonction verifiant le bon format de la ville et adresse
function checkAddressCity(ville, adresse) {
    let reg = /^[a-zA-Z0-9\s,'-]*$/
    let cityValid = false;
    let addressValid = false;
    let boolArray = [];
    if (!reg.test(ville))
    {
        console.error("Ville invalide");
        cityValid = false;
    } else {
        cityValid = true;
    }
    if (!reg.test(adresse))
    {
        console.error("Adresse invalide");
        addressValid = false;
    } else {
        addressValid = true;
    }
    boolArray.push(cityValid, addressValid);
    return boolArray;
}

// fonction verifiant le bon format du mail
function checkMail(email) { 
    let reg = /^[a-z0-9-.]+@[a-z0-9-.]+.[a-z]+$/
    let mailValid = false;
    if (!reg.test(email))
    {
        console.error("email invalide");
        mailValid = false;
    } else { 
        mailValid = true;
    }
    return mailValid;
}

// fonction appelant checkFirstLastName - checkAddressCity - checkMail
function checkContact(prenom, nom, ville, adresse, email) {
    let boolArray = [];
    boolArray.push.apply(boolArray, checkFirstLastName(prenom, nom));
    boolArray.push.apply(boolArray, checkAddressCity(ville, adresse));
    boolArray.push(checkMail(email));
    if (boolArray.includes(false)) {
        console.error("Formulaire invalide");
        alert(
            "Prenom : Ne doit comporter que des lettres" + "\r\n" +
            "Nom : Ne doit comporter que des lettres" + "\r\n" +
            "Ville : Ne doit comporter que des lettres" + "\r\n" +
            "Adresse : Ne doit comporter que des lettres, chiffres, espaces, tirets et apostrophes" + "\r\n" +
            "Email : Doit respecter le modele : 'nom@domaine.ext'"
            );
        return false;
    } else {
        return true;
    }
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

    let contactValid = checkContact(firstName, lastName, city, address, email);
    if (contactValid) {
        return contact;
    }
}

//permet de recuperer l'ensemble des id des produits du panier
function reqDataProducts() {
    var products = [];
    try {
        for (let i = 0; i < JSON.parse(localStorage.produits).length; i++) {
            products.push(JSON.parse(localStorage.produits)[i][0]);
        }
        return products;
    } catch (error) {
        console.log("Panier vide - Erreur => " + error);
        alert("Votre panier est vide.");
    }
}

//envoie données boutons envoie formulaire
let cartButton = document.getElementById("cartButton");
var orderId = "";

cartButton.addEventListener('click', function(event) {
    event.preventDefault();
    let dataContact = reqDataContact();
    let dataProductsId = reqDataProducts();
    if ((dataContact && dataProductsId)) {
        getOrderId(dataContact, dataProductsId);
        emptyCart();
    }
});

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
try {
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
} catch (error) {
    console.log("Le panier est vide")
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