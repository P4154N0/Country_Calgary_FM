# Country Calgary FM - Web Audio Streaming Interface

🇺🇸 [English](README.md)

Una aplicación web ligera y sin dependencias diseñada para la ingesta y reproducción de transmisiones en vivo de estaciones de radio de música country desde Calgary, Alberta, Canadá.

---

## 🚀 Entorno de Producción (Live Demo)

La aplicación se encuentra desplegada y operativa mediante integración continua en GitHub Pages:

**[Sintonizar Country Calgary FM](https://p4154n0.github.io/Country_Calgary_FM/)**

---

## 🎯 Resumen Ejecutivo

Este proyecto es una demostración técnica de desarrollo Frontend nativo.

Su objetivo principal es resolver la concurrencia de diferentes protocolos de transmisión de audio —streams directos vs. iframes incrustados— unificándolos bajo una única interfaz de usuario fluida y resiliente.

El desarrollo prescinde completamente de frameworks externos como React o Angular y librerías de estilos como Bootstrap, demostrando un dominio del DOM y de CSS3 moderno.

---

## 🏗️ Decisiones de Arquitectura y UI/UX

El diseño de la interfaz fue concebido bajo estándares premium de experiencia de usuario, implementando las siguientes características técnicas:

* **Sistema de Diseño Glassmorphism:** Implementación de tarjetas translúcidas con profundidad visual utilizando propiedades avanzadas de CSS (`backdrop-filter: blur`, manejo de opacidades `rgba` y sombras complejas).

* **Animaciones Nativas (Zero-Dependencies):** Creación de un ecualizador dinámico utilizando algoritmos de animaciones por fotogramas clave (`@keyframes`) y retrasos asíncronos (`animation-delay`) en CSS puro, eliminando la necesidad de cargar archivos `.gif` externos y mejorando el rendimiento.

* **Manejador Híbrido de Medios:** Algoritmo en JavaScript puro (`Vanilla JS`) capaz de detectar el origen de la URL seleccionada y conmutar dinámicamente entre la API nativa de `<audio>` del navegador o la inyección segura de un `<iframe>`, gestionando los posibles errores de red y políticas CORS.

* **Diseño Adaptativo (Mobile-First):** Estructura responsiva gestionada mediante variables globales (`:root`) y directivas de medios (`@media queries`) estrictamente ordenadas bajo el principio de la cascada.

---

## ⚙️ Instrucciones de Despliegue Local

Para auditar o ejecutar el código fuente en un entorno de desarrollo local:

### 1. Clonar el Repositorio

```bash
git clone https://github.com/P4154N0/Country_Calgary_FM.git
```

### 2. Acceder al Directorio

```bash
cd Country_Calgary_FM
```

### 3. Inicialización

Al ser un proyecto estático basado en **Vanilla HTML/CSS/JS**, no requiere compilación previa.

Se recomienda ejecutar el archivo `index.html` a través de una extensión como **Live Server** en VS Code para emular correctamente un servidor web y evitar bloqueos derivados de las políticas de seguridad del navegador (CORS) durante la carga de los streams de audio.

---

## 🚧 Roadmap y Próximas Implementaciones

- Integración completa de Google Maps API para visualización geoespacial interactiva de Calgary.
- Refactorización del manejo de errores globales en la ingesta del streaming.

---

## 📜 Licencia y Limitación de Responsabilidad

El código fuente de la interfaz gráfica y la lógica de enrutamiento de este proyecto están liberados bajo la **Licencia MIT** — ver el archivo `LICENSE` para más detalles.

### Aviso de Derechos de Autor

Todos los streams de audio, marcas comerciales, nombres de emisoras y logotipos referenciados en esta aplicación son propiedad intelectual exclusiva de sus respectivas cadenas de radiodifusión.

Esta aplicación actúa únicamente como un cliente de agregación que apunta a URLs de transmisión de dominio público, sin alojar ni retransmitir contenido multimedia en servidores propios.

---

## 👤 Autor

Diseñado y desarrollado por **P4154N0 (Héctor Pablo Graff)**.

Ingeniero de Software especializado en Sistemas Distribuidos y Arquitecturas de Telemetría. Actualmente radicado en Argentina, con el objetivo profesional de aportar valor tecnológico al sector energético e industrial de Calgary, AB, Canadá.

🔗 **[LinkedIn](https://www.linkedin.com/in/hector-pablo-graff/)** | 💻 **[Portfolio](https://p4154n0.github.io/portfolio/)**