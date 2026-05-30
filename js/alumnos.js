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
const cardContainer4 =document.querySelector('#card-container-modificar')
const inputLegajoM = document.querySelector('#input-legajoM')
const inputNombreM = document.querySelector('#input-nombreM')
const inputApellidoM = document.querySelector('#input-apellidoM')
const inputEmailM = document.querySelector('#input-emailM')
const inputIsActiveM = document.querySelector('#input-isActiveM')
const btnAlumnoModificado = document.querySelector('#btn-alumno-modificar')
const cardContainer5 = document.querySelector('#card-container-eliminar')
const btnAlumnoliminar = document.querySelector('#btn-alumno-eliminar')
const inputLegajoE = document.querySelector('#input-legajoE')

async function cargarTodosAlumnos() {
  try {
    const response = await fetch('https://tp4-nodejs-g2.onrender.com/alumnos')
    const data = await response.json()
    console.log(response)
    console.log(data)

    cardContainer.innerHTML = '' 
    data.forEach((alumno) => {
      const div = document.createElement('div')
      div.classList.add('card')

      div.innerHTML = `
        <div class="card-legajo"> <p>"LEGAJO": ${alumno.legajo}</p></div>
        <div class="card-nombre"><p>"NOMBRE": ${alumno.nombre}</p></div>
        <div class="card-apellido"><p>"APELLIDO":${alumno.apellido}</p></div>
        <div class="card-email"><p>"EMAIL": ${alumno.email}</p></div>
        <div class="card-fechaAlta"><p>"FECHA ALTA": ${alumno.fechaAlta}</p></div>
        <div class="card-modificacion"><p>"MODIFICACION": ${alumno.modificacion}</p></div>
        <div class="card-isActive"><p>"IS ACTIVE": ${alumno.isActive}</p></div>
        <br>
      `
      cardContainer.append(div)
    })
  } catch (error) {
    console.log(
      `Error, no se pudieron traer los datos de los alumnos. ${error}`
    )
  }
}

async function cargarAlumnoPorLegajo() {
  try {
    const legajo = inputLegajo.value.trim()
    if (!legajo) {
      alert("Ingrese un legajo válido")
      return
    }

    const response = await fetch(`https://tp4-nodejs-g2.onrender.com/alumnos/${legajo}`)
    if (!response.ok) {
      throw new Error(`Alumno con legajo ${legajo} no encontrado`)
    }

    const alumno = await response.json()

    cardContainer2.innerHTML = `
      <div class="card">
        <div class="card-legajo"><p>"LEGAJO": ${alumno.legajo}</p></div>
        <div class="card-nombre"><p>"NOMBRE": ${alumno.nombre}</p></div>
        <div class="card-apellido"><p>"APELLIDO": ${alumno.apellido}</p></div>
        <div class="card-email"><p>"EMAIL": ${alumno.email}</p></div>
        <div class="card-fechaAlta"><p>"FECHA ALTA": ${alumno.fechaAlta}</p></div>
        <div class="card-modificacion"><p>"MODIFICACION": ${alumno.modificacion}</p></div>
        <div class="card-isActive"><p>"IS ACTIVE": ${alumno.isActive}</p></div>
      </div>
    `
  } catch (error) {
    console.log(
      `Error, no se pudieron traer los datos de los alumnos. ${error}`
    )
  }
}

async function agregarAlumno() {
  try {
    const nombre = inputNombre.value.trim()
    const apellido = inputApellido.value.trim()
    const email = inputEmail.value.trim()

    if (!nombre || !apellido || !email) {
      alert("Complete todos los campos antes de agregar el alumno")
      return
    }

    const nuevoAlumno = { nombre, apellido, email }

    const response = await fetch('https://tp4-nodejs-g2.onrender.com/alumnos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoAlumno)
    })

    if (!response.ok) {
      throw new Error("Error al agregar el alumno")
    }

    const alumnoCreado = await response.json()

    cardContainer3.innerHTML = `
      <div class="card">
        <div class="card-legajo"><p>"LEGAJO": ${alumnoCreado.alumnoNuevo.legajo}</p></div>
        <div class="card-nombre"><p>"NOMBRE": ${alumnoCreado.alumnoNuevo.nombre}</p></div>
        <div class="card-apellido"><p>"APELLIDO": ${alumnoCreado.alumnoNuevo.apellido}</p></div>
        <div class="card-email"><p>"EMAIL": ${alumnoCreado.alumnoNuevo.email}</p></div>
        <div class="card-fechaAlta"><p>"FECHA ALTA": ${alumnoCreado.alumnoNuevo.fechaAlta}</p></div>
        <div class="card-modificacion"><p>"MODIFICACION": ${alumnoCreado.alumnoNuevo.modificacion}</p></div>
        <div class="card-isActive"><p>"IS ACTIVE": ${alumnoCreado.alumnoNuevo.isActive}</p></div>
      </div>
    `
  } catch (error) {
    console.log(
      `Error, no se pudieron enviar los datos del alumno. ${error}`
    )
  }
}

