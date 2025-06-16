// HEADER BACKGROUND ON SCROLL
const updateHeaderBackground = () => {
  const header = document.getElementById('header');
  header.classList.toggle('black-bg', window.scrollY > 5);
  header.classList.toggle('transparent', window.scrollY <= 5);
};

// MODAL HANDLING
const modal = document.getElementById('previewModal');
const closeBtn = document.getElementById('closeModalBtn');
const closeModal = () => {
  modal.classList.add('hidden');
  video.src = '';
};
closeBtn?.addEventListener('click', closeModal);
window.addEventListener('keydown', e => e.key === 'Escape' && closeModal());
const loadModalFromFile = async (fileUrl) => {
  const modalContent = document.querySelector('#previewModal .modal-content');
  modal.classList.remove('hidden');
  try {
    const response = await fetch(fileUrl);
    const html = await response.text();
    modalContent.innerHTML = html;
  } catch (error) {
    modalContent.innerHTML = "<p style='color: white;'>Errore nel caricamento del contenuto.</p>";
  }
};

// IMAGE MODAL HANDLER
function openImageModal(imageSrc) {
  const imageModal = document.getElementById('imageModal');
  const imageContent = document.getElementById('imageModalContent');
  imageContent.src = imageSrc;
  imageModal.classList.remove('hidden');
}

// DOM READY HANDLERS
document.addEventListener('DOMContentLoaded', () => {
  updateHeaderBackground();
  const searchIcon = document.getElementById('searchIcon');
  const searchPopup = document.getElementById('searchPopup');
  const closeSearchPopup = document.getElementById('closeSearchPopup');
  const notificationIcon = document.getElementById('notificationIcon');
  const notificationDropdown = notificationIcon?.querySelector('.notification-dropdown');
  const profileIcon = document.getElementById('profileIcon');
  const profileDropdown = profileIcon?.querySelector('.profile-dropdown');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navWrapper = document.getElementById('navWrapper');
  // Toggle search popup
  searchIcon?.addEventListener('click', () => searchPopup?.classList.toggle('hidden'));
  closeSearchPopup?.addEventListener('click', () => searchPopup?.classList.add('hidden'));
  // Dropdown interactions
  notificationIcon?.addEventListener('mouseenter', () => notificationDropdown?.classList.remove('hidden'));
  notificationIcon?.addEventListener('mouseleave', () => notificationDropdown?.classList.add('hidden'));
  profileIcon?.addEventListener('click', (e) => {
    e.stopPropagation(); // 👈 impedisce la chiusura immediata
    profileDropdown?.classList.toggle('hidden');
  });
  // Chiude il menu se clicchi fuori
  document.addEventListener('click', (e) => {
    if (!profileIcon?.contains(e.target)) {
      profileDropdown?.classList.add('hidden');
    }
  });
  // Hamburger menu
  hamburgerBtn?.addEventListener('click', () => navWrapper?.classList.toggle('active'));
  // Horizontal scroll popups
  document.querySelectorAll('.popup-wrapper').forEach(wrapper => {
    const row = wrapper.querySelector('.popup-row');
    wrapper.querySelector('.scroll-btn.left')?.addEventListener('click', () => {
      row?.scrollBy({ left: -300, behavior: 'smooth' });
    });
    wrapper.querySelector('.scroll-btn.right')?.addEventListener('click', () => {
      row?.scrollBy({ left: 300, behavior: 'smooth' });
    });
  });
});

// Header color on scroll
window.addEventListener('scroll', updateHeaderBackground);
