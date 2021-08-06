let tempCart = JSON.parse(window.localStorage.getItem("produits"))[0];

let finalCart = document.getElementById("finalCart");

var final = `
    <div class="text-center">
        <p class="cartProductName">${tempCart[2]}</p>
        <p class="cartQuantityValue">${tempCart[1]}</p>
        <p class="cartProductPrice">${tempCart[3]}</p>
        <img src="${tempCart[4]}" class="cartProductPicture"/>
    </div>
    `;
finalCart.innerHTML += final;
//for (let i=0, i<produits.length, i++ )