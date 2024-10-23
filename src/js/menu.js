// Espera que o documento seja totalmente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o ícone do menu (três pontos)
    const menuIcon = document.querySelector('.mobile-menu');
    
    // Seleciona o menu que será exibido/ocultado
    const mobileMenu = document.querySelector('.mobile-menu-items');
    
    // Adiciona um evento de clique ao ícone do menu
    menuIcon.addEventListener('click', function () {
        // Verifica se o menu está visível ou oculto e altera o estilo display
        if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
            mobileMenu.style.display = 'block';  // Mostra o menu
        } else {
            mobileMenu.style.display = 'none';  // Oculta o menu
        }
    });
});
