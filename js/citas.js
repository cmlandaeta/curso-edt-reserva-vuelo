// crear selecteros

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");
const formulario = document.querySelector("#nueva-cita");
const contenedorInput = document.querySelector('#citas');
let editar;

class citas{
    constructor(){
        this.citas =[];
    }

    agregarCita(cita){
        this.citas = [...this.citas,cita] // ... agrega al array sin sustituir llamo a citas y le agregro cita agregada

        console.log(this.citas) //ir viendo como se agregan las citas.

    }


    eliminarCita(id){

        this.citas = this.citas.filter(i => i.id !== id)

    }

    editarCita(citaAct){
        this.citas = this.citas.map(cita => (cita.id === citaAct.id ? citaAct : cita));
    
        //this.citas = this.citas.map(i => i.id === citaAct.id ? citaAct : citas)
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
         document.querySelector("#contenido").insertBefore(divMensaje,document.querySelector(".agregar-cita"));

         setTimeout(()=>{
            divMensaje.remove()

         }, 500)
    }

    imprimircitas({citas}) {
    //console.log('imprimir citas')
    this.limpiarHTML() // para limpiar el html

    citas.forEach(citas => {
        const {mascota, propietario, telefono, fecha, hora, sintomas, id} = citas;

        const divCita = document.createElement('div');
        divCita.classList.add('cita', 'p-3');
        divCita.dataset.id = id; // se agrega el id del item del arreglo para borrarlo luego

        const mascotaParrafo = document.createElement('h2');
        mascotaParrafo.classList.add('card-title', 'font-weigt-bolder');
        mascotaParrafo.textContent = mascota;
        divCita.appendChild(mascotaParrafo);

        const propietarioParrafo = document.createElement('p');
        propietarioParrafo.innerHTML = `<span class='font-weigth-bolder'> Propietario: ${propietario}</span>`;
        divCita.appendChild(propietarioParrafo);

        const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = `<span class='font-weigth-bolder'> Telefono: ${telefono}</span>`;
        divCita.appendChild(telefonoParrafo);

        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `<span class='font-weigth-bolder'> Fecha: ${fecha}</span>`;
        divCita.appendChild(fechaParrafo);

        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `<span class='font-weigth-bolder'> Fecha: ${hora}</span>`;
        divCita.appendChild(horaParrafo);

        const sintomasParrafo = document.createElement('p');
        sintomasParrafo.innerHTML = `<span class='font-weigth-bolder'> Sintomas: ${sintomas}</span>`;
        divCita.appendChild(sintomasParrafo);

        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger');
        btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        btnEliminar.onclick = () => eliminarCita(id);
        divCita.appendChild(btnEliminar);

        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn', 'btn-info');
        btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
        btnEditar.onclick = () => cargarEdicion(citas) // parametro cita es lo actual
        divCita.appendChild(btnEditar);



        contenedorInput.appendChild(divCita);

    })
}

    limpiarHTML(){
    while(contenedorInput.firstChild){
        contenedorInput.removeChild(contenedorInput.firstChild)

    }
}

    
   
}

// crear instancia

const administrarCitas = new citas();
const userUi = new ui()


// crear los eventos.
eventListener();

function eventListener (){

    mascotaInput.addEventListener("input", datosCitas);
    propietarioInput.addEventListener("input", datosCitas);
    telefonoInput.addEventListener("input", datosCitas);
    fechaInput.addEventListener("input", datosCitas);
    horaInput.addEventListener("input", datosCitas);
    sintomasInput.addEventListener("input", datosCitas);
    formulario.addEventListener("submit", nuevaCita);

}

// crear objeto o estructura para guardar la informacion de las citas
const citasObj = {

    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:''
}

function datosCitas(e){
    //guardar los valores en el objeto

    citasObj[e.target.name] = e.target.value;
    console.log(citasObj)
}

function nuevaCita(e){
    e.preventDefault();

    // extraer la informacion del objeto

    const {mascota, propietario,telefono,fecha,hora, sintoma } = citasObj;

    if(mascota ==='' || propietario ==='' || telefono ==='' || fecha ===''|| hora ==='' || sintoma ===""){
        //console.log("son obligatorios");

        userUi.imprimirAlerta('Todos los Campos Son Obligatorios', 'error')
     
    } else if(editar){ // coloco esta variable editar como booleado, boton que da sumit a crear cita

        formulario.querySelector('button[type=submit]').textContent = 'Crear Cita';
       editar = false;
       administrarCitas.editarCita({...citasObj});
       userUi.imprimirAlerta('Se Ha modificado la cita correctamente')


    }else{

        console.log('creando nueva cita');

        citasObj.id = Date.now();
        administrarCitas.agregarCita({...citasObj});
        userUi.imprimirAlerta('Se ha agregado la cita correctamente');

    }


    formulario.reset(); // Reinicia los datos ingresados en el form
    reiniciarObj() // Reniciar el arreglo para que no muestre lo anterior

    userUi.imprimircitas(administrarCitas);
   

    }

    function reiniciarObj(){
        citasObj.mascota = '';
        citasObj.propietario = '';
        citasObj.telefono = '';
        citasObj.fecha = '';
        citasObj.hora = '';
        citasObj.sintomas = ''

    }

function eliminarCita (id) {
   //  console.log('eliminar')

   administrarCitas.eliminarCita(id);

   //actualizar la impresion de las citas

   userUi.imprimirAlerta('La cita se ha eliminado correctamente')

   userUi.imprimircitas(administrarCitas);
}




function cargarEdicion(cita){ // debo hacer destructuracion

    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // llenamos los input para editar
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // llenar el objeto 

    citasObj.mascota = mascota;
    citasObj.propietario = propietario;
    citasObj.telefono = telefono;
    citasObj.fecha = fecha;
    citasObj.hora = hora;
    citasObj.sintomas = sintomas;
    citasObj.id = id

    /// cambiar el texto al boton

    formulario.querySelector('button[type=submit]').textContent = 'Guardar';
     editar = true;

}