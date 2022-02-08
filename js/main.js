alert ("Armemos tu viaje a Disney!");

let parques = 436; // Valor total en USD para ingresar a los 4 parques
let hotel = 65; //Valor en USD x día
let dias;
let personas;
let totalP = 0;
let totalE = 0;
let vuelo;

const SUMA = (a,b) => a + b;

function datos (){
    personas = parseInt(prompt("Ingrese la cantidad de personas que viajan"));
    dias = parseInt(prompt ("Ingrese la cantidad de días de su estadía"));
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

do {
    datos();
    if(personas>0 && dias>0){
        totalP = personas * parques;
        totalE = dias * personas * hotel;
    }
}while(personas<=0 || dias<=0 || isNaN(personas) || isNaN(dias));

document.write ('<p class="text-normal">Cantidad Total de Personas: '+personas+'</p>');
document.write ('<p class="text-normal">Estadia total: '+dias+' día/s</p>');
console.log (totalP);
document.write ('<p class="text-normal">Valor Final Atracciones Disney 4 días 4 parques temáticos: $' + totalP + ' USD</p>');
console.log (totalE);
document.write ('<p class="text-normal">Valor Final por una estadia de ' + dias + ' día/s en un hotel 3 estrellas: $' + totalE + ' USD</p>');

aerolinea();
let paquete = vuelo;
console.log (paquete);
if (paquete ==="AA"){
    let aa = 1300;
    let paqueteAA = SUMA (aa,SUMA(totalE,totalP));
    document.write('<p class="text-normal">Viajas por American Airlines. Valor de tu vuelo: $' + aa + ' USD</p>');
    document.write('<p class="text-total">VALOR TOTAL DE TU PAQUETE: $' + paqueteAA +' USD</p>');
}else if(paquete ==="AR"){
    let ar = 1100;
    let paqueteAR = SUMA (ar,SUMA(totalE,totalP));
    document.write('<p class="text-normal">Viajas por Aerolineas Argentinas. Valor de tu vuelo: $' + ar + ' USD</p>');
    document.write('<p class="text-total">VALOR TOTAL DE TU PAQUETE: $' + paqueteAR +' USD</p>');
}else if(paquete ==="LA"){
    let la = 900;
    let paqueteLA = SUMA (la,SUMA(totalE,totalP));
    document.write('<p class="text-normal">Viajas por LATAM. Valor de tu vuelo: $' + la + ' USD</p>');
    document.write('<p class="text-total">VALOR TOTAL DE TU PAQUETE: $' + paqueteLA +' USD</p>');
}else{
    let paqueteNull = SUMA (totalE,totalP);
    document.write('<p class="text-normal">No seleccionaste ninguna aerolinea</p>');
    document.write('<p class="text-total"   >VALOR TOTAL DE TU PAQUETE: $' + paqueteNull +' USD</p>');
}
