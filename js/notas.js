const cardContainerNotas = document.querySelector('#card-container-notas')
const btnNotas = document.querySelector('#btn-notas')

const cardContainerNotaId = document.querySelector('#card-container-nota-id')
const btnNotaId = document.querySelector('#btn-nota-id')
const inputIdNotaBuscar = document.querySelector('#input-idNotaBuscar')

const cardContainerNotaNueva = document.querySelector('#card-container-nota-nueva')
const btnNotaNueva = document.querySelector('#btn-nota-nueva')
const inputLegajoNota = document.querySelector('#input-legajoNota')
const inputIdMateriaNota = document.querySelector('#input-idMateriaNota')
const inputNotaValor = document.querySelector('#input-notaValor')

const cardContainerNotaModificar = document.querySelector('#card-container-nota-modificar')
const btnNotaModificar = document.querySelector('#btn-nota-modificar')
const inputIdNotaM = document.querySelector('#input-idNotaM')
const inputIdMateriaNotaM = document.querySelector('#input-idMateriaNotaM')
const inputNotaValorM = document.querySelector('#input-notaValorM')

const cardContainerNotaEliminar = document.querySelector('#card-container-nota-eliminar')
const btnNotaEliminar = document.querySelector('#btn-nota-eliminar')
const inputIdNotaE = document.querySelector('#input-idNotaE')

async function cargarTodasNotas() {
  try {
    const response = await fetch('https://tp4-nodejs-g2.onrender.com/notas')
    const data = await response.json()

    cardContainerNotas.innerHTML = ''
    data.forEach(nota => {
      const div = document.createElement('div')
      div.classList.add('card')
      div.innerHTML = `
        <p>ID: ${nota.id}</p>
        <p>LEGAJO: ${nota.legajo}</p>
        <p>MATERIA: ${nota.idMateria}</p>
        <p>NOTA: ${nota.nota}</p>
        <p>FECHA: ${nota.fecha}</p>
        <br>
      `
      cardContainerNotas.append(div)
    })
  } catch (error) {
    console.error("Error al cargar notas:", error)
  }
}

async function cargarNotaPorId() {
  try {
    const id = inputIdNotaBuscar.value.trim()
    if (!id) return alert("Ingrese un ID válido")

    const response = await fetch(`https://tp4-nodejs-g2.onrender.com/notas/${id}`)
    if (!response.ok) throw new Error(`Nota con ID ${id} no encontrada`)

    const nota = await response.json()
    cardContainerNotaId.innerHTML = `
      <div class="card">
        <p>ID: ${nota.id}</p>
        <p>LEGAJO: ${nota.legajo}</p>
        <p>MATERIA: ${nota.idMateria}</p>
        <p>NOTA: ${nota.nota}</p>
        <p>FECHA: ${nota.fecha}</p>
      </div>
    `
  } catch (error) {
    console.error("Error al cargar nota por ID:", error)
  }
}

async function agregarNota() {
  try {
    const legajo = inputLegajoNota.value.trim()
    const idMateria = inputIdMateriaNota.value.trim()
    const nota = inputNotaValor.value.trim()

    if (!legajo || !idMateria || !nota) {
      return alert("Complete todos los campos obligatorios (legajo, materia, nota)")
    }

    const nuevaNota = {
      legajo: Number(legajo),
      idMateria,
      nota: Number(nota),
      fecha: new Date().toLocaleDateString('es-AR') // fecha automática
    }

    const response = await fetch('https://tp4-nodejs-g2.onrender.com/notas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaNota)
    })

    const data = await response.json()
    const notaCreada = data.notaNueva || data.nota

    cardContainerNotaNueva.innerHTML = `
      <p style="color:green;">Nota creada correctamente</p>
      <div class="card">
        <p>ID: ${notaCreada.id}</p>
        <p>LEGAJO: ${notaCreada.legajo}</p>
        <p>MATERIA: ${notaCreada.idMateria}</p>
        <p>NOTA: ${notaCreada.nota}</p>
        <p>FECHA: ${notaCreada.fecha}</p>
      </div>
    `
  } catch (error) {
    console.error("Error al crear nota:", error)
  }
}

async function modificarNota() {
  try {
    const id = inputIdNotaM.value.trim()
    if (!id) return alert("Ingrese un ID válido")

    const notaModificada = {}
    if (inputIdMateriaNotaM.value) notaModificada.idMateria = inputIdMateriaNotaM.value.trim()
    if (inputNotaValorM.value) notaModificada.nota = Number(inputNotaValorM.value.trim())

    const response = await fetch(`https://tp4-nodejs-g2.onrender.com/notas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notaModificada)
    })

    const data = await response.json()
    const notaActualizada = data.notaModificada || data.nota

    cardContainerNotaModificar.innerHTML = `
      <p style="color:blue;">Nota modificada correctamente</p>
      <div class="card">
        <p>ID: ${notaActualizada.id}</p>
        <p>LEGAJO: ${notaActualizada.legajo}</p>
        <p>MATERIA: ${notaActualizada.idMateria}</p>
        <p>NOTA: ${notaActualizada.nota}</p>
        <p>FECHA: ${notaActualizada.fecha}</p>
      </div>
    `
  } catch (error) {
    console.error("Error al modificar nota:", error)
  }
}

async function eliminarNota() {
  try {
    const id = inputIdNotaE.value.trim()
    if (!id) return alert("Ingrese un ID válido")

    const response = await fetch(`https://tp4-nodejs-g2.onrender.com/notas/${id}`, {
      method: 'DELETE'
    })

    const data = await response.json()
    cardContainerNotaEliminar.innerHTML = `
      <p style="color:red;">${data.msg}</p>
      ${data.nota ? `
      <div class="card">
        <p>ID: ${data.nota.id}</p>
        <p>LEGAJO: ${data.nota.legajo}</p>
        <p>MATERIA: ${data.nota.idMateria}</p>
        <p>NOTA: ${data.nota.nota}</p>
        <p>FECHA: ${data.nota.fecha}</p>
      </div>` : ''}
    `
  } catch (error) {
    console.error("Error al eliminar nota:", error)
  }
}

btnNotas.addEventListener('click', cargarTodasNotas)
btnNotaId.addEventListener('click', cargarNotaPorId)
btnNotaNueva.addEventListener('click', agregarNota)
btnNotaModificar.addEventListener('click', modificarNota)
btnNotaEliminar.addEventListener('click', eliminarNota)
