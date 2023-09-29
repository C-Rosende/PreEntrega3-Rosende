document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const leftArrow = document.querySelector('.slider-arrow.left');
    const rightArrow = document.querySelector('.slider-arrow.right');
    let currentPage;
    let menuItems;
    if (slides.length && leftArrow && rightArrow) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        leftArrow.addEventListener('click', prevSlide);
        rightArrow.addEventListener('click', nextSlide);
        setInterval(nextSlide, 6000);
    }
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('nav ul');
    const menuOpen = localStorage.getItem('menuOpen');
    if (menuOpen === 'true') {
        nav.classList.add('open');
        navMenu.style.display = 'flex';
        menuToggle.style.transform = 'rotate(90deg)';
    } else {
        nav.classList.remove('open');
        navMenu.style.display = 'none';
        menuToggle.style.transform = 'rotate(0)';
    }
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        navMenu.style.display = nav.classList.contains('open') ? 'flex' : 'none';
        menuToggle.style.transform = nav.classList.contains('open') ? 'rotate(90deg)' : 'rotate(0)';
        localStorage.setItem('menuOpen', nav.classList.contains('open'));
    });
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 764) {
            navMenu.style.display = 'flex';
            menuToggle.style.transform = 'rotate(0)';
            nav.classList.remove('open');
            localStorage.setItem('menuOpen', false);
        } else if (!nav.classList.contains('open')) {
            navMenu.style.display = 'none';
            menuToggle.style.transform = 'rotate(0)';
            localStorage.setItem('menuOpen', false);
        }
    });
    currentPage = window.location.pathname.split("/").pop().split(".")[0] || 'index';
    menuItems = document.querySelectorAll('#nav-menu li a');
    menuItems.forEach(item => {
       item.addEventListener('click', function() {
           nav.classList.remove('open');
           navMenu.style.display = 'none';
           menuToggle.style.transform = 'rotate(0)';
           localStorage.setItem('menuOpen', false);
       });
       const itemPage = item.getAttribute('href').split("/").pop().split(".")[0];
       if (itemPage === currentPage || (currentPage === 'index' && item.getAttribute('href') === '#')) {
           item.parentElement.classList.add('active');
       }
   });
});