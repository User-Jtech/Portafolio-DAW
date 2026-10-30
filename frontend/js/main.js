// Botones de arriba
let botonIdioma = document.getElementById("btn-idioma");
let botonTema = document.getElementById("btn-tema");
let pagina = document.querySelector("html");

// Si la última vez se eligió inglés o noche, lo recupero. Si no, español y día.
let idioma = localStorage.getItem("idioma");
if (idioma == null) {
  idioma = "es";
}

let tema = localStorage.getItem("tema");
if (tema == null) {
  tema = "dia";
}

// Cada texto en inglés está en data-en. Aquí guardo también el español que ya está escrito en el HTML.
let textos = document.querySelectorAll("[data-en]");

for (let i = 0; i < textos.length; i++) {
  textos[i].setAttribute("data-es", textos[i].innerHTML.trim());
}

function ponerIdioma() {
  if (idioma == "es") {
    pagina.lang = "es";

    for (let i = 0; i < textos.length; i++) {
      textos[i].innerHTML = textos[i].getAttribute("data-es");
    }

    botonIdioma.textContent = "EN";
    botonIdioma.setAttribute("aria-label", "Cambiar a inglés");
  } else {
    pagina.lang = "en";

    for (let i = 0; i < textos.length; i++) {
      textos[i].innerHTML = textos[i].getAttribute("data-en");
    }

    botonIdioma.textContent = "ES";
    botonIdioma.setAttribute("aria-label", "Switch to Spanish");
  }

  // El botón de día/noche también cambia de idioma
  ponerTema();
}

function ponerTema() {
  if (tema == "noche") {
    pagina.classList.add("modo-noche");
  } else {
    pagina.classList.remove("modo-noche");
  }

  if (idioma == "es") {
    if (tema == "noche") {
      botonTema.textContent = "Día";
      botonTema.setAttribute("aria-label", "Cambiar a modo día");
    } else {
      botonTema.textContent = "Noche";
      botonTema.setAttribute("aria-label", "Cambiar a modo noche");
    }
  } else {
    if (tema == "noche") {
      botonTema.textContent = "Day";
      botonTema.setAttribute("aria-label", "Switch to day mode");
    } else {
      botonTema.textContent = "Night";
      botonTema.setAttribute("aria-label", "Switch to night mode");
    }
  }
}

botonIdioma.addEventListener("click", function () {
  if (idioma == "es") {
    idioma = "en";
  } else {
    idioma = "es";
  }

  localStorage.setItem("idioma", idioma);
  ponerIdioma();
});

botonTema.addEventListener("click", function () {
  if (tema == "dia") {
    tema = "noche";
  } else {
    tema = "dia";
  }

  localStorage.setItem("tema", tema);
  ponerTema();
});

ponerIdioma();
