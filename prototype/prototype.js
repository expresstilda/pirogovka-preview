const menuButton = document.querySelector(".mobile-toggle");
const navigation = document.querySelector("#navigation");
const mobileLayout = window.matchMedia("(max-width: 900px)");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  navigation.classList.toggle("mobile-open", open);
}

function closeSection(restoreFocus = false) {
  const section = navigation.querySelector("details[open]");
  if (!section) return;
  section.open = false;
  if (restoreFocus) section.querySelector("summary").focus();
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "false";
  if (!open) closeSection();
  setMenu(open);
  if (open) navigation.querySelector("summary").focus();
});

navigation.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;
  closeSection(!mobileLayout.matches);
  setMenu(false);
  if (link.hash && link.getAttribute("href").startsWith("#")) {
    const target = document.querySelector(link.hash);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".site-header")) return;
  closeSection();
  setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (navigation.querySelector("details[open]")) {
    closeSection(true);
    return;
  }
  if (menuButton.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});

mobileLayout.addEventListener("change", () => {
  closeSection();
  setMenu(false);
});

const slides = [...document.querySelectorAll(".slide")];
const count = document.querySelector("#slide-count");
let activeSlide = 0;

document.querySelectorAll("[data-shift]").forEach((button) => {
  button.addEventListener("click", () => {
    slides[activeSlide].hidden = true;
    activeSlide = (activeSlide + Number(button.dataset.shift) + slides.length) % slides.length;
    slides[activeSlide].hidden = false;
    count.textContent = `${activeSlide + 1} / ${slides.length}`;
  });
});

