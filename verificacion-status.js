/**
 * Sistema de verificación automática del estatus de permisos
 * Agregué esta funcionalidad para que automáticamente cambie el estado del permiso
 * cuando pase la fecha de vigencia, sin necesidad de intervención manual.
 */
function verificarEstatusPermiso() {
    // Agregué esta función para verificar automáticamente si el permiso está vencido
    // basándome en la fecha de vigencia que aparece en el documento
    
    const elementoEstatus = document.getElementById('estatus-permiso');
    const elementoFechaVigencia = document.getElementById('fecha-vigencia');
    
    if (!elementoEstatus || !elementoFechaVigencia) {
        console.log('No se encontraron los elementos necesarios (estatus o fecha de vigencia)');
        return;
    }
    
    const fechaVigenciaTexto = elementoFechaVigencia.textContent.trim();
    
    if (!fechaVigenciaTexto.match(/^\d{4}-\d{2}-\d{2}$/)) {
        console.log('Formato de fecha de vigencia no válido:', fechaVigenciaTexto);
        return;
    }
    
    // Convierto las fechas para poder compararlas
    const fechaVigencia = new Date(fechaVigenciaTexto);
    const fechaActual = new Date();
    
    // Tuve que ajustar las fechas para comparar solo el día, sin horas
    // porque necesito que el cambio sea exacto al día siguiente de vencimiento
    fechaVigencia.setHours(23, 59, 59, 999);
    fechaActual.setHours(0, 0, 0, 0);
    
    console.log('Fecha de vigencia:', fechaVigencia);
    console.log('Fecha actual:', fechaActual);
    console.log('¿Está vencido?', fechaActual > fechaVigencia);
    
    // Si la fecha actual es mayor que la fecha de vigencia, cambio el estatus
    if (fechaActual > fechaVigencia) {
        if (elementoEstatus.textContent.trim() === 'ACTIVA') {
            // Cambio la clase CSS y el texto cuando el permiso está vencido
            // tuve que usar replace para cambiar solo la clase específica
            elementoEstatus.className = elementoEstatus.className.replace('text-green-custom', 'text-red-custom');
            elementoEstatus.textContent = 'VENCIDO';
            
            console.log('Estatus cambiado a VENCIDO');
        }
    } else {
        console.log('El permiso sigue activo');
    }
}

/**
 * Función para agregar los estilos CSS necesarios
 * Agregué esta función porque necesitaba definir la clase text-red-custom
 * que no existía en los estilos originales del documento
 */
function agregarEstilosCustom() {
    // Verifico si ya existe el estilo para evitar duplicados
    if (document.getElementById('estilos-verificacion-status')) {
        return;
    }
    
    const estilos = document.createElement('style');
    estilos.id = 'estilos-verificacion-status';
    estilos.textContent = `
        /* Agregué estos estilos para manejar los diferentes estados del permiso */
        .text-red-custom {
            color: #dc2626 !important; /* Color rojo para permisos vencidos */
            font-weight: bold;
        }
        
        .text-green-custom {
            color: #16a34a !important; /* Color verde para permisos activos */
            font-weight: bold;
        }
    `;
    
    document.head.appendChild(estilos);
    console.log('Estilos CSS agregados correctamente');
}


/**
 * Función de inicialización
 * Se ejecuta cuando el DOM está completamente cargado
 */
function inicializarVerificacion() {
    console.log('Inicializando sistema de verificación de estatus...');
    
    // Primero agrego los estilos CSS necesarios
    agregarEstilosCustom();
    
    // Luego verifico el estatus del permiso
    verificarEstatusPermiso();
    
    console.log('Sistema de verificación inicializado correctamente');
}

// Ejecuto la verificación cuando se carga la página
// Agregué diferentes eventos para asegurarme de que funcione en todos los casos
document.addEventListener('DOMContentLoaded', inicializarVerificacion);

// También verifico si el documento ya está cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarVerificacion);
} else {
    // El DOM ya está cargado, ejecuto inmediatamente
    inicializarVerificacion();
}

// Agregué esta verificación adicional para asegurarme de que funcione
// incluso si hay algún framework JavaScript que modifique el DOM después
setTimeout(inicializarVerificacion, 100);