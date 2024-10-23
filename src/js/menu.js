document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.mobile-menu');
    const mobileMenu = document.querySelector('.mobile-menu-items');
  
    menuIcon.addEventListener('click', function () {
      if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
        mobileMenu.style.display = 'block';
      } else {
        mobileMenu.style.display = 'none';
      }
    });
  });
  