const nav = document.querySelector(".wrapper .nav"),
  navDesktopToggler = document.querySelector(
    ".wrapper .nav .nav-desktop-toggler"
  ),
  navMobileToggler = document.querySelector(
    ".wrapper header .nav-mobile-toggler"
  );

// toggle nav on click
navDesktopToggler.addEventListener("click", toggleDesktopNav);

function toggleDesktopNav(e) {
  nav.classList.toggle("closed");
}

// hide nav on click on small screens

navMobileToggler.addEventListener("click", hideNav);

function hideNav(e) {
  nav.classList.toggle("hidden");
}

// toggle nav on mobiles

window.addEventListener("resize", toggleMobileNav);
toggleMobileNav();

function toggleMobileNav() {
  if (window.innerWidth <= 767) {
    nav.classList.add("closed");
  }
  // hide nav on small screens
  if (window.innerWidth <= 420) {
    nav.classList.add("hidden");
  }
}

// Scroll Top button
const scrollTop = document.querySelector('.scroll-top');
let showScrollBtn = () => 
  window.scrollY >= 350 ? scrollTop.classList.add('show') : scrollTop.classList.remove('show');

// show and hide scroll button
window.addEventListener('scroll', showScrollBtn);
showScrollBtn();

// handle button function
scrollTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavour: 'smooth',
  })
});