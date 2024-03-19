const socket = io();

// Event handler for receiving chat messages
socket.on('connection', () => {
  // Handle received message
  console.log("G")
  
});

socket.on("GoodMoaning", () => {
    console.log("Good Moaning")
})



const CIULIKI_POS = [290, 390];
const CIULIKIP = [990, 1090];
const PAPASMERF = document.querySelector(".KillingFloor");
let tablica_ciulikow = [[],[]]
let tablica_ciulikowP = [[],[]]
const WYRWIDAB = document.querySelector(".wyrwidab");
const WALIGORA = document.querySelector(".waligora");
let gracz = true;
let kuponyNaPiwoWyrwidaba = 0;
let kuponyNaPiwoWaligory = 0;

PAPASMERF.addEventListener('click', () => {
    socket.emit("yo", kuponyNaPiwoWaligory)
    kuponyNaPiwoWaligory += 1
    console.log(kuponyNaPiwoWaligory)
})

socket.on("lewy", (siema) => {
    kuponyNaPiwoWaligory = siema + 1
    
})





function generujCiulika(){
    let ciulik = document.createElement("div");
    ciulik.setAttribute("class", "ciulikL");
    let x = Math.floor(Math.random()*CIULIKI_POS.length)
    ciulik.style.left = `${CIULIKI_POS[x]}px`
    // console.log(x)
    x == 0 ? tablica_ciulikow[1].push(true) : tablica_ciulikow[1].push(false)
    // ciulik.style.top = `50px`
    tablica_ciulikow[0].push(ciulik);
    PAPASMERF.appendChild(ciulik)
}

function generujCiulikaP(){
    let ciulik = document.createElement("div");
    ciulik.setAttribute("class", "ciulikL");
    let x = Math.floor(Math.random()*CIULIKIP.length)
    ciulik.style.left = `${CIULIKIP[x]}px`
    // console.log(x)
    x == 0 ? tablica_ciulikowP[1].push(true) : tablica_ciulikowP[1].push(false)
    // ciulik.style.top = `50px`
    tablica_ciulikowP[0].push(ciulik);
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
    }else{
        kuponyNaPiwoWyrwidaba += 1;
        document.querySelector(".kuponyNaPiwoWyrwidaba").innerHTML = kuponyNaPiwoWyrwidaba
    }
    // console.log(tablica_ciulikow[1][7])
    // console.log(tablica_ciulikow[1])
    tablica_ciulikow[0].forEach(ciul => {

        ciul.style.top = `${parseInt(window.getComputedStyle(ciul).getPropertyValue("top").replace("px", "")) + 100}px`;
        // console.log(window.getComputedStyle(ciul).getPropertyValue("top"))
        // console.log(tablica_ciulikow[0])
    })
}

function ruszajCiulaP(){
    generujCiulikaP();
    if(tablica_ciulikowP[0].length > 9){
        tablica_ciulikowP[0].shift()
    }
    if(tablica_ciulikowP[1].length >= 8){
        tablica_ciulikowP[1].shift()
    }
    if(tablica_ciulikowP[1][0] != pozycja && tablica_ciulikowP[1].length >= 7){
        console.log("ty ciulu")
    }else{
        kuponyNaPiwoWaligory += 1;
        document.querySelector(".kuponyNaPiwoWaligory").innerHTML = kuponyNaPiwoWaligory
    }
    // console.log(tablica_ciulikow[1][7])
    // console.log(tablica_ciulikow[1])
    tablica_ciulikowP[0].forEach(ciul => {

        ciul.style.top = `${parseInt(window.getComputedStyle(ciul).getPropertyValue("top").replace("px", "")) + 100}px`;
        // console.log(window.getComputedStyle(ciul).getPropertyValue("top"))
        // console.log(tablica_ciulikow[0])
    })
}


function zPrawa(){
    if(!gracz){
        WYRWIDAB.style.left = "410px";
        pozycja = true;
        ruszajCiula()
    }else{
        WALIGORA.style.left = "1110px";
        pozycja = true
        ruszajCiulaP()
    }
    
}

function doLewa(){
    if(!gracz){
        WYRWIDAB.style.left = "290px";
        pozycja = false;
        ruszajCiula()
    }else{
        WALIGORA.style.left = "990px";
        pozycja = false
        ruszajCiulaP()
    }
   
}

document.addEventListener('keydown', function(event) {    
    if (event.keyCode === 65) {
        
        doLewa()
        
    }else if(event.keyCode === 68){
      zPrawa();
    }
});