async function modificarAlumno() {
  try {
    const legajo = inputLegajoM.value.trim()
    const nombre = inputNombreM.value.trim()
    const apellido = inputApellidoM.value.trim()
    const email = inputEmailM.value.trim()
    const isActive = inputIsActiveM.value.trim()

    if (!legajo) {
      alert("Ingrese un legajo válido para modificar")
      return
    }

    const alumnoModificado = {}
    if (nombre) alumnoModificado.nombre = nombre
    if (apellido) alumnoModificado.apellido = apellido
    if (email) alumnoModificado.email = email
    if (isActive) alumnoModificado.isActive = (isActive.toLowerCase() === "true")

    const response = await fetch(`https://tp4-nodejs-g2.onrender.com/alumnos/${legajo}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumnoModificado)
    })

    if (!response.ok) {
      throw new Error(`Error al modificar el alumno con legajo ${legajo}`)
    }

    const data = await response.json()
    const alumnoActualizado = data.alumnoModificado
    console.log(alumnoActualizado) 

    cardContainer4.innerHTML = `
      <div class="card">
        <div class="card-legajo"><p>"LEGAJO": ${alumnoActualizado.legajo}</p></div>
        <div class="card-nombre"><p>"NOMBRE": ${alumnoActualizado.nombre}</p></div>
        <div class="card-apellido"><p>"APELLIDO": ${alumnoActualizado.apellido}</p></div>
        <div class="card-email"><p>"EMAIL": ${alumnoActualizado.email}</p></div>
        <div class="card-fechaAlta"><p>"FECHA ALTA": ${alumnoActualizado.fechaAlta}</p></div>
        <div class="card-modificacion"><p>"MODIFICACION": ${alumnoActualizado.modificacion}</p></div>
        <div class="card-isActive"><p>"IS ACTIVE": ${alumnoActualizado.isActive}</p></div>
      </div>
    `
  } catch (error) {
    console.log(`Error, no se pudieron modificar los datos del alumno. ${error}`)
  }
}

async function eliminarAlumnoPorLegajo() {
  try {
    const legajo = inputLegajoE.value.trim()
    if (!legajo) {
      alert("Ingrese un legajo válido para eliminar")
      return
    }

    const response = await fetch(`https://tp4-nodejs-g2.onrender.com/alumnos/${legajo}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error(`Error al eliminar el alumno con legajo ${legajo}`)
    }

    const data = await response.json()
    console.log(data)

    cardContainer5.innerHTML = `
        <p style="color:green;">${data.msg}</p>
        <div class="card">
        <div class="card-legajo"><p>"LEGAJO": ${data.alumno.legajo}</p></div>
        <div class="card-nombre"><p>"NOMBRE": ${data.alumno.nombre}</p></div>
        <div class="card-apellido"><p>"APELLIDO": ${data.alumno.apellido}</p></div>
        <div class="card-email"><p>"EMAIL": ${data.alumno.email}</p></div>
        <div class="card-fechaAlta"><p>"FECHA ALTA": ${data.alumno.fechaAlta}</p></div>
        <div class="card-modificacion"><p>"MODIFICACION": ${data.alumno.modificacion}</p></div>
        <div class="card-isActive"><p>"IS ACTIVE": ${data.alumno.isActive}</p></div>
      </div>
    `
  } catch (error) {
    console.log(`Error, no se pudo eliminar el alumno. ${error}`)
  }
}


btnAlumnos.addEventListener('click', cargarTodosAlumnos)
btnAlumnoLegajo.addEventListener('click', cargarAlumnoPorLegajo)
btnAlumnoNuevo.addEventListener('click', agregarAlumno)
btnAlumnoModificado.addEventListener('click', modificarAlumno)
btnAlumnoliminar.addEventListener('click', eliminarAlumnoPorLegajo)
