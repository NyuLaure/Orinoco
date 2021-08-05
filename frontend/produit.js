
// extraire l'id 


let id_url = new URLSearchParams(document.location.search);
let monId = id_url.get("id");
console.log(monId);

var quantityValue;
var lenseModel;

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
                    <p>${global[i].name} </p> 
                    <p>${global[i].price/100},00€ </p> 
                    <img class="image" src="${global[i].imageUrl}"/>
                    <p>${global[i].description}</p>
                </div>`;

                Produit.innerHTML = infoProduct;
                break;
            }
        }

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
/*
        //Envoie des données dans le panier 
        let sendValue = document.getElementById("addToCart");
        sendValue.addEventListener('click', function(cart) {
            var 
        }) */
    });
