alert ("Armemos tu viaje a Disney!");

class Producto {
    constructor(nombre, precio){
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }
}

const parks = [];
parks.push (new Producto("magic kingdom", "109"));
parks.push (new Producto("epcot", "109"));
parks.push (new Producto("animal kingdom", "109"));
parks.push (new Producto("hollywood Studios", "109"));
parks.push (new Producto("Typhoon Lagoon", "74"));
parks.push (new Producto("Blizzard Beach", "74"));

const airline = [];
airline.push (new Producto("AA", "1300"));
airline.push (new Producto("AR", "1100"));
airline.push (new Producto("LA", "900"));


let hotel = 65; //Valor en USD x día
let dias;
let personas;
let parquesAcuaticos;
let pAtoUpper;
let totalP = 0;
let totalE = 0;
let vuelo;

const SUMA = (a,b) => a + b;

function datos (){
    personas = parseInt(prompt("Ingrese la cantidad de personas que viajan"));
    dias = parseInt(prompt ("Ingrese la cantidad de días de su estadía"));
    parquesAcuaticos = prompt ("Desea agregar parques acuáticos?");
    pAtoUpper = parquesAcuaticos.toUpperCase();
}

function aerolinea(){
    let aereos = prompt ("Ingrese su aerolinea: AA AR LA");
    vuelo = aereos.toUpperCase();
    
    switch(vuelo){
        case "AA":
            alert("Viajas por American Airlines");
            break;
        case "AR":
            alert("Viajas por Aerolineas Argentinas");
            break;
        case "LA":
            alert ("Viajas por LATAM");
            break;
        default:
            alert ("No seleccionaste ninguna aerolinea");
        break;
    }
}

function parkTotal (){
    let total = 0;
    for (let i = 0; i < parks.length; i++){
        total = total + parks[i].precio;
    }
    return total;
}

function noAcua (){
    parks.splice (4,2)  
    let total = 0;
    for (let i = 0; i < parks.length; i++){
        total = total + parks[i].precio;
    }
    return total;
}

do {
    datos();
    if(personas>0 && dias>0 && pAtoUpper === "SI"){
        totalP = personas * parkTotal();
        totalE = dias * personas * hotel;
    }else if(personas>0 && dias>0){
        noAcua();
        totalP = personas * noAcua();
        totalE = dias * personas * hotel;
    }
}while(personas<=0 || dias<=0 || isNaN(personas) || isNaN(dias));

document.write ('<p class="text-normal">Cantidad Total de Personas: '+personas+'</p>');
document.write ('<p class="text-normal">Estadia total: '+dias+' día/s</p>');
console.log (totalP);
document.write ('<p class="text-normal">Valor Final Atracciones Disney 4 días 4 parques temáticos: $' + totalP + ' USD</p>');
console.log (totalE);
document.write ('<p class="text-normal">Valor Final por una estadia de ' + dias + ' día/s en un hotel 3 estrellas: $' + totalE + ' USD</p>');
console.log (pAtoUpper);

aerolinea();
let paquete = vuelo;
console.log (paquete);
if (paquete ==="AA"){
    let paqueteAA = SUMA (airline[0].precio,SUMA(totalE,totalP));
    document.write('<p class="text-normal">Viajas por American Airlines. Valor de tu vuelo: $' + airline[0].precio + ' USD</p>');
    document.write('<p class="text-total">VALOR TOTAL DE TU PAQUETE: $' + paqueteAA +' USD</p>');
}else if(paquete ==="AR"){
    let paqueteAR = SUMA (airline[1].precio,SUMA(totalE,totalP));
    document.write('<p class="text-normal">Viajas por Aerolineas Argentinas. Valor de tu vuelo: $' + airline[1].precio + ' USD</p>');
    document.write('<p class="text-total">VALOR TOTAL DE TU PAQUETE: $' + paqueteAR +' USD</p>');
}else if(paquete ==="LA"){
    let paqueteLA = SUMA (airline[2].precio,SUMA(totalE,totalP));
    document.write('<p class="text-normal">Viajas por LATAM. Valor de tu vuelo: $' + airline[2].precio + ' USD</p>');
    document.write('<p class="text-total">VALOR TOTAL DE TU PAQUETE: $' + paqueteLA +' USD</p>');
}else{
    let paqueteNull = SUMA (totalE,totalP);
    document.write('<p class="text-normal">No seleccionaste ninguna aerolinea</p>');
    document.write('<p class="text-total"   >VALOR TOTAL DE TU PAQUETE: $' + paqueteNull +' USD</p>');
}
