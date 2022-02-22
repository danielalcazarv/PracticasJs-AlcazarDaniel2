alert ("Armemos tu viaje a Disney!");

class Parques {
    constructor(id, nombre, precio){
        this.id = parseInt(id);
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }
}

class Aerolineas {
    constructor(id, nombre, precio){
        this.id = parseInt(id);
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }
}

class Hotel {
    constructor(id, estrellas, nombre, precio){
        this.id = parseInt(id);
        this.estrellas = parseInt(estrellas);
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }
}

const parks = [];
parks.push (new Parques(1,"magic kingdom", 109));
parks.push (new Parques(2,"epcot", "109"));
parks.push (new Parques(3,"animal kingdom", 109));
parks.push (new Parques(4,"hollywood Studios", 109));
parks.push (new Parques(5,"Typhoon Lagoon", 74));
parks.push (new Parques(6,"Blizzard Beach", 74));

const airline = [];
airline.push (new Aerolineas(1,"AA", 1300));
airline.push (new Aerolineas(2,"AR", 1100));
airline.push (new Aerolineas(3,"LA", 900));

const hotels = [];
hotels.push (new Hotel(1,3, "value hotels", 68));
hotels.push (new Hotel(2,4, "moderate hotels", 144));
hotels.push (new Hotel(3,5, "deluxe hotels", 350));

let cotiHoy = 212;
let hotel;
let dias;
let personas;
let parquesAcuaticos;
let pAtoUpper;
let totalP = 0;
let totalE = 0;
let vuelo;

const SUMA = (a,b) => a + b;
const MULTI = (a,b) => a * b;

const pesificarParks = parks.map ( x => {
    return {
        id: x.id,
        nombre: x.nombre,
        precio: x.precio * cotiHoy,
    }
})

const pesificarAirline = airline.map ( x => {
    return {
        id: x.id,
        nombre: x.nombre,
        precio: x.precio * cotiHoy,
    }
})

const pesificarHotels = hotels.map ( x => {
    return {
        id: x.id,
        estrellas: x.estrellas,
        nombre: x.nombre,
        precio: x.precio * cotiHoy,
    }
})

function datos (){
    personas = parseInt(prompt("Ingrese la cantidad de personas que viajan"));
    dias = parseInt(prompt ("Ingrese la cantidad de días de su estadía"));
    parquesAcuaticos = prompt ("Desea agregar parques acuáticos?");
    pAtoUpper = parquesAcuaticos.toUpperCase();
    hotel = parseInt(prompt("Seleccione su hotel 3, 4 o 5 Estrellas"))
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

function estadiaHotel(){
    const resultado = hotels.filter((x)=>x.estrellas === hotel);
    let total = 0;
    for (let i = 0; i < resultado.length; i++){
        total = total + resultado[i].precio;
    }
    return total;
}

do {
    datos();
    aerolinea();
    if(personas>0 && dias>0 && pAtoUpper === "SI"){
        totalP = personas * parkTotal();
        totalE = dias * personas * estadiaHotel();
    }else if(personas>0 && dias>0){
        noAcua();
        totalP = personas * noAcua();
        totalE = dias * personas * estadiaHotel();
    }
}while(personas<=0 || dias<=0 || hotel<3 || hotel>5 || isNaN(personas) || isNaN(dias) || isNaN(hotel));

document.write ('<p class="text-normal">Cantidad Total de Personas: '+personas+'</p>');
document.write ('<p class="text-normal">Estadia total: '+dias+' día/s</p>');
console.log (totalP);
document.write ('<p class="text-normal">Valor Final Atracciones Disney parques temáticos: $' + totalP + ' USD</p>');
console.log (totalE);
document.write ('<p class="text-normal">Valor Final por una estadia de ' + dias + ' día/s en un hotel '+hotel+ ' estrellas: $' + totalE + ' USD</p>');
console.log (pAtoUpper);
console.log (pesificarParks);
console.log (pesificarHotels);
console.log (pesificarAirline);
console.log (vuelo);

if (vuelo ==="AA"){
    document.write('<p class="text-normal">Viajas por American Airlines. Valor de tu vuelo: $' + airline[0].precio + ' USD</p>');
    document.write('<p class="text-total">VALOR TOTAL EN DOLARES: $' + SUMA (airline[0].precio,SUMA(totalE,totalP)) +' USD</p>');
    document.write('<p class="text-total">VALOR TOTAL EN PESOS: $' + MULTI(SUMA (airline[0].precio,SUMA(totalE,totalP)),cotiHoy) +' ARG</p>');
}else if(vuelo ==="AR"){
    document.write('<p class="text-normal">Viajas por Aerolineas Argentinas. Valor de tu vuelo: $' + airline[1].precio + ' USD</p>');
    document.write('<p class="text-total">VALOR TOTAL EN DOLARES: $' + SUMA (airline[1].precio,SUMA(totalE,totalP)) +' USD</p>');
    document.write('<p class="text-total">VALOR TOTAL EN PESOS: $' + MULTI(SUMA (airline[1].precio,SUMA(totalE,totalP)),cotiHoy) +' ARG</p>');
}else if(vuelo ==="LA"){
    document.write('<p class="text-normal">Viajas por LATAM. Valor de tu vuelo: $' + airline[2].precio + ' USD</p>');
    document.write('<p class="text-total">VALOR TOTAL EN DOLARES: $' + SUMA (airline[2].precio,SUMA(totalE,totalP)) +' USD</p>');
    document.write('<p class="text-total">VALOR TOTAL EN PESOS: $' + MULTI(SUMA (airline[2].precio,SUMA(totalE,totalP)),cotiHoy) +' ARG</p>');
}else{
    document.write('<p class="text-normal">No seleccionaste ninguna aerolinea</p>');
    document.write('<p class="text-total">VALOR TOTAL EN DOLARES: $' + SUMA (totalE,totalP) +' USD</p>');
    document.write('<p class="text-total">VALOR TOTAL EN PESOS: $' + MULTI(SUMA(totalE,totalP),cotiHoy) +' ARG</p>');
}
