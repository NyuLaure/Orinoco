//FONCTIONS
//permet de recuperer les information de contact pour requete POST
function reqDataContact() {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('mail').value;
    let contact = {
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






