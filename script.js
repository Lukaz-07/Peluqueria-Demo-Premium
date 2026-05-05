document.addEventListener("DOMContentLoaded", function () {
    
    // 1. RELOJ DINÁMICO (ESTILO TOKIO)
    function updateClock() {
        const now = new Date();
        
        // Formatear Hora
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
        let seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
        
        // Actualizar Día y Mes por si cambia de jornada
        document.getElementById('current-day').textContent = String(now.getDate()).padStart(2, '0');
        
        const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        document.getElementById('current-month').textContent = meses[now.getMonth()];
    }
    setInterval(updateClock, 1000);
    updateClock(); // Carga inicial

    // 2. DESPLEGABLE DE CORTES DE PELO (ANIMACIÓN)
    const btnToggle = document.getElementById('btn-toggle-gallery');
    const galleryTarget = document.getElementById('gallery-target');

    btnToggle.addEventListener('click', function () {
        btnToggle.classList.toggle('active');
        galleryTarget.classList.toggle('hidden');
    });

    // 3. ENVÍO DE RESERVA INTELIGENTE A WHATSAPP
    const form = document.getElementById('whatsapp-form');
    
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita que se recargue la web

        // Tu número de WhatsApp comercial (Reemplazar con el número real del local)
        const telefonoBarberia = "543425555555"; 

        // Captura de datos del formulario
        const nombre = document.getElementById('form-name').value.toUpperCase();
        const servicio = document.getElementById('form-service').value;
        const fechaInput = document.getElementById('form-date').value;
        const hora = document.getElementById('form-time').value;

        // Formatear fecha legible (DD/MM/AAAA)
        const partesFecha = fechaInput.split('-');
        const fechaFormateada = `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`;

        // Construcción del mensaje elegante
        const mensajeText = `Hola Barbería Demo, me gustaría reservar un turno:\n\n` +
                            `• *Cliente:* ${nombre}\n` +
                            `• *Servicio:* ${servicio}\n` +
                            `• *Fecha:* ${fechaFormateada}\n` +
                            `• *Hora:* ${hora}\n\n` +
                            `_Enviado desde el Sitio Premium._`;

        // Codificación para URL y redirección limpia
        const urlWhatsApp = `https://api.whatsapp.com/send?phone=${telefonoBarberia}&text=${encodeURIComponent(mensajeText)}`;
        
        window.open(urlWhatsApp, '_blank');
    });
});
