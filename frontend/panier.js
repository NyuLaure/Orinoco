// Affichage du produit mit dans le panier
let myCart = JSON.parse(window.localStorage.getItem("produits"));
let finalCart = document.getElementById("finalCart");

for ( let i=0; i<myCart.length; i++) {
    var final = `
    <div class="text-center">
        <p class="cartProductName">${myCart[i][2]}</p>
        <p class="cartQuantityValue">${myCart[i][1]}</p>
        <p class="cartProductPrice">${myCart[i][3]}</p>
        <img src="${myCart[i][4]}" class="cartProductPicture"/>
    </div>
    `;
    finalCart.innerHTML += final;  
}



//envoie données boutons envoie formulaire

let cartButton = document.getElementById("cartButton");

cartButton.addEventListener('click', function(event) {
    event.preventDefault();
    document.location.href = 'http://localhost:5500/frontend/merci.html';
});

function emptyCart() {
    localStorage.removeItem("produits");
}





