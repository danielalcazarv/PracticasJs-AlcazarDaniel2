//Variables
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

const SUMA = (a,b) => a + b;
const MULTI = (a,b) => a * b;

const parks = [];   
parks.push (new Parques(1,"magic kingdom", 109));
parks.push (new Parques(2,"epcot", 109));
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

const dias = document.getElementById('cantidadEstadia');
const personas = document.getElementById('cantidadPasajeros');
const selectVuelo = document.getElementById('vuelo');
const selectHotel = document.getElementById('hotel');
const miFormulario = document.getElementById('formulario');
const datosUsuario = document.querySelector('.datosUsuario');
const datosPaquete = document.querySelector('.datosPaquete');
const totales = document.querySelector('.totales');
const parksChecked = document.querySelectorAll('.checkSi:checked');
const parksElegidos = Array.from(parksChecked);


let totalP = 0;
let totalE = 0;
let vuelo;
let cotiHoy = 212;
let hotel;

/*
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
})*/

//Funciones
function parkTotal (){
    const seleccion = [];
    for (let i = 0; i < parksElegidos.length; i++) {
        seleccion.push(parksElegidos[i].value)
    }
    const filtrar = parks.filter((x)=>!seleccion.find(y=>x.id==y))
    console.log(filtrar);

    const diferencia = parks.filter((x)=>!filtrar.find(y=>x.id==y.id));
    console.log(diferencia);
    let total = 0;

    for (let i = 0; i < diferencia.length; i++){
        total = total + diferencia[i].precio;
    }
    return total;
}

function estadiaHotel(){
    const resultado = hotels.filter((x)=>x.estrellas == hotel);
    let total = 0;
    for (let i = 0; i < resultado.length; i++){
        total = total + resultado[i].precio;
    }
    return total;
}

function mostrarUsuario(){
    datosUsuario.innerHTML="";
    const personasCantidad = document.createElement('p');
    personasCantidad.classList.add('text-normal');
    personasCantidad.textContent = "Cantidad Total de Personas: " + personas.value;

    const estadia = document.createElement('p');
    estadia.classList.add('text-normal');
    estadia.textContent = "Estadia total ingresada: " + dias.value + " día/s";

    datosUsuario.appendChild(personasCantidad);
    datosUsuario.appendChild(estadia);
}

function mostrarPaquete(){
    datosPaquete.innerHTML="";
    const parqueSelect = document.createElement('p');
    parqueSelect.classList.add('text-normal');
    parqueSelect.textContent = "Valor Final Atracciones Disney parques temáticos: $"+totalP+" USD";

    const hotelSelect = document.createElement('p');
    hotelSelect.classList.add('text-normal');
    hotelSelect.textContent = "Valor Final por una estadia de "+ dias.value +" día/s en un hotel " + hotel + " estrellas: $" +totalE+ " USD";

    datosPaquete.appendChild(parqueSelect);
    datosPaquete.appendChild(hotelSelect);
}

function mostrarVuelo(){
    if (vuelo ==="AA"){
        const vueloAA = document.createElement('p');
        vueloAA.classList.add('text-normal');
        vueloAA.textContent = "Viajas por American Airlines. Valor de tu vuelo: $" +airline[0].precio+ "USD";
        datosPaquete.appendChild(vueloAA);
        
    }else if(vuelo ==="AR"){
        const vueloAR = document.createElement('p');
        vueloAR.classList.add('text-normal');
        vueloAR.textContent = "Viajas por Aerolineas Argentinas. Valor de tu vuelo: $" +airline[1].precio+ "USD";
        datosPaquete.appendChild(vueloAR)
        
    }else if(vuelo ==="LA"){
        const vueloLA = document.createElement('p');
        vueloLA.classList.add('text-normal');
        vueloLA.textContent = "Viajas por LATAM. Valor de tu vuelo: $" +airline[2].precio+ "USD";
        datosPaquete.appendChild(vueloLA);
        
    }else{
        const vueloNone = document.createElement('p');
        vueloNone.classList.add('text-normal');
        vueloNone.textContent = "No seleccionaste ninguna aerolinea";
        datosPaquete.appendChild(vueloNone);
    }
}

