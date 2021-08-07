// Affichage du produit mit dans le panier
let myCart = JSON.parse(window.localStorage.getItem("produits"));
let finalCart = document.getElementById("finalCart");

for ( let i=0; i<myCart.lenght; i++) {
    
}
var final = `
    <div class="text-center">
        <p class="cartProductName">${myCart[2]}</p>
        <p class="cartQuantityValue">${myCart[1]}</p>
        <p class="cartProductPrice">${myCart[3]}</p>
        <img src="${myCart[4]}" class="cartProductPicture"/>
    </div>
    `;
finalCart.innerHTML += final;

//envoie données boutons envoie formulaire

let cartButton = document.getElementById("cartButton");

cartButton.addEventListener('click', function(event) {
    event.preventDefault();
    document.location.href = 'http://localhost:5500/frontend/merci.html';
});

// recuperations des informations du panier 



