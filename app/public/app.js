const socket = io();
let tabGraczy = []
// Event handler for receiving chat messages
socket.on("dolaczyl", (data) => {
    tabGraczy = data
})



const CIULIKI_POS = [265, 390];
const CIULIKIP = [965, 1090];
const PAPASMERF = document.querySelector(".KillingFloor");
let tablica_ciulikow = [[],[]]
let tablica_ciulikowP = [[],[]]
const WYRWIDAB = document.querySelector(".wyrwidab");
const WALIGORA = document.querySelector(".waligora");
let gracz = false;
let kuponyNaPiwoWyrwidaba = 0;
let kuponyNaPiwoWaligory = 0;
let skuty = false


function generujCiulika(){
    let ciulik = document.createElement("div");
    ciulik.setAttribute("class", "ciulikL");
    let x = Math.floor(Math.random()*CIULIKI_POS.length)
    socket.emit("ruszajL", x)
    ciulik.style.left = `${CIULIKI_POS[x]}px`
    // console.log(x)
    x == 0 ? tablica_ciulikow[1].push(true) : tablica_ciulikow[1].push(false)
    // ciulik.style.top = `50px`
    tablica_ciulikow[0].push(ciulik);
    PAPASMERF.appendChild(ciulik)
}

socket.on("ruszajL", x => {
    let ciulik = document.createElement("div");
    ciulik.setAttribute("class", "ciulikL");
    ciulik.style.left = `${CIULIKI_POS[x]}px`
    x == 0 ? tablica_ciulikow[1].push(true) : tablica_ciulikow[1].push(false)
    // ciulik.style.top = `50px`
    tablica_ciulikow[0].push(ciulik);
    PAPASMERF.appendChild(ciulik)

    if(tablica_ciulikow[0].length > 9){
        tablica_ciulikow[0].shift()
    }
    if(tablica_ciulikow[1].length >= 8){
        tablica_ciulikow[1].shift()
    }
    
    // console.log(tablica_ciulikow[1][7])
    // console.log(tablica_ciulikow[1])
    tablica_ciulikow[0].forEach(ciul => {

        ciul.style.top = `${parseInt(window.getComputedStyle(ciul).getPropertyValue("top").replace("px", "")) + 100}px`;
        // console.log(window.getComputedStyle(ciul).getPropertyValue("top"))
        // console.log(tablica_ciulikow[0])
    })
})

function generujCiulikaP(){
    let ciulik = document.createElement("div");
    ciulik.setAttribute("class", "ciulikL");
    let x = Math.floor(Math.random()*CIULIKIP.length)
    socket.emit("ruszajP", x)
    ciulik.style.left = `${CIULIKIP[x]}px`
    // console.log(x)
    x == 0 ? tablica_ciulikowP[1].push(true) : tablica_ciulikowP[1].push(false)
    // ciulik.style.top = `50px`
    tablica_ciulikowP[0].push(ciulik);
    PAPASMERF.appendChild(ciulik)
}

socket.on("ruszajP", x => {
    let ciulik = document.createElement("div");
    ciulik.setAttribute("class", "ciulikL");
    ciulik.style.left = `${CIULIKIP[x]}px`
    x == 0 ? tablica_ciulikowP[1].push(true) : tablica_ciulikowP[1].push(false)
    // ciulik.style.top = `50px`
    tablica_ciulikowP[0].push(ciulik);
    PAPASMERF.appendChild(ciulik)

    if(tablica_ciulikowP[0].length > 9){
        tablica_ciulikowP[0].shift()
    }
    if(tablica_ciulikowP[1].length >= 8){
        tablica_ciulikowP[1].shift()
    }
    
    // console.log(tablica_ciulikow[1][7])
    // console.log(tablica_ciulikow[1])
    tablica_ciulikowP[0].forEach(ciul => {

        ciul.style.top = `${parseInt(window.getComputedStyle(ciul).getPropertyValue("top").replace("px", "")) + 100}px`;
        // console.log(window.getComputedStyle(ciul).getPropertyValue("top"))
        // console.log(tablica_ciulikow[0])
    })
})
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
        socket.emit("czekajCwaniaku", socket.id)
    }else{
        kuponyNaPiwoWyrwidaba += 1;
        document.querySelector(".kuponyNaPiwoWyrwidaba").innerHTML = kuponyNaPiwoWyrwidaba
        socket.emit("kuponyNaPiwoWyrwidaba", kuponyNaPiwoWyrwidaba)
    }
    // console.log(tablica_ciulikow[1][7])
    // console.log(tablica_ciulikow[1])
    tablica_ciulikow[0].forEach(ciul => {

        ciul.style.top = `${parseInt(window.getComputedStyle(ciul).getPropertyValue("top").replace("px", "")) + 100}px`;
        // console.log(window.getComputedStyle(ciul).getPropertyValue("top"))
        // console.log(tablica_ciulikow[0])
    })
}