function mostrarTotalesUSD(){
    totales.innerHTML="";
    if (vuelo ==="AA"){
        const vueloAA = document.createElement('p');
        vueloAA.classList.add('text-total');
        vueloAA.textContent = "VALOR TOTAL EN DOLARES: $" + SUMA (airline[0].precio,SUMA(totalE,totalP)) + "USD";
        totales.appendChild(vueloAA);
    
    }else if(vuelo ==="AR"){
        const vueloAR = document.createElement('p');
        vueloAR.classList.add('text-total');
        vueloAR.textContent = "VALOR TOTAL EN DOLARES: $" + SUMA (airline[1].precio,SUMA(totalE,totalP)) + "USD";
        totales.appendChild(vueloAR)
        
    }else if(vuelo ==="LA"){
        const vueloLA = document.createElement('p');
        vueloLA.classList.add('text-total');
        vueloLA.textContent = "VALOR TOTAL EN DOLARES: $" + SUMA (airline[2].precio,SUMA(totalE,totalP)) + "USD";
        totales.appendChild(vueloLA);
        
    }else{
        const vueloNone = document.createElement('p');
        vueloNone.classList.add('text-total');
        vueloNone.textContent = "VALOR TOTAL EN DOLARES: $"+ SUMA (totalE,totalP) + "USD";
        totales.appendChild(vueloNone);
    }
}

function mostrarTotalesARS(){
    if (vuelo ==="AA"){
        const vueloAA = document.createElement('p');
        vueloAA.classList.add('text-total');
        vueloAA.textContent = "VALOR TOTAL EN PESOS: $" + MULTI(SUMA (airline[0].precio,SUMA(totalE,totalP)),cotiHoy) + "ARS";
        totales.appendChild(vueloAA);
    
    }else if(vuelo ==="AR"){
        const vueloAR = document.createElement('p');
        vueloAR.classList.add('text-total');
        vueloAR.textContent = "VALOR TOTAL EN PESOS: $" + MULTI(SUMA (airline[1].precio,SUMA(totalE,totalP)),cotiHoy) + "ARS";
        totales.appendChild(vueloAR)
        
    }else if(vuelo ==="LA"){
        const vueloLA = document.createElement('p');
        vueloLA.classList.add('text-total');
        vueloLA.textContent = "VALOR TOTAL EN PESOS: $" + MULTI(SUMA (airline[2].precio,SUMA(totalE,totalP)),cotiHoy) + "ARS";
        totales.appendChild(vueloLA);
        
    }else{
        const vueloNone = document.createElement('p');
        vueloNone.classList.add('text-total');
        vueloNone.textContent = "VALOR TOTAL EN PESOS: $"+ MULTI(SUMA(totalE,totalP),cotiHoy) + "ARS";
        totales.appendChild(vueloNone);
    }
}

function operaciones(){
    totalE = dias.value * personas.value * estadiaHotel();
    totalP = personas.value * parkTotal();
}

function validarFormulario(e){
    e.preventDefault ();
    operaciones();
    mostrarUsuario();
    mostrarPaquete();
    mostrarVuelo();
    mostrarTotalesUSD();
    mostrarTotalesARS();
}

//Eventos
personas.addEventListener("input", () =>{
    console.log(personas.value)
});

dias.addEventListener("input",() => {
    console.log(dias.value)
})

selectVuelo.onclick = () => {
    vuelo = selectVuelo.options[selectVuelo.selectedIndex].value;
    console.log(vuelo);
}

selectHotel.onclick = () =>{
    hotel = selectHotel.options[selectHotel.selectedIndex].value;
    console.log(hotel);
}

miFormulario.addEventListener("submit", validarFormulario);