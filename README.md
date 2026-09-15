# Country Calgary FM - Web Audio Streaming Interface

🇪🇸 [Español](README_es.md)

A lightweight, dependency-free web application designed for ingesting and playing live music radio streams from Calgary, Alberta, Canada.

---

## 🚀 Production Environment (Live Demo)

The application is deployed and fully operational through continuous integration on GitHub Pages:

**[Tune in to Country Calgary FM](https://p4154n0.github.io/Country_Calgary_FM/)**

---

## 🎯 Executive Summary

This project is a technical demonstration of native Frontend development.

Its primary objective is to handle different audio streaming protocols — direct audio streams and embedded iframes — by unifying them under a single smooth and resilient user interface.

The application completely avoids external frameworks such as React or Angular, as well as styling libraries such as Bootstrap, demonstrating solid knowledge of the DOM and modern CSS3.

---

## 🏗️ Architecture and UI/UX Decisions

The interface was designed following premium user experience principles, implementing the following technical features:

* **Glassmorphism Design System:** Implementation of translucent cards with visual depth using advanced CSS properties such as `backdrop-filter: blur`, `rgba` opacity management, and complex shadows.

* **Native Animations (Zero Dependencies):** Creation of a dynamic audio equalizer using CSS keyframe animations (`@keyframes`) and asynchronous animation delays (`animation-delay`). This eliminates the need for external `.gif` files and contributes to a lighter implementation.

* **Hybrid Media Handler:** A pure JavaScript (`Vanilla JS`) algorithm capable of detecting the origin of the selected URL and dynamically switching between the browser's native `<audio>` API and secure `<iframe>` injection, while handling potential network and CORS-related issues.

* **Responsive Design (Mobile-First):** A responsive structure managed through global CSS variables (`:root`) and media queries (`@media`), following the principles of the CSS cascade.

---

## ⚙️ Local Deployment Instructions

To audit or run the source code in a local development environment:

### 1. Clone the Repository

```bash
git clone https://github.com/P4154N0/Country_Calgary_FM.git
```

### 2. Access the Project Directory

```bash
cd Country_Calgary_FM
```

### 3. Initialization

As this is a static project based on **Vanilla HTML/CSS/JS**, no build process is required.

It is recommended to run the `index.html` file through an extension such as **Live Server** in VS Code. This emulates a web server environment and helps avoid browser security restrictions, including CORS-related issues when loading audio streams.

---

## 🚧 Roadmap and Future Implementations

- Full integration of the Google Maps API for interactive geospatial visualization of Calgary.
- Refactoring of global error handling for streaming ingestion.

---

## 📜 License and Disclaimer

The graphical interface source code and stream-routing logic are released under the **MIT License** — see the `LICENSE` file for details.

### Copyright Notice

All audio streams, trademarks, station names, and logos referenced by this application are the intellectual property of their respective broadcasting organizations.

This application acts solely as an aggregation client pointing to publicly available streaming URLs. It does not host or retransmit multimedia content on its own servers.

---

## 👤 Author

Designed and developed by **P4154N0 (Héctor Pablo Graff)**.

Software Engineer specialized in Distributed Systems and Telemetry Architectures. Currently based in Argentina, with the professional goal of contributing technological value to the energy and industrial sectors in Calgary, AB, Canada.

🔗 **[LinkedIn](https://www.linkedin.com/in/hector-pablo-graff/)** | 💻 **[Portfolio](https://p4154n0.github.io/portfolio/)**