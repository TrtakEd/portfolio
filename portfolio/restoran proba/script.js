function toggleDropdown(dropdownId) {
  const dropdownContent = document.getElementById(dropdownId);
  dropdownContent.classList.toggle("show");
}

function showDropdownOnHover(menuId) {
  const dropdownContent = document.getElementById(menuId);
  dropdownContent.style.display = 'block';
}

// Function to hide dropdowns when not hovering
function hideDropdownOnLeave(menuId) {
  const dropdownContent = document.getElementById(menuId);
  dropdownContent.style.display = 'none';
}

// Close dropdowns when clicking outside
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn, .submenu-btn')) {
    const dropdowns = document.querySelectorAll(".dropdown-content, .submenu-content");
    dropdowns.forEach((openDropdown) => openDropdown.style.display = 'none');
  }
}

// Image gallery modal functions
let currentImageIndex = 0;
const images = ["basta1.jpg", "unutra3.jpg", "polica.jpg", "unutra1.jpg", "unutra2.jpg", "pileci.jpg", "pizza.jpg", "plata.jpg", "pasta.jpg", "burgerjpg.jpg"];

function openModal(imageIndex) {
  const modal = document.querySelector("#myModal");
  const modalImg = document.querySelector("#modalImg");

  currentImageIndex = imageIndex;
  modal.style.display = "block";
  modalImg.src = images[currentImageIndex];
}

function closeModal() {
  const modal = document.querySelector("#myModal");
  modal.style.display = "none";
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  const modalImg = document.querySelector("#modalImg");
  modalImg.src = images[currentImageIndex];
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  const modalImg = document.querySelector("#modalImg");
  modalImg.src = images[currentImageIndex];
}

// Hide thumbnails after the third one on page load
document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll('.thumbnails img');
  for (let i = 3; i < thumbnails.length; i++) {
    thumbnails[i].style.display = 'none';
  }
});