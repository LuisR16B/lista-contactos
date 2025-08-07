/*
  2) Crea un programa que permita al usuario realizar búsquedas en una lista de contactos.
  La lista debe contener al menos 5 contactos con nombre y número de teléfono. El usuario
  debe poder buscar por nombre y mostrar los resultados en pantalla.
*/

//array para guardar los contactos
let contactos = [
  { nombre: 'Luis', apellido: 'Rojas',telefono: '04247849209' },
  { nombre: 'Maria', apellido: 'Gonzalez', telefono: '04146543231' },
  { nombre: 'Pedro', apellido: 'Martinez', telefono: '04166789123' },
  { nombre: 'Ana', apellido: 'Lopez', telefono: '04261654987' },
  { nombre: 'Juan', apellido: 'Perez', telefono: '04249753486' },
];
let idContacto = 0;
const divContactos = document.getElementById('contactos');
const verContactos = document.getElementById('verContactos');
const agregarContactos = document.getElementById('agregarContactos');
const buscar = document.getElementById('buscar');
//boton para agregar contactos
document.getElementById('btnAgregar').addEventListener('click', () => {
  document.getElementById('btnAgregar').classList.remove('border-gray-400', 'border-b-1');
  document.getElementById('btnAgregar').classList.add('border-blue-600', 'border-b-3');
  document.getElementById('btnVer').classList.remove('border-blue-600', 'border-b-3');
  document.getElementById('btnVer').classList.add('border-gray-400', 'border-b-1');
  agregarContactos.classList.add('block');
  agregarContactos.classList.remove('hidden');
  verContactos.classList.add('hidden');
  verContactos.classList.remove('block');

});
// boton para ver contactos
document.getElementById('btnVer').addEventListener('click', () => {
  document.getElementById('btnVer').classList.remove('border-gray-400', 'border-b-1');
  document.getElementById('btnVer').classList.add('border-blue-600', 'border-b-3');
  document.getElementById('btnAgregar').classList.remove('border-blue-600', 'border-b-3');
  document.getElementById('btnAgregar').classList.add('border-gray-400', 'border-b-1');
  verContactos.classList.add('block');
  verContactos.classList.remove('hidden');
  agregarContactos.classList.add('hidden');
  agregarContactos.classList.remove('block');
  divContactos.innerHTML = '';
  cargarContactos(contactos);
  if (contactos.length === 0) {
    document.getElementById('sinContactos').classList.remove('hidden');
    document.getElementById('sinContactos').classList.add('flex');
  }else {
    document.getElementById('sinContactos').classList.add('hidden');
    document.getElementById('sinContactos').classList.remove('flex');
  }
});
// boton para buscar contactos
buscar.addEventListener('input', () => {
  const valorBusqueda = buscar.value.toLowerCase();
  const contactosFiltrados = contactos.filter(contacto =>
    contacto.nombre.toLowerCase().includes(valorBusqueda) || contacto.apellido.toLowerCase().includes(valorBusqueda) || contacto.telefono.includes(valorBusqueda)
  );
  divContactos.innerHTML = '';
  cargarContactos(contactosFiltrados);
});
// evento para agregar contacto
document.getElementById('formAgregar').addEventListener('submit', (event) => {
  agregarContacto(event);
});
// funcion para agregar contacto
function agregarContacto(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const telefono = document.getElementById('telefono').value;
  if (nombre && apellido && telefono) {
    contactos.push({ nombre, apellido, telefono });
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('telefono').value = '';
  }else {
    alert('Por favor, completa todos los campos.');
  }
}
// funcion para cargar los contactos en el div
function cargarContactos(contactos) {
  contactos.forEach(contacto => {
    let divContacto = document.createElement('div');
    divContacto.className = 'rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow duration-300';
    divContacto.id = `${idContacto++}`;
    let divDatos = document.createElement('div');
    divDatos.className = 'flex flex-col gap-1';
    let p = document.createElement('p');
    p.className = 'text-gray-700 font-semibold';
    p.textContent = `${contacto.nombre} ${contacto.apellido}`;
    let spanTelefono = document.createElement('span');
    spanTelefono.className = 'text-gray-500';
    spanTelefono.textContent = `${contacto.telefono}`;
    divDatos.appendChild(p);
    divDatos.appendChild(spanTelefono);
    const eliminar = document.createElement('button');
    eliminar.className = 'bg-red-400 text-white p-2 rounded-lg hover:bg-red-500';
    eliminar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
    //evento para eliminar un contacto
    eliminar.addEventListener('click', () => {
      const indexContacto = contactos.findIndex(contactoEliminar => contactoEliminar.nombre === contacto.nombre && contactoEliminar.apellido === contacto.apellido && contactoEliminar.telefono === contacto.telefono);
      contactos.splice(indexContacto, 1);
      divContacto.remove();
      if (contactos.length === 0) {
        document.getElementById('sinContactos').classList.add('flex');
        document.getElementById('sinContactos').classList.remove('hidden');
      }
    });

    divContacto.appendChild(divDatos);
    divContacto.appendChild(eliminar);
    divContactos.appendChild(divContacto);
  });
}