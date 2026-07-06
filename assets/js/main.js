(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector("#site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      siteNav.classList.toggle("is-open", !isOpen);
    });
  }

  document.querySelectorAll(".site-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navToggle && siteNav) {
        navToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
      }
    });
  });

  fetch("data/site-content.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Content file unavailable");
      }
      return response.json();
    })
    .then(function (content) {
      hydrateBusinessContent(content);
      hydrateServices(content);
    })
    .catch(function () {
      document.documentElement.classList.add("content-fallback");
    });

  function hydrateBusinessContent(content) {
    const business = content.business || {};
    const messages = content.siteMessages || {};

    setText("[data-content='phone-display']", business.phoneDisplay);
    setText("[data-content='phone']", business.phone);
    setText("[data-content='email']", business.email);
    setText("[data-content='service-area']", business.serviceArea);
    setText("[data-content='location']", business.location);
    setText("[data-content='usdot']", business.usdot);
    setText("[data-content='hero-title']", messages.heroTitle);
    setText("[data-content='hero-subtitle']", messages.heroSubtitle);
    setText("[data-content='urgent-title']", messages.urgentBannerTitle);
    setText("[data-content='urgent-text']", messages.urgentBannerText);
    setText("[data-content='service-area-text']", messages.serviceAreaText);
    setText("[data-content='careers-banner']", messages.careersBanner);

    setHref("[data-link='phone']", business.phoneHref);
    setHref("[data-link='email']", business.emailHref);
    setHref("[data-link='facebook']", business.facebookUrl);
  }

  function hydrateServices(content) {
    const services = Array.isArray(content.services) ? content.services : [];
    const serviceList = document.querySelector("[data-services-list]");

    if (!serviceList || services.length === 0) {
      return;
    }

    serviceList.innerHTML = services
      .map(function (service) {
        return (
          "<article class=\"service-card\">" +
          "<span class=\"service-icon\" aria-hidden=\"true\">+</span>" +
          "<h3>" + escapeHtml(service.title) + "</h3>" +
          "<p>" + escapeHtml(service.summary) + "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function setText(selector, value) {
    if (!value) {
      return;
    }
    document.querySelectorAll(selector).forEach(function (node) {
      node.textContent = value;
    });
  }

  function setHref(selector, value) {
    if (!value) {
      return;
    }
    document.querySelectorAll(selector).forEach(function (node) {
      node.setAttribute("href", value);
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
