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
    tempPrice = tempPrice.replace(",",".");
    tempPrice = tempPrice.slice(0, -1);
    tempPrice = Number(tempPrice);

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

cartButton.addEventListener('click', function(event) {
    event.preventDefault();
    document.location.href = 'http://localhost:5500/frontend/merci.html';
});

function emptyCart() {
    localStorage.removeItem("produits");
}





