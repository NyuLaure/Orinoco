//console.log(global[0]._id, global[1].price);

var item = document.getElementById("items");

// item.innerHTML=global[0]._id + global[0].price + global[0].name;

//for ( let i=0; i<global.length; i++){
   // item.innerHTML+="<p>" + global[i].name + "</p>" ;
  //  item.innerHTML+="<p>" + global[i].price/100 +",00€" + "</p>" ;
  //  item.innerHTML+='<img class="image" src="' + global[i].imageUrl + '"/>';
  //  item.innerHTML+="<p>" + global[i].description + "</p>" ;
//  }



fetch("http://localhost:3000/api/cameras") 
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(res) {
        let global = res; 
        console.log(global.length);

    for ( let i=0; i<global.length; i++){
        var products = `
            <div  class="col-sm-12 col-md-6 col-lg-4 mb-5 mt-5 text-center " >
                <p id="productName">${global[i].name} </p> 
                <p id="productPrice">${global[i].price/100},00€</p> 
                <img id="productPicture" class="image" src="${global[i].imageUrl}"/>
                <p id="productDescription">${global[i].description}</p> 
                <a href="produit.html?id=${global[i]._id}" type="button" class="btn btn-secondary " id="seeProductButton" data-id="${global[i]._id} data-name="${global[i].name}" data-price="${global[i].price/100},00€" > Voir le produit </a>
            </div>`;
        
        item.innerHTML+=products;
    }
    
}); 


