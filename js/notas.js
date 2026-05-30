const cardContainerNotas = document.querySelector('#card-container-notas')
const btnNotas = document.querySelector('#btn-notas')

const cardContainerNotaLegajo = document.querySelector('#card-container-nota-legajo')
const btnNotaLegajo = document.querySelector('#btn-nota-legajo')
const inputLegajoN = document.querySelector('#input-legajoN')

const cardContainerNotaNueva = document.querySelector('#card-container-nota-nueva')
const btnNotaNueva = document.querySelector('#btn-nota-nueva')
const inputIdNota = document.querySelector('#input-idNota')
const inputLegajoNota = document.querySelector('#input-legajoNota')
const inputIdMateriaNota = document.querySelector('#input-idMateriaNota')
const inputNotaValor = document.querySelector('#input-notaValor')
const inputFechaNota = document.querySelector('#input-fechaNota')

const cardContainerNotaModificar = document.querySelector('#card-container-nota-modificar')
const btnNotaModificar = document.querySelector('#btn-nota-modificar')
const inputIdNotaM = document.querySelector('#input-idNotaM')
const inputLegajoNotaM = document.querySelector('#input-legajoNotaM')
const inputIdMateriaNotaM = document.querySelector('#input-idMateriaNotaM')
const inputNotaValorM = document.querySelector('#input-notaValorM')
const inputFechaNotaM = document.querySelector('#input-fechaNotaM')

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
      `
      cardContainerNotas.append(div)
    })
  } catch (error) {
    console.error("Error al cargar notas:", error)
  }
}

async function cargarNotasPorLegajo() {
  try {
    const legajo = inputLegajoN.value.trim()
    if (!legajo) return alert("Ingrese un legajo válido")

    const response = await fetch(`https://tp4-nodejs-g2.onrender.com/notas/${legajo}`)
    if (!response.ok) throw new Error(`Notas del legajo ${legajo} no encontradas`)

    const notas = await response.json()
    const lista = Array.isArray(notas) ? notas : [notas]

    cardContainerNotaLegajo.innerHTML = ''
    lista.forEach(nota => {
      cardContainerNotaLegajo.innerHTML += `
        <div class="card">
          <p>ID: ${nota.id}</p>
          <p>MATERIA: ${nota.idMateria}</p>
          <p>NOTA: ${nota.nota}</p>
          <p>FECHA: ${nota.fecha}</p>
        </div>
      `
    })
  } catch (error) {
    console.error("Error al cargar notas por legajo:", error)
  }
}

async function agregarNota() {
  try {
    const nuevaNota = {
      id: Number(inputIdNota.value.trim()),
      legajo: Number(inputLegajoNota.value.trim()),
      idMateria: inputIdMateriaNota.value.trim(),
      nota: Number(inputNotaValor.value.trim()),
      fecha: inputFechaNota.value.trim()
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
    if (inputLegajoNotaM.value) notaModificada.legajo = Number(inputLegajoNotaM.value.trim())
    if (inputIdMateriaNotaM.value) notaModificada.idMateria = inputIdMateriaNotaM.value.trim()
    if (inputNotaValorM.value) notaModificada.nota = Number(inputNotaValorM.value.trim())
    if (inputFechaNotaM.value) notaModificada.fecha = inputFechaNotaM.value.trim()

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
btnNotaLegajo.addEventListener('click', cargarNotasPorLegajo)
btnNotaNueva.addEventListener('click', agregarNota)
btnNotaModificar.addEventListener('click', modificarNota)
btnNotaEliminar.addEventListener('click', eliminarNota)
