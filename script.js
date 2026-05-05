document.addEventListener("DOMContentLoaded", function () {
    
    // 1. REFRESCAR RELOJ DINÁMICO CADA SEGUNDO
    function runLiveClock() {
        const now = new Date();
        
        // Extraer y formatear las unidades de tiempo
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
        let seconds = String(now.getSeconds()).padStart(2, '0');
        
        // Inyectar en el HTML
        document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
        document.getElementById('current-day').textContent = String(now.getDate()).padStart(2, '0');
        
        // Traducciones de Meses y Días
        const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        const diasSemana = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
        
        document.getElementById('current-month').textContent = meses[now.getMonth()];
        document.getElementById('current-week').textContent = diasSemana[now.getDay()];
    }
    
    // Ejecutar el intervalo de tiempo activo
    setInterval(runLiveClock, 1000);
    runLiveClock(); // Ejecución instantánea inicial

    // 2. INTERRUPTOR DEL COLLAGE DESPLEGABLE
    const btnToggle = document.getElementById('btn-toggle-gallery');
    const galleryTarget = document.getElementById('gallery-target');

    btnToggle.addEventListener('click', function () {
        btnToggle.classList.toggle('active');
        galleryTarget.classList.toggle('hidden');
        
        // Auto-scroll suave para ver los cortes inmediatamente al desplegar
        if(!galleryTarget.classList.contains('hidden')) {
            setTimeout(() => {
                galleryTarget.scrollIntoView({ behavior: 'smooth' });
            }, 150);
        }
    });

    // 3. LOGICA DE ENVÍO AUTOMÁTICO A WHATSAPP
    const form = document.getElementById('whatsapp-form');
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Tu número celular configurado con código de área de Santa Fe (ej: 543424231853)
        const numeroDestino = "543424231853"; 

        const nombre = document.getElementById('form-name').value.toUpperCase();
        const servicio = document.getElementById('form-service').value;
        const fechaRaw = document.getElementById('form-date').value;
        const hora = document.getElementById('form-time').value;

        // Formatear fecha de AAAA-MM-DD a DD/MM/AAAA
        const arrayFecha = fechaRaw.split('-');
        const fechaFormateada = `${arrayFecha[2]}/${arrayFecha[1]}/${arrayFecha[0]}`;

        // Redacción limpia del mensaje
        const mensajeWhatsApp = `Hola Barbería Demo, quiero confirmar un turno desde la web:\n\n` +
                                `• *Cliente:* ${nombre}\n` +
                                `• *Servicio:* ${servicio}\n` +
                                `• *Fecha:* ${fechaFormateada}\n` +
                                `• *Hora:* ${hora}\n\n` +
                                `_Sistema de Reserva Premium_`;

        const urlFinal = `https://api.whatsapp.com/send?phone=${numeroDestino}&text=${encodeURIComponent(mensajeWhatsApp)}`;
        
        window.open(urlFinal, '_blank');
    });
});
