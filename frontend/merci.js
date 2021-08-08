document.getElementsByClassName("lastRecap")[0].innerHTML += "Id: " + localStorage.orderId + "</br>d'un total de: " + localStorage.getItem("prixTotal");
localStorage.removeItem("orderId");
