let response;
let itemIdlist = [];

fetch("http://localhost:3000/api/cameras").then(function(reponse) {
    return response.json();
}).then(function (obj) {
    let productSection = document.getElementById("liste-produits");

    for (let i = 0; i < obj.length; i++ ) {

        const productCard = 
        <div class="card col-sm-12 col-md-6 col-lg-4" sty
    }
})