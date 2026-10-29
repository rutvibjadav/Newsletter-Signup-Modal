// Newsletter modal interactions, validation, and session-level dismissal.
const backdrop = document.querySelector("#newsletter-backdrop");
const modal = document.querySelector("#newsletter-modal");
const closeButton = document.querySelector(".modal-close");
const form = document.querySelector(".signup-form");
const emailInput = document.querySelector("#email");
const message = document.querySelector("#email-message");
const submitButton = document.querySelector(".submit-button");
const submitLabel = document.querySelector(".submit-label");
const openButtons = document.querySelectorAll("[data-open-modal]");
const dismissedKey = "fieldnotes-newsletter-dismissed";

let previouslyFocusedElement = null;
let isProcessing = false;

function openModal() {
  if (!backdrop.hidden) return;

  previouslyFocusedElement = document.activeElement;
  backdrop.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => {
    backdrop.classList.add("is-visible");
    emailInput.focus();
  });
}

function closeModal() {
  if (backdrop.hidden) return;

  backdrop.classList.remove("is-visible");
  document.body.classList.remove("modal-open");
  sessionStorage.setItem(dismissedKey, "true");
  window.setTimeout(() => {
    backdrop.hidden = true;
    if (previouslyFocusedElement instanceof HTMLElement) {
      previouslyFocusedElement.focus();
    }
  }, 250);
}

function showMessage(text, state = "error") {
  message.textContent = text;
  message.classList.toggle("success", state === "success");
  emailInput.setAttribute("aria-invalid", state === "error" ? "true" : "false");
}

openButtons.forEach((button) => button.addEventListener("click", openModal));
closeButton.addEventListener("click", closeModal);

backdrop.addEventListener("click", (event) => {
  if (event.target === backdrop) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (backdrop.hidden) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
  }

  if (event.key === "Tab") {
    const focusableElements = modal.querySelectorAll(
      'button:not(:disabled), input:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
});

emailInput.addEventListener("input", () => {
  if (message.textContent) {
    message.textContent = "";
    message.classList.remove("success");
  }
  emailInput.removeAttribute("aria-invalid");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isProcessing) return;

  const email = emailInput.value.trim();
  if (!email) {
    showMessage("Please enter your email address.");
    emailInput.focus();
    return;
  }
  if (!emailInput.validity.valid) {
    showMessage("Please enter a valid email address.");
    emailInput.focus();
    return;
  }

  isProcessing = true;
  submitButton.disabled = true;
  submitLabel.textContent = "Subscribing…";
  showMessage("", "success");

  // Frontend-only demo: no address is stored or sent to a service.
  window.setTimeout(() => {
    showMessage("You're on the list! Thanks for joining the Fieldnotes community.", "success");
    submitLabel.textContent = "Subscribed";
    isProcessing = false;
    submitButton.disabled = false;
    emailInput.value = "";
  }, 700);
});

if (sessionStorage.getItem(dismissedKey) !== "true") {
  window.setTimeout(() => {
    if (sessionStorage.getItem(dismissedKey) !== "true") openModal();
  }, 4000);
}
