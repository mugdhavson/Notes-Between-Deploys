(() => {
  // Active nav
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".top-nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === current) a.classList.add("active");
  });

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const nav = document.getElementById("primary-nav");
  const btn = document.querySelector(".nav-toggle");
  if (!nav || !btn) return;

  const openMenu = () => {
    nav.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
  };

  const closeMenu = () => {
    nav.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
  };

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Close after clicking a link (mobile UX)
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (e.target.closest("#primary-nav") || e.target.closest(".nav-toggle")) return;
    closeMenu();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // If resized back to desktop, ensure menu isn't stuck open
  // (matches CSS breakpoint max-width: 900px)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  // Safety: if returning via bfcache, ensure closed by default
  window.addEventListener("pageshow", closeMenu);
})();
