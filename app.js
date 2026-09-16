// Diccionario de traducciones ES / EN
const translations = {
    es: {
        subtitle: "La experiencia definitiva de radio country en Alberta, Canadá.",
        liveBroadcasting: "Transmisión en Vivo",
        selectStationLabel: "Selecciona tu emisora favorita",
        telemetryTarget: "DESTINO: Calgary, AB (Sector Energético)",
        footerConsole: "Consola / Portafolio",
        errorDefault: "Error al reproducir esta emisora. Probá con otra.",
        errorNotAllowed: "La reproducción automática fue bloqueada. Hacé clic en \"Play\" en el reproductor.",
        errorNotSupported: "Formato de audio no soportado o stream inaccesible. Probá con otra emisora.",
        errorNetwork: "Problema de red o stream caído. Verificá tu conexión o probá más tarde.",
        errorUnexpected: "Hubo un error inesperado con el audio.",
        errAborted: "La reproducción fue abortada.",
        errNetworkDownload: "Error de red al descargar el audio.",
        errDecode: "Error al decodificar el audio.",
        errSrcNotSupported: "El formato de la fuente de audio no es soportado.",
        errUnknown: "Error de reproducción desconocido."
    },
    en: {
        subtitle: "The Elite Country Radio Experience in Alberta, Canada.",
        liveBroadcasting: "Live Broadcasting",
        selectStationLabel: "Select your favorite station",
        telemetryTarget: "TARGET: Calgary, AB (Energy Sector)",
        footerConsole: "Console / Portfolio",
        errorDefault: "Error playing this station. Please try another one.",
        errorNotAllowed: "Autoplay was blocked. Click \"Play\" on the player.",
        errorNotSupported: "Audio format not supported or stream inaccessible. Try another station.",
        errorNetwork: "Network issue or stream down. Check your connection or try later.",
        errorUnexpected: "An unexpected audio error occurred.",
        errAborted: "Playback was aborted.",
        errNetworkDownload: "Network error while downloading audio.",
        errDecode: "Error decoding audio.",
        errSrcNotSupported: "The audio source format is not supported.",
        errUnknown: "Unknown playback error."
    }
};

// Estado actual del idioma (por defecto 'es' o recuperado de localStorage)
let currentLang = localStorage.getItem('appLanguage') || 'es';

// Elementos del DOM
const stationSelect = document.getElementById('stationSelect');
const radioPlayerAudio = document.getElementById('radioPlayerAudio');
const radioPlayerIframe = document.getElementById('radioPlayerIframe');
const errorMsg = document.getElementById('errorMsg');
const langToggleBtn = document.getElementById('langToggleBtn');
const langText = document.getElementById('langText');

/**
 * Aplica las traducciones a todos los elementos con el atributo [data-i18n]
 */
function updateLanguageUI() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });

    // Actualiza el texto del botón toggle (muestra el idioma opuesto al actual)
    langText.textContent = currentLang === 'es' ? 'EN' : 'ES';
    document.documentElement.setAttribute('lang', currentLang);
}

/**
 * Cambia el idioma actual y guarda la preferencia
 */
function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('appLanguage', currentLang);
    updateLanguageUI();

    // Si hay un mensaje de error visible, lo actualiza al nuevo idioma en tiempo real
    if (errorMsg.style.display === 'block' && window.lastErrorKey) {
        errorMsg.textContent = translations[currentLang][window.lastErrorKey];
    }
}

/**
 * Reproduce el stream de audio o carga el reproductor web de la URL proporcionada.
 * Maneja errores traduciéndolos al idioma actual.
 * @param {string} url - La URL del stream de radio o del reproductor web.
 */
function playStream(url) {
    errorMsg.style.display = 'none';
    errorMsg.textContent = '';
    window.lastErrorKey = null;

    radioPlayerAudio.style.display = 'none';
    radioPlayerIframe.style.display = 'none';
    radioPlayerAudio.pause();
    radioPlayerAudio.src = '';
    radioPlayerIframe.src = '';

    if (url.includes('playerID=')) {
        radioPlayerIframe.src = url;
        radioPlayerIframe.style.display = 'block';
        console.log('Cargando reproductor de iframe:', url);
    } else {
        radioPlayerAudio.src = url;
        radioPlayerAudio.load();
        radioPlayerAudio.style.display = 'block';

        const playPromise = radioPlayerAudio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Reproduciendo audio stream:', url);
            }).catch(error => {
                console.error('Error al intentar reproducir el stream de audio:', error);

                let errorKey = 'errorDefault';
                if (error.name === 'NotAllowedError') {
                    errorKey = 'errorNotAllowed';
                } else if (error.name === 'NotSupportedError') {
                    errorKey = 'errorNotSupported';
                } else if (error.message.includes('network') || error.message.includes('HTTP')) {
                    errorKey = 'errorNetwork';
                }

                window.lastErrorKey = errorKey;
                errorMsg.textContent = translations[currentLang][errorKey];
                errorMsg.style.display = 'block';
                radioPlayerAudio.pause();
            });
        }

        radioPlayerAudio.addEventListener('error', (e) => {
            console.error('Evento de error del audio:', e);
            let errorKey = 'errorUnexpected';
            if (radioPlayerAudio.error) {
                switch (radioPlayerAudio.error.code) {
                    case radioPlayerAudio.error.MEDIA_ERR_ABORTED:
                        errorKey = 'errAborted';
                        break;
                    case radioPlayerAudio.error.MEDIA_ERR_NETWORK:
                        errorKey = 'errNetworkDownload';
                        break;
                    case radioPlayerAudio.error.MEDIA_ERR_DECODE:
                        errorKey = 'errDecode';
                        break;
                    case radioPlayerAudio.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        errorKey = 'errSrcNotSupported';
                        break;
                    default:
                        errorKey = 'errUnknown';
                        break;
                }
            }
            window.lastErrorKey = errorKey;
            errorMsg.textContent = translations[currentLang][errorKey];
            errorMsg.style.display = 'block';
            radioPlayerAudio.pause();
        }, { once: true });
    }
}

// Event Listeners
stationSelect.addEventListener('change', () => {
    playStream(stationSelect.value);
    localStorage.setItem('selectedRadioStation', stationSelect.value);
});

langToggleBtn.addEventListener('click', toggleLanguage);

// Carga inicial al cargar la página
window.addEventListener('load', () => {
    updateLanguageUI(); // Aplica idioma guardado o por defecto

    const savedStation = localStorage.getItem('selectedRadioStation');
    if (savedStation) {
        stationSelect.value = savedStation;
    }
    playStream(stationSelect.value);
});