// ========================================
// ELEMENTOS
// ========================================

const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#nav");
const header = document.querySelector(".header");

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

const portraitImage = document.querySelector("#portrait-image");
const portraitPlaceholder = document.querySelector("#portrait-placeholder");

const contactForm = document.querySelector("#contact-form");

const year = document.querySelector("#year");


// ========================================
// MENU MOBILE
// ========================================

if (menuButton && nav) {

  menuButton.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuButton.textContent =
      isOpen ? "✕" : "☰";

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );

  });


  document
    .querySelectorAll(".nav a")
    .forEach((link) => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        document.body.classList.remove(
          "menu-open"
        );

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.textContent = "☰";

      });

    });

}


// ========================================
// FILTROS
// Sistemas / Automações / Sites
// ========================================

filters.forEach((button) => {

  button.addEventListener("click", () => {

    filters.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const selected =
      button.dataset.filter;

    projects.forEach((project) => {

      const category =
        project.dataset.category;

      const showProject =
        selected === "todos" ||
        category === selected;

      project.classList.toggle(
        "hidden",
        !showProject
      );

    });

  });

});


// ========================================
// ANIMAÇÕES AO ROLAR
// ========================================

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


// ========================================
// FOTO
// ========================================

if (portraitImage && portraitPlaceholder) {

  const showImage = () => {

    portraitImage.style.display = "block";

    portraitPlaceholder.style.display =
      "none";

  };


  const showPlaceholder = () => {

    portraitImage.style.display = "none";

    portraitPlaceholder.style.display =
      "grid";

  };


  portraitImage.addEventListener(
    "load",
    showImage
  );


  portraitImage.addEventListener(
    "error",
    showPlaceholder
  );


  if (portraitImage.complete) {

    if (
      portraitImage.naturalWidth > 0
    ) {

      showImage();

    } else {

      showPlaceholder();

    }

  }

}


// ========================================
// FORMULÁRIO
// ========================================

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      const formData =
        new FormData(contactForm);


      const name =
        formData.get("name");

      const email =
        formData.get("email");

      const projectType =
        formData.get("projectType");

      const message =
        formData.get("message");


      const subject =
        `Novo projeto — ${projectType} — ${name}`;


      const body =
`Olá, Raquel!

Meu nome é ${name}.

Meu e-mail:
${email}

Tipo de projeto:
${projectType}

Sobre o projeto:

${message}

Aguardo seu retorno.`;


      // ==================================
      // TROQUE PELO SEU E-MAIL
      // ==================================

      const destinationEmail =
        "SEUEMAIL@EXEMPLO.COM";


      const mailto =
        `mailto:${destinationEmail}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;


      window.location.href = mailto;

    }
  );

}


// ========================================
// ANO
// ========================================

if (year) {

  year.textContent =
    new Date().getFullYear();

}


// ========================================
// HEADER AO ROLAR
// ========================================

function updateHeader() {

  if (!header) {
    return;
  }

  header.classList.toggle(
    "scrolled",
    window.scrollY > 30
  );

}

updateHeader();

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);


// ========================================
// LINK ATIVO NO MENU
// ========================================

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".nav a"
  );


if ("IntersectionObserver" in window) {

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          const id =
            entry.target.getAttribute("id");


          navLinks.forEach((link) => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
                `#${id}`
            );

          });

        });

      },
      {
        rootMargin:
          "-40% 0px -50% 0px"
      }
    );


  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

}