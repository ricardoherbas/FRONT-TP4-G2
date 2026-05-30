const cardContainer = document.querySelector('#card-container-todos')
const btnAlumnos = document.querySelector('#btn-alumnos')

const cardContainer2 = document.querySelector('#card-container-legajo')
const btnAlumnoLegajo = document.querySelector('#btn-alumno-legajo')
const inputLegajo = document.querySelector('#input-legajo')

const cardContainer3 = document.querySelector('#card-container-nuevo')
const inputNombre = document.querySelector('#input-nombre')
const inputApellido = document.querySelector('#input-apellido')
const inputEmail = document.querySelector('#input-email')
const btnAlumnoNuevo = document.querySelector('#btn-alumno-nuevo')

const cardContainer4 = document.querySelector('#card-container-modificar')
const inputLegajoM = document.querySelector('#input-legajoM')
const inputNombreM = document.querySelector('#input-nombreM')
const inputApellidoM = document.querySelector('#input-apellidoM')
const inputEmailM = document.querySelector('#input-emailM')
const inputIsActiveM = document.querySelector('#input-isActiveM')
const btnAlumnoModificado = document.querySelector('#btn-alumno-modificar')

const cardContainer5 = document.querySelector('#card-container-eliminar')
const btnAlumnoEliminar = document.querySelector('#btn-alumno-eliminar')
const inputLegajoE = document.querySelector('#input-legajoE')

async function cargarTodosAlumnos() {
  try {
    const response = await fetch('https://tp4-nodejs-g2.onrender.com/alumnos')
    const data = await response.json()

    cardContainer.innerHTML = ''
    data.forEach(alumno => {
      const div = document.createElement('div')
      div.classList.add('card')
      div.innerHTML = `
        <p>LEGAJO: ${alumno.legajo}</p>
        <p>NOMBRE: ${alumno.nombre}</p>
        <p>APELLIDO: ${alumno.apellido}</p>
        <p>EMAIL: ${alumno.email}</p>
        <p>FECHA ALTA: ${alumno.fechaAlta}</p>
        <p>MODIFICACION: ${alumno.modificacion}</p>
        <p>IS ACTIVE: ${alumno.isActive}</p>
      `
      cardContainer.append(div)
    })
  } catch (error) {
    console.error("Error al cargar alumnos:", error)
  }
}

async function cargarAlumnoPorLegajo() {
  try {
    const legajo = inputLegajo.value.trim()
    if (!legajo) return alert("Ingrese un legajo válido")

    const response = await fetch(`https://tp4-nodejs-g2.onrender.com/alumnos/${legajo}`)
    if (!response.ok) throw new Error(`Alumno con legajo ${legajo} no encontrado`)

    const alumno = await response.json()
    cardContainer2.innerHTML = `
      <div class="card">
        <p>LEGAJO: ${alumno.legajo}</p>
        <p>NOMBRE: ${alumno.nombre}</p>
        <p>APELLIDO: ${alumno.apellido}</p>
        <p>EMAIL: ${alumno.email}</p>
        <p>FECHA ALTA: ${alumno.fechaAlta}</p>
        <p>MODIFICACION: ${alumno.modificacion}</p>
        <p>IS ACTIVE: ${alumno.isActive}</p>
      </div>
    `
  } catch (error) {
    console.error("Error al cargar alumno por legajo:", error)
  }
}

async function agregarAlumno() {
  try {
    const nombre = inputNombre.value.trim()
    const apellido = inputApellido.value.trim()
    const email = inputEmail.value.trim()

    if (!nombre || !apellido || !email) return alert("Complete todos los campos")

    const nuevoAlumno = { nombre, apellido, email }
    const response = await fetch('https://tp4-nodejs-g2.onrender.com/alumnos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoAlumno)
    })

    const data = await response.json()
    const alumnoCreado = data.alumnoNuevo || data.alumno // según tu backend

    cardContainer3.innerHTML = `
      <div class="card">
        <p>LEGAJO: ${alumnoCreado.legajo}</p>
        <p>NOMBRE: ${alumnoCreado.nombre}</p>
        <p>APELLIDO: ${alumnoCreado.apellido}</p>
        <p>EMAIL: ${alumnoCreado.email}</p>
        <p>FECHA ALTA: ${alumnoCreado.fechaAlta}</p>
        <p>MODIFICACION: ${alumnoCreado.modificacion}</p>
        <p>IS ACTIVE: ${alumnoCreado.isActive}</p>
      </div>
    `
  } catch (error) {
    console.error("Error al agregar alumno:", error)
  }
}

async function modificarAlumno() {
  try {
    const legajo = inputLegajoM.value.trim()
    if (!legajo) return alert("Ingrese un legajo válido")

    const alumnoModificado = {}
    if (inputNombreM.value) alumnoModificado.nombre = inputNombreM.value.trim()
    if (inputApellidoM.value) alumnoModificado.apellido = inputApellidoM.value.trim()
    if (inputEmailM.value) alumnoModificado.email = inputEmailM.value.trim()
    if (inputIsActiveM.value) alumnoModificado.isActive = (inputIsActiveM.value.trim().toLowerCase() === "true")

    const response = await fetch(`https://tp4-nodejs-g2.onrender.com/alumnos/${legajo}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumnoModificado)
    })

    const data = await response.json()
    const alumnoActualizado = data.alumnoModificado || data.alumno

    cardContainer4.innerHTML = `
      <div class="card">
        <p>LEGAJO: ${alumnoActualizado.legajo}</p>
        <p>NOMBRE: ${alumnoActualizado.nombre}</p>
        <p>APELLIDO: ${alumnoActualizado.apellido}</p>
        <p>EMAIL: ${alumnoActualizado.email}</p>
        <p>FECHA ALTA: ${alumnoActualizado.fechaAlta}</p>
        <p>MODIFICACION: ${alumnoActualizado.modificacion}</p>
        <p>IS ACTIVE: ${alumnoActualizado.isActive}</p>
      </div>
    `
  } catch (error) {
    console.error("Error al modificar alumno:", error)
  }
}

async function eliminarAlumnoPorLegajo() {
  try {
    const legajo = inputLegajoE.value.trim()
    if (!legajo) return alert("Ingrese un legajo válido")

    const response = await fetch(`https://tp4-nodejs-g2.onrender.com/alumnos/${legajo}`, {
      method: 'DELETE'
    })

    const data = await response.json()
    cardContainer5.innerHTML = `
      <p style="color:green;">${data.msg}</p>
      <div class="card">
        <p>LEGAJO: ${data.alumno.legajo}</p>
        <p>NOMBRE: ${data.alumno.nombre}</p>
        <p>APELLIDO: ${data.alumno.apellido}</p>
        <p>EMAIL: ${data.alumno.email}</p>
        <p>FECHA ALTA: ${data.alumno.fechaAlta}</p>
        <p>MODIFICACION: ${data.alumno.modificacion}</p>
        <p>IS ACTIVE: ${data.alumno.isActive}</p>
      </div>
    `
  } catch (error) {
    console.error("Error al eliminar alumno:", error)
  }
}

btnAlumnos.addEventListener('click', cargarTodosAlumnos)
btnAlumnoLegajo.addEventListener('click', cargarAlumnoPorLegajo)
btnAlumnoNuevo.addEventListener('click', agregarAlumno)
btnAlumnoModificado.addEventListener('click', modificarAlumno)
btnAlumnoEliminar.addEventListener('click', eliminarAlumnoPorLegajo)