socket.on("czekajCwaniaku", id => {
    console.log("czekaj")
    if(id == socket.id){
        skuty = true;
        let gracz = socket.id == tabGraczy[0] ? WYRWIDAB : WALIGORA
        
        gracz.style.filter = "invert(50%)"
        setTimeout(() =>{
            skuty = false;
            gracz.style.filter = "invert(0)"
            
        } , 1000);
    }
})

socket.on("kuponyNaPiwoWyrwidaba", kupony => {
    kuponyNaPiwoWyrwidaba = kupony
    document.querySelector(".kuponyNaPiwoWyrwidaba").innerHTML = kuponyNaPiwoWyrwidaba
})

socket.on("kuponyNaPiwoWaligory", kupony => {
    kuponyNaPiwoWaligory = kupony
    document.querySelector(".kuponyNaPiwoWaligory").innerHTML = kuponyNaPiwoWaligory
})

function ruszajCiulaP(){
    generujCiulikaP();
    if(tablica_ciulikowP[0].length > 9){
        tablica_ciulikowP[0].shift()
    }
    if(tablica_ciulikowP[1].length >= 8){
        tablica_ciulikowP[1].shift()
    }
    if(tablica_ciulikowP[1][0] != pozycja && tablica_ciulikowP[1].length >= 7){
        socket.emit("czekajCwaniaku", socket.id)
    }else{
        kuponyNaPiwoWaligory += 1;
        document.querySelector(".kuponyNaPiwoWaligory").innerHTML = kuponyNaPiwoWaligory
        socket.emit("kuponyNaPiwoWaligory", kuponyNaPiwoWaligory)
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
    if(socket.id == tabGraczy[0]){
        socket.emit("wyrwidabP")
        WYRWIDAB.style.left = "410px";
        pozycja = true;
        ruszajCiula()
    }else if(socket.id == tabGraczy[1]){
        socket.emit("waligoraP")
        WALIGORA.style.left = "1110px";
        pozycja = true
        ruszajCiulaP()
    }
    
}

socket.on("wyrwidabP", () =>{
    WYRWIDAB.style.left = "410px";
})
socket.on("wyrwidabL", () =>{
    WYRWIDAB.style.left = "290px";
})

socket.on("waligoraP", () =>{
    WALIGORA.style.left = "1110px";
})
socket.on("waligoraL", () =>{
    WALIGORA.style.left = "990px";
})



function doLewa(){
    if(socket.id == tabGraczy[0]){
        socket.emit("wyrwidabL")
        WYRWIDAB.style.left = "290px";
        pozycja = false;
        ruszajCiula()
    }else if(socket.id == tabGraczy[1]){
        socket.emit("waligoraL")
        WALIGORA.style.left = "990px";
        pozycja = false
        ruszajCiulaP()
    }
   
}

let wynik = document.querySelector(".wynik")

document.addEventListener('keydown', function(event) {    
    if(kuponyNaPiwoWaligory >= 29){
        document.querySelector(".kuponyNaPiwoWaligory").innerHTML = "30"
        wynik.innerHTML = "Wygral gracz 2"
        
    }else if(kuponyNaPiwoWyrwidaba >= 29){
        document.querySelector(".kuponyNaPiwoWyrwidaba").innerHTML = "30"
        wynik.innerHTML = "Wygral gracz 1"
        
    }else if(!skuty){
        if (event.keyCode === 65) {
        
            doLewa()
            
        }else if(event.keyCode === 68){
          zPrawa();
        }
    }
});




