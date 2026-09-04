(function () {
  installBrandLogo();
  installFooterCredit();

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

  Promise.all([
    fetchJson("/data/site-content.json"),
    fetchJson("/data/customer-content.json").catch(function () { return {}; })
  ])
    .then(function (results) {
      const content = mergeContent(results[0], results[1]);
      hydrateBusinessContent(content);
      hydrateServices(content);
      hydrateImages(content);
    })
    .catch(function () {
      document.documentElement.classList.add("content-fallback");
    });

  function fetchJson(path) {
    return fetch(path).then(function (response) {
      if (!response.ok) {
        throw new Error("Content file unavailable: " + path);
      }
      return response.json();
    });
  }

  function mergeContent(base, customer) {
    const merged = Object.assign({}, base || {});
    merged.business = Object.assign({}, (base && base.business) || {}, (customer && customer.business) || {});
    merged.images = Object.assign({}, (base && base.images) || {}, (customer && customer.images) || {});

    if (customer && customer.business && customer.business.phone) {
      merged.business.phone = customer.business.phone;
      merged.business.phoneDisplay = formatPhone(customer.business.phone);
      merged.business.phoneHref = phoneHref(customer.business.phone);
    }

    if (customer && customer.business && customer.business.email) {
      merged.business.email = customer.business.email;
      merged.business.emailHref = "mailto:" + customer.business.email;
    }

    return merged;
  }

  function installBrandLogo() {
    const style = document.createElement("style");
    style.textContent = [
      ".brand-logo{display:block;flex:0 0 auto;line-height:0}",
      ".brand-logo img{display:block;height:auto;max-width:100%;object-fit:contain}",
      ".brand-logo-header{width:104px}",
      ".brand-logo-footer{width:230px;margin-bottom:.75rem}",
      ".site-header .brand{min-width:104px}",
      ".site-header .brand-logo img{border:1px solid rgba(255,255,255,.55)}",
      "@media (min-width:900px){.brand-logo-header{width:112px}.site-header .brand{min-width:112px}.header-inner{min-height:112px}}",
      "@media (max-width:680px){.brand-logo-header{width:82px}.site-header .brand{min-width:82px}.header-inner{min-height:88px}}",
      "@media (max-width:420px){.brand-logo-header{width:72px}.site-header .brand{min-width:72px}.header-inner{min-height:82px}}"
    ].join("");
    document.head.appendChild(style);

    document.querySelectorAll("a.brand").forEach(function (brand) {
      const isFooter = Boolean(brand.closest(".site-footer"));
      brand.setAttribute("aria-label", "Ray's Mobile Repair home");
      brand.innerHTML =
        '<span class="brand-logo ' +
        (isFooter ? "brand-logo-footer" : "brand-logo-header") +
        '"><img src="/assets/images/business-card-logo-contact.jpg?v=official-20260904" alt="Ray\'s Mobile Repair"></span>';
    });
  }

  function installFooterCredit() {
    const footer = document.querySelector(".site-footer");
    if (!footer || footer.querySelector(".sixteen-oaks-credit")) {
      return;
    }

    const style = document.createElement("style");
    style.textContent = [
      ".sixteen-oaks-credit{display:block;max-width:1200px;margin:1.25rem auto 0;padding:1rem 1rem 0;border-top:1px solid #5d6a66;text-align:center;font-size:.86rem;font-weight:500;letter-spacing:.02em;color:#cfd4d2}",
      ".sixteen-oaks-credit span{display:inline-block;white-space:normal;color:#cfd4d2}"
    ].join("");
    document.head.appendChild(style);

    const credit = document.createElement("div");
    credit.className = "sixteen-oaks-credit";
    credit.setAttribute("aria-label", "Website credit");
    credit.innerHTML = "<span>Built by Sixteen Oaks Workflow Solutions</span>";
    footer.appendChild(credit);
  }

  function hydrateBusinessContent(content) {
    const business = content.business || {};
    const messages = content.siteMessages || {};

    setText("[data-content='phone-display']", business.phoneDisplay || formatPhone(business.phone));
    setText("[data-content='phone']", business.phone);
    setText("[data-content='email']", business.email);
    setText("[data-content='service-area']", business.serviceArea);
    setText("[data-content='location']", business.location);
    setText("[data-content='hero-title']", messages.heroTitle);
    setText("[data-content='hero-subtitle']", messages.heroSubtitle);
    setText("[data-content='urgent-title']", messages.urgentBannerTitle);
    setText("[data-content='urgent-text']", messages.urgentBannerText);
    setText("[data-content='service-area-text']", messages.serviceAreaText);
    setText("[data-content='careers-banner']", messages.careersBanner);

    setHref("[data-link='phone']", business.phoneHref || phoneHref(business.phone));
    setHref("[data-link='email']", business.emailHref || (business.email ? "mailto:" + business.email : ""));
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

  function hydrateImages(content) {
    const images = content.images || {};

    document.querySelectorAll("[data-image]").forEach(function (node) {
      const key = node.getAttribute("data-image");
      const src = images[key];
      if (!src) {
        return;
      }

      if (node.tagName === "IMG") {
        node.setAttribute("src", src);
        return;
      }

      const overlay = node.getAttribute("data-image-overlay");
      node.style.backgroundImage = overlay
        ? overlay + ", url('" + cssUrl(src) + "')"
        : "url('" + cssUrl(src) + "')";
    });
  }

  function formatPhone(value) {
    const digits = String(value || "").replace(/\D/g, "");
    const local = digits.length === 11 && digits.charAt(0) === "1" ? digits.slice(1) : digits;
    if (local.length === 10) {
      return "(" + local.slice(0, 3) + ") " + local.slice(3, 6) + "-" + local.slice(6);
    }
    return value || "";
  }

  function phoneHref(value) {
    const digits = String(value || "").replace(/\D/g, "");
    if (!digits) {
      return "";
    }
    return "tel:" + (digits.length === 10 ? "1" + digits : digits);
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

  function cssUrl(value) {
    return String(value).replace(/'/g, "%27");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
