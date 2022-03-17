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
        this.dias = parseInt(dias);
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

let totalP = 0;
let totalE = 0;
let vuelo;
let cotiHoy = 205; //7-3-2022
let hotel;

//fetch
const mostrarParqueImg = (parques) => {
    const contenido = document.querySelector('.imgHotel');
    
    let html ="";

    parques.forEach((parque) => {
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
    
    fetch ("data/data.json")
        .then(respuesta => {
            return respuesta.json();
        })
        .then((datos) => {
            console.log(datos);
            mostrarParqueImg (datos);
        })
        .catch((err) => {
            console.log(err)
        });
};

//Funciones
/*
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
}*/

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

function operaciones(){
    totalE = diasContados() * personas.value * estadiaHotel();
    totalP = personas.value * parksElegidos();
}

function validarFormulario(e){
    e.preventDefault ();
    operaciones();
    parksElegidos();
    //mostrarUsuario();
    mostrarParques();
    mostrarHoteles();
    mostrarVuelo();
    mostrarTotalesUSD();
    mostrarTotalesARS();
    obtenerParqueJson();
}

//Eventos
personas.addEventListener("input", () =>{
    console.log(personas.value)
});

dias.addEventListener("input",() => {
    console.log(dias.value);
    mostrarHoteles();
})

selectVuelo.onclick = () => {
    vuelo = selectVuelo.options[selectVuelo.selectedIndex].value;
    mostrarVuelo();
    console.log(vuelo);
}

selectHotel.onclick = () =>{
    hotel = selectHotel.options[selectHotel.selectedIndex].value;
    operaciones();
    mostrarHoteles();
    console.log(hotel);
}

miFormulario.addEventListener("submit", validarFormulario);

//Local Storage
const datosIngresados = [];
datosIngresados.push (new Datos("lastone",personas.value, diasContados(),selectVuelo.options[selectVuelo.selectedIndex].value, selectHotel.options[selectHotel.selectedIndex].value ))

const datosIngresadosLS = (clave,valor) => { localStorage.setItem(clave,valor)};
datosIngresadosLS("datosAlmacenados",JSON.stringify(datosIngresados));

const objIngresado = JSON.parse(localStorage.getItem("datosAlmacenados"));


/*
const persIngr = localStorage.setItem('personasIngresadas', personas.value);
console.log (persIngr);
const persIngrJS = JSON.parse(persIngr);
console.log(persIngrJS)
localStorage.setItem('diasIngresados', dias.value);
console.log (localStorage.getItem('diasIngresados'));
localStorage.setItem('vueloIngresado', selectVuelo.options[selectVuelo.selectedIndex].value);
console.log (localStorage.getItem('vueloIngresado'));
localStorage.setItem('hotelIngresado', selectHotel.options[selectHotel.selectedIndex].value);
console.log (localStorage.getItem('hotelIngresado'));*/


