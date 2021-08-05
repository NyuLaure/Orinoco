
// extraire l'id 


let id_url = new URLSearchParams(document.location.search);
let monId = id_url.get("id");
console.log(monId);

fetch("http://localhost:3000/api/cameras") 
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(res) {
        let global = res;
        
        for (let i = 0; i < global.length; i++) {
            if (global[i]._id == monId) {
                let Produit = document.getElementById("monProduit");
                
                var infoProduct = `
                <div  class="col-6 text-center " >
                    <p>${global[i].name} </p> 
                    <p>${global[i].price/100},00€ </p> 
                    <img class="image" src="${global[i].imageUrl}"/>
                    <p>${global[i].description}</p>
                </div>`;

                Produit.innerHTML = infoProduct;
            }
        }
    });