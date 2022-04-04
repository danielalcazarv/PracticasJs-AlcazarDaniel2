//Variables
class ParquesYAereos {
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

class Datos {
    constructor(id, personas, dias, vuelo, hotel){
        this.id = id.toUpperCase();
        this.personas = parseInt(personas);
        this.dias = dias;
        this.vuelo = vuelo.toUpperCase();
        this.hotel = parseInt(hotel);
    }
}

const SUMA = (a,b) => a + b;
const MULTI = (a,b) => a * b;

const parks = [];   
parks.push (new ParquesYAereos(1,"magic kingdom", 109));
parks.push (new ParquesYAereos(2,"epcot", 109));
parks.push (new ParquesYAereos(3,"animal kingdom", 109));
parks.push (new ParquesYAereos(4,"hollywood Studios", 109));
parks.push (new ParquesYAereos(5,"Typhoon Lagoon", 74));
parks.push (new ParquesYAereos(6,"Blizzard Beach", 74));

const airline = [];
airline.push (new ParquesYAereos(1,"AA", 1300));
airline.push (new ParquesYAereos(2,"AR", 1100));
airline.push (new ParquesYAereos(3,"LA", 900));

const hotels = [];
hotels.push (new Hotel(1,3, "value hotels", 68));
hotels.push (new Hotel(2,4, "moderate hotels", 144));
hotels.push (new Hotel(3,5, "deluxe hotels", 350));

const dias = document.getElementById('cantidadEstadia');
const personas = document.getElementById('cantidadPasajeros');
const selectVuelo = document.getElementById('vuelo');
const selectHotel = document.getElementById('hotel');
const miFormulario = document.getElementById('formulario');
const nombrePasajero = document.getElementById('nombrePasajero');
const mailPasajero = document.getElementById('mailPasajero');
const datosParques = document.querySelector('.datosParques');
const datosHoteles = document.querySelector('.datosHoteles');
const datosVuelos = document.querySelector('.datosVuelos');
const totales = document.querySelector('.totales');
const cotiTotales = document.querySelector('.cotiTotales');
const urlCotiOficial = "https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolaroficial";

let totalP = 0;
let totalE = 0;
let vuelo;
let cotiHoy;
let hotel;

//fetch
const mostrarParqueImg = (parques) => {
    const contenido = document.querySelector('.imgParques');
    const seleccion = [];
    let html ="";
    
    let magic = document.getElementById("p1");
    magic.checked && seleccion.push(parques[0]);
    let epcot = document.getElementById("p2");
    epcot.checked && seleccion.push(parques[1]);
    let animal = document.getElementById("p3");
    animal.checked && seleccion.push(parques[2]);
    let hollywood = document.getElementById("p4");
    hollywood.checked && seleccion.push(parques[3]);
    let thyphoon = document.getElementById("p5");
    thyphoon.checked && seleccion.push(parques[4]);
    let blizzard = document.getElementById("p6");
    blizzard.checked && seleccion.push(parques[5]);

    seleccion.forEach((parque) => {
        const {nombre, alt, url,p} = parque;
        html += `
        <div class="col">
            <div class="card">
                <img src="${url}" width=338 height=492 class="card-img-top" alt="${alt}">
                <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${p}</p>
                </div>
            </div>
        </div>
        `;
    })

    contenido.innerHTML = html;
};

const obtenerParqueJson = () =>{
    
    fetch ("data/data-parques.json")
        .then(respuesta => {
            return respuesta.json();
        })
        .then((datos) => {
            mostrarParqueImg (datos);
        })
        .catch((err) => {
            console.log(err)
        });
};

//Funciones
async function getCoti(urlCotiOficial){
    const respuesta = await fetch(urlCotiOficial);
    const data = await respuesta.json();
    return data;
}

async function handleInitialLoad() {
    const data = await getCoti(urlCotiOficial);
    renderProjectsToDom(data);
}

function renderProjectsToDom(data) {
    cotiHoy = parseInt(data.venta);
}

function diasContados () {
    let dt = config.onClose();
    return dt;
}

function parksElegidos(){
    const seleccion = [];
    
    let magic = document.getElementById("p1");
    magic.checked && seleccion.push(parks[0].precio);
    
    let epcot = document.getElementById("p2");
    epcot.checked && seleccion.push(parks[1].precio);
    
    let animal = document.getElementById("p3");
    animal.checked && seleccion.push(parks[2].precio);
    
    let hollywood = document.getElementById("p4");
    hollywood.checked && seleccion.push(parks[3].precio);
    
    let thyphoon = document.getElementById("p5");
    thyphoon.checked && seleccion.push(parks[4].precio);
    
    let blizzard = document.getElementById("p6");
    blizzard.checked && seleccion.push(parks[5].precio);

    const total = seleccion.length>0 ? seleccion.reduce((a,b)=>a+b,0) : 0;
    return total;
}

function mostrarParques(){
    datosParques.innerHTML="";
    const parqueSelect = document.createElement('p');
    parqueSelect.classList.add('text-normal');
    parqueSelect.textContent = "Valor Final Atracciones Disney parques temáticos: $"+totalP+" USD";
    
    datosParques.appendChild(parqueSelect);
}

function estadiaHotel(){
    const seleccion = hotels.filter((x)=>x.estrellas == hotel);
    const resultado = seleccion.length>0 ? seleccion[0].precio : 0;
    return resultado;
}

function mostrarHoteles(){
    datosHoteles.innerHTML="";
    const hotelSelect = document.createElement('p');
    hotelSelect.classList.add('text-normal');
    hotelSelect.textContent = "Valor Final por una estadia de "+ diasContados() +" noche/s en un hotel " + hotel + " estrellas: $" +totalE+ " USD";

    datosHoteles.appendChild(hotelSelect);
}

function precioVuelo(){
    const seleccion = airline.filter((x)=>x.nombre == vuelo);
    const resultado = seleccion.length>0 ? seleccion[0].precio : 0;
    return MULTI (resultado,personas.value);
}

function mostrarVuelo(){
    datosVuelos.innerHTML="";
    if (vuelo ==="AA"){
        const vueloAA = document.createElement('p');
        vueloAA.classList.add('text-normal');
        vueloAA.textContent = "Viajas por American Airlines. Valor total del vuelo: $" +precioVuelo()+ " USD Son: "+personas.value+" pasaje/s.";
        datosVuelos.appendChild(vueloAA);
        
    }else if(vuelo ==="AR"){
        const vueloAR = document.createElement('p');
        vueloAR.classList.add('text-normal');
        vueloAR.textContent = "Viajas por Aerolineas Argentinas. Valor total del vuelo: $" +precioVuelo()+ " USD Son: "+personas.value+" pasaje/s.";
        datosVuelos.appendChild(vueloAR)
        
    }else if(vuelo ==="LA"){
        const vueloLA = document.createElement('p');
        vueloLA.classList.add('text-normal');
        vueloLA.textContent = "Viajas por LATAM. Valor total del vuelo: $" +precioVuelo()+ " USD Son: "+personas.value+" pasaje/s.";
        datosVuelos.appendChild(vueloLA);
        
    }else{
        const vueloNone = document.createElement('p');
        vueloNone.classList.add('text-normal');
        vueloNone.textContent = "No seleccionaste ninguna aerolinea";
        datosVuelos.appendChild(vueloNone);
    }
}

function mostrarTotalesUSD(){
    totales.innerHTML="";
    if (vuelo ==="AA"){
        const vueloAA = document.createElement('p');
        vueloAA.classList.add('text-total');
        vueloAA.textContent = "VALOR TOTAL EN DOLARES: $" + SUMA (precioVuelo(),SUMA(totalE,totalP)) + " USD";
        totales.appendChild(vueloAA);
    
    }else if(vuelo ==="AR"){
        const vueloAR = document.createElement('p');
        vueloAR.classList.add('text-total');
        vueloAR.textContent = "VALOR TOTAL EN DOLARES: $" + SUMA (precioVuelo(),SUMA(totalE,totalP)) + " USD";
        totales.appendChild(vueloAR)
        
    }else if(vuelo ==="LA"){
        const vueloLA = document.createElement('p');
        vueloLA.classList.add('text-total');
        vueloLA.textContent = "VALOR TOTAL EN DOLARES: $" + SUMA (precioVuelo(),SUMA(totalE,totalP)) + " USD";
        totales.appendChild(vueloLA);
        
    }else{
        const vueloNone = document.createElement('p');
        vueloNone.classList.add('text-total');
        vueloNone.textContent = "VALOR TOTAL EN DOLARES: $"+ SUMA (totalE,totalP) + " USD";
        totales.appendChild(vueloNone);
    }
}

function mostrarTotalesARS(){
    if (vuelo ==="AA"){
        const vueloAA = document.createElement('p');
        vueloAA.classList.add('text-total');
        vueloAA.textContent = "VALOR TOTAL EN PESOS: $" + MULTI(SUMA (precioVuelo(),SUMA(totalE,totalP)),cotiHoy) + " ARS";
        totales.appendChild(vueloAA);
    
    }else if(vuelo ==="AR"){
        const vueloAR = document.createElement('p');
        vueloAR.classList.add('text-total');
        vueloAR.textContent = "VALOR TOTAL EN PESOS: $" + MULTI(SUMA (precioVuelo(),SUMA(totalE,totalP)),cotiHoy) + " ARS";
        totales.appendChild(vueloAR)
        
    }else if(vuelo ==="LA"){
        const vueloLA = document.createElement('p');
        vueloLA.classList.add('text-total');
        vueloLA.textContent = "VALOR TOTAL EN PESOS: $" + MULTI(SUMA (precioVuelo(),SUMA(totalE,totalP)),cotiHoy) + " ARS";
        totales.appendChild(vueloLA);
        
    }else{
        const vueloNone = document.createElement('p');
        vueloNone.classList.add('text-total');
        vueloNone.textContent = "VALOR TOTAL EN PESOS: $"+ MULTI(SUMA(totalE,totalP),cotiHoy) + " ARS";
        totales.appendChild(vueloNone);
    }
}

function mostrarCoti(){
    const cotiOficial = document.createElement('p');
    cotiOficial.classList.add('text-total');
    cotiOficial.textContent = " Cotización del día: $1USD = $"+cotiHoy+" ARS";
    cotiTotales.appendChild(cotiOficial);
}

function operaciones(){
    totalE = diasContados() * personas.value * estadiaHotel();
    totalP = personas.value * parksElegidos();
}

function validarFormulario(e){
    e.preventDefault ();
    operaciones();
    parksElegidos();
    mostrarParques();
    mostrarHoteles();
    mostrarVuelo();
    mostrarTotalesUSD();
    mostrarTotalesARS();
    mostrarCoti();
    obtenerParqueJson();
}

//Eventos
dias.addEventListener("input",() => {
    mostrarHoteles();
})
selectVuelo.onclick = () => {
    vuelo = selectVuelo.options[selectVuelo.selectedIndex].value;
    mostrarVuelo();
}
selectHotel.onclick = () =>{
    hotel = selectHotel.options[selectHotel.selectedIndex].value;
    operaciones();
    mostrarHoteles();
}
miFormulario.addEventListener("submit", validarFormulario);
window.addEventListener("DOMContentLoaded", handleInitialLoad);

//Local Storage
const datosIngresados = [];
datosIngresados.push (new Datos("lastone",personas.value, config.onClose(),selectVuelo.options[selectVuelo.selectedIndex].value, selectHotel.options[selectHotel.selectedIndex].value ))

const datosIngresadosLS = (clave,valor) => { localStorage.setItem(clave,valor)};
datosIngresadosLS("datosAlmacenados",JSON.stringify(datosIngresados));

const objIngresado = JSON.parse(localStorage.getItem("datosAlmacenados"));

