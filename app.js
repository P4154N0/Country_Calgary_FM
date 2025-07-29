// Obtiene referencias a los elementos del DOM
const stationSelect = document.getElementById('stationSelect');
const radioPlayerAudio = document.getElementById('radioPlayerAudio'); // Elemento de audio para streams directos
const radioPlayerIframe = document.getElementById('radioPlayerIframe'); // Iframe para reproductores web incrustados
const errorMsg = document.getElementById('errorMsg');

/**
 * Reproduce el stream de audio o carga el reproductor web de la URL proporcionada.
 * Maneja errores en caso de que la reproducción falle.
 * @param {string} url - La URL del stream de radio o del reproductor web.
 */
function playStream(url) {
    errorMsg.style.display = 'none'; // Oculta cualquier mensaje de error anterior
    errorMsg.textContent = ''; // Limpia el texto del error

    // Ocultar ambos reproductores al inicio de cada intento de reproducción
    radioPlayerAudio.style.display = 'none';
    radioPlayerIframe.style.display = 'none';
    radioPlayerAudio.pause(); // Asegurarse de pausar el audio si estaba reproduciendo
    radioPlayerAudio.src = ''; // Limpiar la fuente del audio
    radioPlayerIframe.src = ''; // Limpiar la fuente del iframe

    // Determinar si la URL es un reproductor de iframe o un stream de audio directo
    if (url.includes('playerID=')) { // Asumimos que URLs con 'playerID=' son reproductores para iframe
        radioPlayerIframe.src = url; // Establecer la URL en el iframe
        radioPlayerIframe.style.display = 'block'; // Mostrar el iframe
        console.log('Cargando reproductor de iframe:', url);

        // NOTA: Para reproductores de iframe, el usuario generalmente debe hacer clic en el botón de Play DENTRO del iframe.
        // No podemos controlarlo directamente desde JavaScript externo.
    } else { // Asumimos que es un stream de audio directo (ej. .aac, .mp3)
        radioPlayerAudio.src = url;
        radioPlayerAudio.load(); // Vuelve a cargar el stream
        
        radioPlayerAudio.style.display = 'block'; // Mostrar el elemento de audio

        const playPromise = radioPlayerAudio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // La reproducción comenzó con éxito
                console.log('Reproduciendo audio stream:', url);
            }).catch(error => {
                // La reproducción falló
                console.error('Error al intentar reproducir el stream de audio:', error);
                let errorMessage = 'Error al reproducir esta emisora. Probá con otra.';

                // Mensajes de error más específicos basados en el tipo de error
                if (error.name === 'NotAllowedError') {
                    errorMessage = 'La reproducción automática fue bloqueada. Hacé clic en "Play" en el reproductor.';
                } else if (error.name === 'NotSupportedError') {
                    errorMessage = 'Formato de audio no soportado o stream inaccesible. Probá con otra emisora.';
                } else if (error.message.includes('network') || error.message.includes('HTTP')) {
                    errorMessage = 'Problema de red o stream caído. Verificá tu conexión o probá más tarde.';
                }

                errorMsg.textContent = errorMessage;
                errorMsg.style.display = 'block';
                radioPlayerAudio.pause(); // Asegúrate de que no intente reproducir
            });
        }

        // Añade un event listener para el evento 'error' del elemento de audio
        // Esto captura errores que ocurren DESPUÉS de un intento de play inicial
        radioPlayerAudio.addEventListener('error', (e) => {
            console.error('Evento de error del audio:', e);
            let audioErrorMessage = 'Hubo un error inesperado con el audio.';
            if (radioPlayerAudio.error) {
                switch (radioPlayerAudio.error.code) {
                    case radioPlayerAudio.error.MEDIA_ERR_ABORTED:
                        audioErrorMessage = 'La reproducción fue abortada.';
                        break;
                    case radioPlayerAudio.error.MEDIA_ERR_NETWORK:
                        audioErrorMessage = 'Error de red al descargar el audio.';
                        break;
                    case radioPlayerAudio.error.MEDIA_ERR_DECODE:
                        audioErrorMessage = 'Error al decodificar el audio.';
                        break;
                    case radioPlayerAudio.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        audioErrorMessage = 'El formato de la fuente de audio no es soportado.';
                        break;
                    default:
                        audioErrorMessage = 'Error de reproducción desconocido.';
                        break;
                }
            }
            errorMsg.textContent = audioErrorMessage;
            errorMsg.style.display = 'block';
            radioPlayerAudio.pause(); // Asegúrate de que no intente reproducir
        }, { once: true }); // Usamos { once: true } para que el listener se elimine después de activarse una vez
    }
}

// Añade un event listener para el evento 'change' en el selector de emisoras
stationSelect.addEventListener('change', () => {
    // Cuando el usuario selecciona una nueva emisora, reproduce su stream
    playStream(stationSelect.value);
    // Guarda la emisora seleccionada en localStorage para recordar la preferencia del usuario
    localStorage.setItem('selectedRadioStation', stationSelect.value);
});

// Carga inicial al cargar la página
window.addEventListener('load', () => {
    // Verifica si hay una emisora guardada en localStorage o usa la primera del select
    const savedStation = localStorage.getItem('selectedRadioStation');
    if (savedStation) {
        stationSelect.value = savedStation;
    }
    // Reproduce el stream de la emisora seleccionada (o la guardada)
    playStream(stationSelect.value);
});

// Nota sobre la reproducción automática: Los navegadores modernos a menudo bloquean la reproducción
// automática de audio/video sin interacción del usuario. Si la radio no empieza a sonar
// automáticamente, el usuario deberá hacer clic en el botón de play del reproductor.
