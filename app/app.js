const SOCKET = io("ws://localhost:3500");
const STARTINGVALUES = []

SOCKET.emit("message", "It is I Leclerc");

SOCKET.on("message", (data) => {
    console.log(data);
})

const CIULIKI_POS = [41, 47];
const PAPASMERF = document.querySelector(".KillingFloor");
let tablica_ciulikow = [[],[]]
const WYRWIDAB = document.querySelector(".wyrwidab");



function generujCiulika(){
    let ciulik = document.createElement("div");
    ciulik.setAttribute("class", "ciulik");
    let x = Math.floor(Math.random()*CIULIKI_POS.length)
    ciulik.style.left = `${CIULIKI_POS[x]}vw`
    // console.log(x)
    x == 0 ? tablica_ciulikow[1].push(true) : tablica_ciulikow[1].push(false)
    // ciulik.style.top = `50px`
    tablica_ciulikow[0].push(ciulik);
    PAPASMERF.appendChild(ciulik)
}
let pozycja;
// generujCiulika()
// console.log(tablica_ciulikow)
function ruszajCiula(){
    generujCiulika();
    if(tablica_ciulikow[0].length > 9){
        tablica_ciulikow[0].shift()
    }
    if(tablica_ciulikow[1].length >= 8){
        tablica_ciulikow[1].shift()
    }
    if(tablica_ciulikow[1][0] != pozycja && tablica_ciulikow[1].length >= 7){
        console.log("ty ciulu")
    }
    // console.log(tablica_ciulikow[1][7])
    // console.log(tablica_ciulikow[1])
    tablica_ciulikow[0].forEach(ciul => {

        ciul.style.top = `${parseInt(window.getComputedStyle(ciul).getPropertyValue("top").replace("px", "")) + 100}px`;
        // console.log(window.getComputedStyle(ciul).getPropertyValue("top"))
        // console.log(tablica_ciulikow[0])
    })
}


function zPrawa(){
    WYRWIDAB.style.left = "50vw";
    pozycja = true;
    ruszajCiula()
    
}

function doLewa(){
    WYRWIDAB.style.left = "40vw";
    pozycja = false
    ruszajCiula()
   
}

document.addEventListener('keydown', function(event) {    
    if (event.keyCode === 65) {
      doLewa()
    }else if(event.keyCode === 68){
      zPrawa();
    }
});


