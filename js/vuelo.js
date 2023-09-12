// crear selecteros

const nombreInput = document.querySelector('#nombrepass');
const apellidoInput = document.querySelector("#apellidopass");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const destinoInput = document.querySelector('#destino');
const fechaInput2 = document.querySelector("#fecha2");
const horaInput2 = document.querySelector("#hora2");
const origenInput = document.querySelector('#origen');
const asientoInput = document.querySelector("#asientos");
const formulario = document.querySelector("#nuevo-pasaje");
const contenedorInput = document.querySelector('#pasajes');

//let  radio = document.form.opciones.value;
//const radioInputs = document.querySelectorAll('input[type="radio"]');
let editar;

//console.log(radio)




class pasajes{
    constructor(){
        this.pasajes =[];
    }

    agregarPasaje(pasaje){
        this.pasajes = [...this.pasajes,pasaje] // ... agrega al array sin sustituir llamo a pasajes y le agregro pasaje agregada

        console.log(this.pasajes) //ir viendo como se agregan las pasajes.

    }


    eliminarPasaje( id, asiento){

        this.pasajes = this.pasajes.filter(i => i.id !== id)

        const seats = document.getElementsByTagName("img");
        
    for (let i = 0; i < seats.length; i++){
        let seat = seats[i];
        
        if(seat.id === asiento){
                
                seat.classList.remove('asiento_reservado', 'asiento_seleccionado')
                seat.classList.add('asientos_a')
               
        }

    }
        
      

    }

    editarPasaje(pasajeAct){
        this.pasajes = this.pasajes.map(pasaje => (pasaje.id === pasajeAct.id ? pasajeAct : pasaje));
    
        //this.pasajes = this.pasajes.map(i => i.id === pasajeAct.id ? pasajeAct : pasajes)
        // condiciom ? true: false
        
    }

}



class ui {
    imprimirAlerta(mensaje, tipo){

        const divMensaje = document.createElement("div");

        divMensaje.classList.add("text-center", 'alert', 'col-12');

        if(tipo ==='error'){
            divMensaje.classList.add('alert-danger');

        }else {
            divMensaje.classList.add('alert-success')
        }

        divMensaje.textContent = mensaje;

         document.querySelector("#contenido").insertBefore(divMensaje,document.querySelector(".agregar-pasaje"));

         setTimeout(()=>{
            divMensaje.remove()

         }, 2000)
    }

