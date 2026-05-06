document.addEventListener("DOMContentLoaded", function () {
    
    // 1. RELOJ EN TIEMPO REAL
    function runLiveClock() {
        const now = new Date();
        
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
        let seconds = String(now.getSeconds()).padStart(2, '0');
        
        document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
        document.getElementById('current-day').textContent = String(now.getDate()).padStart(2, '0');
        
        const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        const diasSemana = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
        
        document.getElementById('current-month').textContent = meses[now.getMonth()];
        document.getElementById('current-week').textContent = diasSemana[now.getDay()];
    }
    
    setInterval(runLiveClock, 1000);
    runLiveClock(); 

    // 2. DESPLEGABLE DEL CATÁLOGO
    const btnToggle = document.getElementById('btn-toggle-gallery');
    const galleryTarget = document.getElementById('gallery-target');

    btnToggle.addEventListener('click', function () {
        btnToggle.classList.toggle('active');
        galleryTarget.classList.toggle('hidden');
        
        if(!galleryTarget.classList.contains('hidden')) {
            setTimeout(() => {
                galleryTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    });

   
    // 4. ENVÍO DE FORMULARIO A WHATSAPP
    const form = document.getElementById('whatsapp-form');
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Número de destino (Código de país + área + número sin 0 ni 15)
        const numeroDestino = "543424231853"; 

        const nombre = document.getElementById('form-name').value.toUpperCase();
        const servicio = document.getElementById('form-service').value;
        const fechaRaw = document.getElementById('form-date').value;
        const hora = document.getElementById('form-time').value;

        const arrayFecha = fechaRaw.split('-');
        const fechaFormateada = `${arrayFecha[2]}/${arrayFecha[1]}/${arrayFecha[0]}`;

        const mensajeWhatsApp = `Hola Barbería Demo, quiero confirmar un turno:\n\n` +
                                `• *Cliente:* ${nombre}\n` +
                                `• *Servicio:* ${servicio}\n` +
                                `• *Fecha:* ${fechaFormateada}\n` +
                                `• *Hora:* ${hora}\n\n` +
                                `_Reserva Web_`;

        const urlFinal = `https://api.whatsapp.com/send?phone=${numeroDestino}&text=${encodeURIComponent(mensajeWhatsApp)}`;
        
        window.open(urlFinal, '_blank');
    });
});
