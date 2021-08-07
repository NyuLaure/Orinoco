
// extraire l'id 


let id_url = new URLSearchParams(document.location.search);
let monId = id_url.get("id");


var quantityValue = 1;
var lenseModel;

// Recuperation les infos produits de l'API
fetch("http://localhost:3000/api/cameras") 
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(res) {
        let global = res;
        
        for (var i = 0; i < global.length; i++) {
            if (global[i]._id == monId) {
                let Produit = document.getElementById("monProduit");
                
                var infoProduct = `
                <div>
                    <p id="productName">${global[i].name}</p> 
                    <p id="productPrice">${global[i].price/100},00€</p> 
                    <img id ="productPicture" class="image" src="${global[i].imageUrl}"/>
                    <p id"productDescription">${global[i].description}</p>
                </div>`;

                Produit.innerHTML = infoProduct;
                break;
            }
        }

        // Choix de la lentille 
        let lenseChoiceContent = document.getElementById("lenseChoice");
        for (let j = 0; j < global[i].lenses.length; j++) {
            lenseChoiceContent.innerHTML += `
            <option value="${global[i].lenses[j]}">${global[i].lenses[j]}</option>
            `;
        }

        // Récupération de la quantité d'appareils
        let quantityBouton = document.getElementById("quantite").children[0];
        quantityBouton.addEventListener('click', function(event) {
            event.stopPropagation();
            quantityValue = event.target.value;
        });

        // Récupération de la valeur de la lentille
        let lenseType = document.getElementById("lenseChoice");
        lenseModel = lenseType.value;
        lenseType.addEventListener('change', function(e) {
            e.stopPropagation();
            lenseModel = e.target.value;
        });


        //Envoie des données dans le panier 
        let productName = document.getElementById("productName").textContent;
        let productPrice = document.getElementById("productPrice").textContent;
        let productPicture = document.getElementById("productPicture").src;

        let addToCartBtn = document.getElementById("addToCart");
        addToCartBtn.addEventListener('click', function(event) {
            let productOptions = [monId, Number(quantityValue), productName, productPrice, productPicture];
            if (!window.localStorage.getItem("produits")) {
                window.localStorage.setItem("produits", JSON.stringify([]));
                let tempCart = JSON.parse(window.localStorage.getItem("produits"));
                tempCart.push(productOptions);
                window.localStorage.setItem("produits", JSON.stringify(tempCart));
            
            } else {
                let tempCart = JSON.parse(window.localStorage.getItem("produits"));
                tempCart.push(productOptions);
                window.localStorage.setItem("produits", JSON.stringify(tempCart));
               
            }

                alert("Le produit a été ajouté au panier");
        })
    });