    imprimirPasaje({pasajes}) {
    //console.log('imprimir pasajes')
    this.limpiarHTML() // para limpiar el html

    pasajes.forEach(pasajes => {

            const {nombre, apellido, telefono, fecha, hora, destino, fecha2, hora2, origen, asiento, id, reserva, viaje} = pasajes;

            const divpasaje = document.createElement('div');
            divpasaje.classList.add('pasaje', 'p-3');
            divpasaje.dataset.id = id; // se agrega el id del item del arreglo para borrarlo luego
            

            const nombreParrafo = document.createElement('h2');
            nombreParrafo.classList.add('card-title', 'font-weigt-bolder');
            nombreParrafo.textContent = nombre;
            divpasaje.appendChild(nombreParrafo);

            const apellidoParrafo = document.createElement('p');
            apellidoParrafo.innerHTML = `<span class='font-weigth-bolder'> Apellido: ${apellido}</span>`;
            divpasaje.appendChild(apellidoParrafo);

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class='font-weigth-bolder'> Telefono: ${telefono}</span>`;
            divpasaje.appendChild(telefonoParrafo);

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class='font-weigth-bolder'> Fecha de Salida ${fecha}</span>`;
            divpasaje.appendChild(fechaParrafo);

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class='font-weigth-bolder'> Hora de Salida: ${hora}</span>`;
            divpasaje.appendChild(horaParrafo);

            const origenParrafo2 = document.createElement('p');
            origenParrafo2.innerHTML = `<span class='font-weigth-bolder'> Origen: ${origen}</span>`;
            divpasaje.appendChild(origenParrafo2);
                      

            const fechaParrafo2 = document.createElement('p');
            fechaParrafo2.innerHTML = `<span class='font-weigth-bolder'> Fecha de Llegada: ${fecha2}</span>`;
            divpasaje.appendChild(fechaParrafo2);

            const horaParrafo2 = document.createElement('p');
            horaParrafo2.innerHTML = `<span class='font-weigth-bolder'> Hora de Llegada: ${hora2}</span>`;
            divpasaje.appendChild(horaParrafo2);

            const destinoParrafo = document.createElement('p');
            destinoParrafo.innerHTML = `<span class='font-weigth-bolder'> Destino: ${destino}</span>`;
            divpasaje.appendChild(destinoParrafo);
            

            const asientoParrafo = document.createElement('p');
            asientoParrafo.innerHTML = `<span class='font-weigth-bolder'> Asiento: ${asiento}</span>`;
            divpasaje.appendChild(asientoParrafo);

            const viajes = document.createElement('p');
            viajes.innerHTML = `<span class='font-weigth-bolder'> Viaje: ${viaje}</span>`;
            divpasaje.appendChild(viajes);

            const idParrafo = document.createElement('p');
            idParrafo.innerHTML = `<span class='font-weigth-bolder'> Serial: ${id}</span>`;
            divpasaje.appendChild(idParrafo);

            const reservaParrafo = document.createElement('p');
            reservaParrafo.innerHTML = `<span class='font-weigth-bolder'> Fecha de Reserva: ${reserva}</span>`;
            divpasaje.appendChild(reservaParrafo);

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = () => eliminarPasaje(id, asiento);
            divpasaje.appendChild(btnEliminar);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            btnEditar.onclick = () => cargarEdicion(pasajes) // parametro pasaje es lo actual
            divpasaje.appendChild(btnEditar);



            contenedorInput.appendChild(divpasaje);

            this.pasajeReservado(asiento)

         })
    }

        limpiarHTML(){
            while(contenedorInput.firstChild){
                contenedorInput.removeChild(contenedorInput.firstChild)

            }
        }

        pasajeReservado = (asiento) => {

        asientoReservado(asiento);
                               
        }

    
   
}


// crear instancia

const administrarPasaje = new pasajes();
const userUi = new ui()


// crear los eventos.
eventListener();

function eventListener (){

    nombreInput.addEventListener("input", datosPasaje);
    apellidoInput.addEventListener("input", datosPasaje);
    telefonoInput.addEventListener("input", datosPasaje);
    fechaInput.addEventListener("input", datosPasaje);
    horaInput.addEventListener("input", datosPasaje);
    destinoInput.addEventListener("input", datosPasaje);
    fechaInput2.addEventListener("input", datosPasaje);
    horaInput2.addEventListener("input", datosPasaje);
    origenInput.addEventListener("input", datosPasaje);
    asientoInput.addEventListener("click", selecccionarPasaje);
    formulario.addEventListener("submit", nuevoPasaje);
    

}

// crear objeto o estructura para guardar la informacion de las pasajes
const pasajeObj = {

    nombre:'',
    apellido:'',
    telefono:'',
    fecha:'',
    hora:'',
    origen:'',
    fecha2:'',
    hora2:'',    
    destino:'',
    asiento:'',
    reserva:'',
    viaje:''

    
}

function datosPasaje(e){
    //guardar los valores en el objeto

    pasajeObj[e.target.name] = e.target.value;

    let  radio = document.form.opciones.value;
    pasajeObj.viaje = radio;
    
    
    console.log(pasajeObj)
    
}

function nuevoPasaje(e){
    
    e.preventDefault();
  

    // extraer la informacion del objeto
   

    const {nombre, apellido,telefono,fecha, hora, destino, fecha2, hora2, origen, asiento} = pasajeObj;
    
    const date = new Date();

    const Finicial = fechaInput.value; 
    const Ffinal = fechaInput2.value;

    console.log(Ffinal,Finicial)

    if(nombre ==='' || apellido ==='' || telefono ==='' || fecha ==='' || hora ==='' || destino === '' || fecha2 ==='' || hora2 ==='' || origen === '' || asiento === ''){
        
        userUi.imprimirAlerta('Todos los Campos Son Obligatorios', 'error')

       
     
    }else if(Ffinal <= Finicial || Ffinal === Finicial ){

        userUi.imprimirAlerta('La Fecha de Llegada No debe Ser Menor que la Fecha de Salida', 'error')

    }else if(editar){ // coloco esta variable editar como booleado, boton que da sumit a crear pasaje

       formulario.querySelector('button[type=submit]').textContent = 'Crear Boleto';
       editar = false;
       administrarPasaje.editarPasaje({...pasajeObj});
       userUi.imprimirAlerta('Se ha modificado el boleto correctamente');
       


    }else{
       

        pasajeObj.id = "MG" + Date.now();

        pasajeObj.reserva = date.getMonth() + '-' +  date.getDate() + '-' + date.getFullYear() + '--' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        
        administrarPasaje.agregarPasaje({...pasajeObj});
     
        userUi.imprimirAlerta('Se ha reservado correctamente');

    }


    formulario.reset(); // Reinicia los datos ingresados en el form
    
    reiniciarObj() // Reniciar el arreglo para que no muestre lo anterior

    userUi.imprimirPasaje(administrarPasaje);
   

    }

function selecccionarPasaje(e){
    pasajeObj.asiento = e.target.id;

        e.target.classList.toggle('asiento_seleccionado')

    console.log()
}


function asientoReservado(asiento){

    const seats = document.getElementsByTagName("img");

    for (let i = 0; i < seats.length; i++){
        let seat = seats[i];
        
        if(seat.id === asiento){

                seat.classList.add('asiento_reservado')
                seat.classList.remove('asientos_a')
        }

    }
  

}



function ediatrAsientoReservado(asiento){

    const seats = document.getElementsByTagName("img");

    for (let i = 0; i < seats.length; i++){
        let seat = seats[i];
        
        if(seat.id === asiento){

                seat.classList.add('asientos_a')
                seat.classList.remove('asiento_reservado')
        }

    }

}

function msjEditarAsiento(){
    const divpasaje = document.createElement('div');
    const msj = "Para Reservar otro asiento, debe liberar el asiento actual presionandolo"
    divpasaje.classList.add('alert-info', 'p-3');
    
    const nombreParrafo = document.createElement('h2');
    nombreParrafo.classList.add('card-title', 'font-weigt-bolder');
    nombreParrafo.textContent = msj;
    divpasaje.appendChild(nombreParrafo);
    contenedorInput.appendChild(divpasaje);
    
    setTimeout(()=>{
        divpasaje.remove()

     }, 1000)
    
}

function reiniciarObj(){
        pasajeObj.nombre = '';
        pasajeObj.apellido = '';
        pasajeObj.telefono = '';
        pasajeObj.fecha = '';
        pasajeObj.hora = '';
        pasajeObj.destino = '';
        pasajeObj.fecha2 = '';
        pasajeObj.hora2 = '';
        pasajeObj.origen = '';
        pasajeObj.asiento = '';
        pasajeObj.viaje = ''


    }

function eliminarPasaje (id, asiento) {
   //  console.log('eliminar')

   administrarPasaje.eliminarPasaje(id,asiento);

   //actualizar la impresion de las pasajes

   userUi.imprimirAlerta('El boleto se ha eliminado correctamente')

   userUi.imprimirPasaje(administrarPasaje);
}




function cargarEdicion(pasaje){ // debo hacer destructuracion

    const {nombre, apellido, telefono, fecha, hora, destino,  fecha2, hora2, origen,asiento, id, viaje} = pasaje;
    
    msjEditarAsiento()

    ediatrAsientoReservado(asiento)

    // llenamos los input para editar
    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    destinoInput.value = destino;
    fechaInput2.value = fecha2;
    horaInput2.value = hora2;
    origenInput.value = origen;
    asientoInput.value = asiento;
    viaje = document.form.opciones.value;


    // llenar el objeto para volverlo a enviar

    pasajeObj.nombre = nombre;
    pasajeObj.apellido = apellido;
    pasajeObj.telefono = telefono;
    pasajeObj.fecha = fecha;
    pasajeObj.hora = hora;
    pasajeObj.destino = destino;
    pasajeObj.fecha2 = fecha2;
    pasajeObj.hora2 = hora2;
    pasajeObj.origen = origen;
    pasajeObj.asiento = asiento;
    pasajeObj.id = id
    pasajeObj.viaje = viaje

    /// cambiar el texto al boton

     formulario.querySelector('button[type=submit]').textContent = 'Guardar';
     editar = true;

}