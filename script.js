const apiUrl = "https://striveschool-api.herokuapp.com/books";
const libriContainer = document.getElementById("libri-container");
const carrelloList = document.getElementById("carrello-list");
let carrello = JSON.parse(localStorage.getItem("carrello")) || [];

const fetchLibri = async () => {
  try {
    const response = await fetch(apiUrl);
    const libri = await response.json();
    mostraLibri(libri);
  } catch (error) {
    console.error("Errore nel caricamento dei libri:", error);
  }
};

const mostraLibri = (libri) => {
  libri.forEach((libro) => {
    const col = document.createElement("div");
    col.className = "col-md-3";
    col.innerHTML = `
            <div class="card">
                <img src="${libro.img}" class="card-img-top" alt="${libro.title}">
                <div class="card-body">
                    <h5 class="card-title">${libro.title}</h5>
                    <p class="card-text">Prezzo: €${libro.price}</p>
                    <button class="btn btn-danger" onclick="scartaLibro(this)">Scarta</button>
                    <button class="btn btn-primary" onclick="aggiungiAlCarrello('${libro.title}', ${libro.price})">Compra ora</button>
                </div>
            </div>
        `;
    libriContainer.appendChild(col);
  });
};

const scartaLibro = (button) => {
  const card = button.closest(".card");
  card.style.display = "none"; // Nasconde la card
};

const aggiungiAlCarrello = (title, price) => {
  const libroNelCarrello = { title, price };
  carrello.push(libroNelCarrello);
  localStorage.setItem("carrello", JSON.stringify(carrello));
  mostraCarrello();
};

const mostraCarrello = () => {
  carrelloList.innerHTML = "";
  carrello.forEach((libro, index) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerHTML = `${libro.title} - €${libro.price} <button class="btn btn-danger btn-sm" onclick="rimuoviDalCarrello(${index})">Rimuovi</button>`;
    carrelloList.appendChild(listItem);
  });
};

const rimuoviDalCarrello = (index) => {
  carrello.splice(index, 1);
  localStorage.setItem("carrello", JSON.stringify(carrello));
  mostraCarrello();
};

// Carica i libri e mostra il carrello all'avvio
fetchLibri();
mostraCarrello();
