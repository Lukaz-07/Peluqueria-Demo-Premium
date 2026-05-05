document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. CONEXIÓN A GOOGLE SHEETS PARA LOS PRECIOS
    // =========================================================
    
    // Aquí irá el link de TU Google Sheet publicado como CSV. 
    // Por ahora uso un enlace vacío de ejemplo.
    const googleSheetCSV = "TU_ENLACE_AQUI_CUANDO_LO_TENGAS";
    const selectServicio = document.getElementById('servicio');

    // Datos de respaldo por si el Excel falla o aún no está configurado
    const serviciosDeRespaldo = [
        { nombre: "Corte Clásico", precio: "8.000" },
        { nombre: "Corte y Barba", precio: "12.000" },
        { nombre: "Perfilado", precio: "4.000" }
    ];

    function cargarServicios(datos) {
        selectServicio.innerHTML = '<option value="" disabled selected>Seleccioná un servicio</option>';
        datos.forEach(item => {
            const option = document.createElement('option');
            // El valor y el texto que verá el cliente
            option.value = item.nombre + " - $" + item.precio;
            option.textContent = item.nombre + " - $" + item.precio;
            selectServicio.appendChild(option);
        });
    }

    // Intentamos cargar desde el Excel
    fetch(googleSheetCSV)
        .then(response => {
            if (!response.ok) throw new Error("Falla al conectar con el Excel");
            return response.text();
        })
        .then(csvText => {
            // Convertimos el CSV a una lista de opciones
            const filas = csvText.split('\n').slice(1); // Ignoramos la cabecera
            const serviciosDesdeExcel = filas.map(fila => {
                const columnas = fila.split(',');
                return { nombre: columnas[0], precio: columnas[1] };
            }).filter(item => item.nombre && item.precio);
            
            cargarServicios(serviciosDesdeExcel);
        })
        .catch(error => {
            // Si hay error (o el link no está puesto), usamos los de respaldo
            console.log("Cargando precios por defecto...");
            cargarServicios(serviciosDeRespaldo);
        });

    // =========================================================
    // 2. ENVÍO DE RESERVA LÍMPIA A WHATSAPP
    // =========================================================
    
    document.getElementById('form-reserva').addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const servicio = document.getElementById('servicio').value;
        const fechaInput = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;

        // Formatear fecha
        const partes = fechaInput.split('-');
        const fechaFinal = partes[2] + "/" + partes[1] + "/" + partes[0];

        // Teléfono del cliente (el tuyo para la demo)
        const telLocal = "5493424231853";

        // Texto hiper limpio
        const mensaje = "NUEVA RESERVA PREMIUM\n\n" +
                        "Cliente: " + nombre + "\n" +
                        "Tel: " + whatsapp + "\n" +
                        "Servicio: " + servicio + "\n" +
                        "Fecha: " + fechaFinal + "\n" +
                        "Hora: " + hora + "\n\n" +
                        "Por favor confirmar disponibilidad.";

        const url = "https://wa.me/" + telLocal + "?text=" + encodeURIComponent(mensaje);
        window.open(url, '_blank');
    });
});
