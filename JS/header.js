

// Configuration
const MOBILE_BREAKPOIT = 810;

// Cach DOM elements
const menuBtn = document.querySelector(".menu-btn");
const navList = document.querySelector(".nav-list");
const shopDropBtn = document.querySelector(".shop-drop-btn");
const subNavDrop = document.querySelector(".sub-menu-dropdown");
const subMenu = document.querySelector(".sub-menu");

// Initialize ARIA attributes
function initAria() {
  menuBtn.setAttribute("aria-controls", "nav-menu");
  navList.setAttribute("aria-expanded", false);
  navList.setAttribute("aria-hidden", true);
  navList.id = "nav-menu";
  subMenu.setAttribute("aria-expanded", false);
  subMenu.setAttribute("aria-hidden", true);
}

// Checking if viewport is mobile
function checkViewport() {
  return window.innerWidth < MOBILE_BREAKPOIT;
}

// Toggle main navigation
function toggleMenu() {
  const isMenuOpen = navList.classList.toggle("hide-nav-list");
  menuBtn.classList.toggle("close-menu");

  if (isMenuOpen) subNavDrop.classList.add("hide-sub-menu");

  navList.setAttribute("aria-expanded", !isMenuOpen);
  navList.setAttribute("aria-hidden", isMenuOpen);
}

// Toggle sub menu on mobile
function toggleSubMenu() {
  if (!checkViewport()) return;

  const isSubMenuOpen = subNavDrop.classList.toggle("hide-sub-menu");
  subMenu.setAttribute("aria-expanded", !isSubMenuOpen);
  subMenu.setAttribute("aria-hidden", isSubMenuOpen);
}

// show sub-menu on desktop hover
function showSubMenu() {
  if (checkViewport()) return

  subNavDrop.classList.remove("hide-sub-menu");
  subMenu.setAttribute("aria-expanded", true);
  subMenu.setAttribute("aria-hidden", false);
}

// hide sub-menu on mouse leave
function hideSubMenu() {
  if (checkViewport()) return;

  subNavDrop.classList.add("hide-sub-menu");
  subMenu.setAttribute("aria-expanded", false);
  subMenu.setAttribute("aria-hidden", true);
}

// Initialize navigation
export function initNavigation() {
  initAria();

  // event listeners
  menuBtn.addEventListener('click', toggleMenu);
  shopDropBtn.addEventListener('click', toggleSubMenu);
  shopDropBtn.addEventListener('mouseover', showSubMenu);
  subMenu.addEventListener('mouseleave', hideSubMenu);
}
