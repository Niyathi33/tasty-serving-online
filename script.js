import { mainContent } from './data/content.js';

document.addEventListener("DOMContentLoaded", () => {
  renderWelcomeSection();
  renderGallery();
  renderWhyUs();
});

function renderWelcomeSection() {
  const template = document.getElementById("welcome-template");
  const clone = template.content.cloneNode(true);

  clone.querySelector("h1").textContent = mainContent.welcome.title;
  clone.querySelector("p").textContent = mainContent.welcome.message;

  const imageContainer = clone.querySelector(".welcome-section");
  mainContent.welcome.images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Welcome Image";
    img.classList.add("welcome-img");
    imageContainer.appendChild(img);
  });

  document.querySelector("main").insertBefore(clone, document.querySelector(".special-food-content"));
}

function renderGallery() {
  const template = document.getElementById("gallery-template");
  const clone = template.content.cloneNode(true);
  const gallerySection = clone.querySelector(".gallery");

  mainContent.gallery.forEach(item => {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;
    img.title=item.title;
    img.classList.add("gallery-img");
    img.addEventListener('click', () => {
      showMenuPopup(item);
    });
    gallerySection.appendChild(img);
  });

  document.querySelector("main").insertBefore(clone, document.querySelector(".contact-section"));
}

function renderWhyUs() {
  const template = document.getElementById("whyus-template");
  const clone = template.content.cloneNode(true);

  const img = clone.querySelector("img");
  img.src = mainContent.whyUs.image;
  img.alt = "Why Us Image";

  clone.querySelector("h1").textContent = mainContent.whyUs.title;
  clone.querySelector("p strong").textContent = mainContent.whyUs.subtitle;

  const ul = clone.querySelector(".whyus-points");
  mainContent.whyUs.points.forEach(point => {
    const li = document.createElement("li");
    li.textContent = point;
    ul.appendChild(li);
  });

  document.querySelector("main").insertBefore(clone, document.querySelector(".contact-section"));
}

function showMenuPopup(item) {
  // Create popup background
  const popupBackground = document.createElement('div');
  popupBackground.classList.add('popup-background');

  // Create popup content
  const popup = document.createElement('div');
  popup.classList.add('popup');

  // Title
  const title = document.createElement('h2');
  title.textContent = item.title;
  popup.appendChild(title);

  // Create list of items
  item.items.forEach(menuItem => {
    const menuEntry = document.createElement('p');
    menuEntry.innerHTML = `<strong>${menuItem.name}</strong> - ${menuItem.price}<br><i>${menuItem.ingredients}</i>`;
    popup.appendChild(menuEntry);
  });

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = "Close";
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(popupBackground);
  });
  popup.appendChild(closeBtn);

  popupBackground.appendChild(popup);
  document.body.appendChild(popupBackground);
}

