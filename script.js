/* NAV toggle */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("main-nav");
  toggle?.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  /* Inject 30 gallery items dynamically (so you just add images in /memories/) */
  const gallery = document.getElementById("gallery");
  const captions = [
    "NAAS Agro-Summit 2024 — with Farmer Akin Alabi",
    "Elected as NAAS President",
    "Ojude Faaji Cultural Festival",
    "Freshers' Week event",
    "NAAS Super League — final",
    "Provost Cup Finals",
    "War Against Drug Abuse Seminar (NDLEA)",
    "Tutorial & welfare initiative",
    "Student security advocacy",
    "Award of Excellence in Leadership",
    "Executive of the Year — NAAS OOU",
    "Most Influential Senator — NAAS OOU",
    "Clique recognition — Bat Boys",
    "Two-time Best Class Rep nominee",
    "Leadership conference panel",
    "Fundraising for indigent students",
    "Mental Health Support Initiative",
    "Leo Club event — Ayetoro Campus",
    "Community outreach",
    "Project coordination",
    "Agri-tech demo",
    "Field visit / extension",
    "Graduation day",
    "Team photo",
    "Volunteer activity",
    "Workshop / training",
    "Media feature",
    "Award ceremony",
    "Group photo with colleagues",
    "Memorable campus moment"
  ];

  // Create 30 figure elements
  for (let i = 1; i <= 30; i++) {
    const fig = document.createElement("figure");
    const img = document.createElement("img");
    // image path: memories/photo1.jpg ... change if your filenames differ
    img.src = `memories/photo${i}.jpg`;
    img.alt = captions[i-1] || `Memory ${i}`;
    img.loading = "lazy";
    const cap = document.createElement("figcaption");
    cap.textContent = captions[i-1] || `Memory ${i}`;
    fig.appendChild(img);
    fig.appendChild(cap);
    // add data-index for lightbox navigation
    fig.dataset.index = i-1;
    gallery.appendChild(fig);
  }

  /* Lightbox behavior */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCaption = document.getElementById("lb-caption");
  const closeBtn = document.querySelector(".lb-close");
  const prevBtn = document.querySelector(".lb-prev");
  const nextBtn = document.querySelector(".lb-next");

  let currentIndex = 0;

  function showLightbox(index) {
    const imgEl = gallery.querySelectorAll("figure img")[index];
    if (!imgEl) return;
    const src = imgEl.src;
    const caption = imgEl.alt;
    lbImg.src = src;
    lbImg.alt = caption;
    lbCaption.textContent = caption;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
    currentIndex = index;
  }

  function hideLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lbImg.src = "";
  }

  function prevImage() {
    const newIndex = (currentIndex - 1 + 30) % 30;
    showLightbox(newIndex);
  }

  function nextImage() {
    const newIndex = (currentIndex + 1) % 30;
    showLightbox(newIndex);
  }

  // Open when clicking any gallery image
  gallery.addEventListener("click", (e) => {
    const fig = e.target.closest("figure");
    if (!fig) return;
    const idx = Number(fig.dataset.index);
    showLightbox(idx);
  });

  closeBtn.addEventListener("click", hideLightbox);
  prevBtn.addEventListener("click", prevImage);
  nextBtn.addEventListener("click", nextImage);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;
    if (e.key === "Escape") hideLightbox();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  });

  // Close on backdrop click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) hideLightbox();
  });

});
