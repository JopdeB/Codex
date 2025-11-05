const palette = [
  { from: "#ff9a9e", to: "#fad0c4" },
  { from: "#a1c4fd", to: "#c2e9fb" },
  { from: "#fbc2eb", to: "#a6c1ee" },
  { from: "#84fab0", to: "#8fd3f4" },
  { from: "#fddb92", to: "#d1fdff" },
  { from: "#ffecd2", to: "#fcb69f" },
  { from: "#cfd9df", to: "#e2ebf0" },
  { from: "#d4fc79", to: "#96e6a1" },
  { from: "#fbc7d4", to: "#9795ef" },
  { from: "#f6d365", to: "#fda085" },
  { from: "#89f7fe", to: "#66a6ff" },
];

const chapterPattern = /Hoofdstuk\s+\d+\s+–\s+[\s\S]*?(?=(?:\nHoofdstuk\s+\d+\s+–\s+)|$)/g;

const storySource = "story.txt";

function normalizeParagraph(paragraph) {
  return paragraph
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function parseChapters(raw) {
  const matches = raw.match(chapterPattern) || [];
  return matches.map((block, index) => {
    const lines = block.split("\n");
    const heading = lines.shift().trim();
    const paragraphs = lines
      .join("\n")
      .split(/\n\s*\n/)
      .map(normalizeParagraph)
      .filter(Boolean);
    const headingMatch = heading.match(/^(Hoofdstuk\s+(\d+))\s+–\s+(.+)$/);
    const subtitle = headingMatch ? headingMatch[1] : heading;
    const title = headingMatch ? headingMatch[3] : heading;
    const chapterIndex = headingMatch ? Number(headingMatch[2]) : index + 1;
    return {
      type: "chapter",
      heading,
      subtitle,
      title,
      chapterIndex,
      description: paragraphs,
    };
  });
}

const coverEntry = {
  type: "cover",
  heading: "Cover",
  subtitle: "Cover",
  title: "De Sleutels van de Melkweg - Deel I: Grogu en de drie sleutels",
  description: [
    "Stap het digitale leesavontuur De Sleutels van de Melkweg - Deel I: Grogu en de drie sleutels binnen en ontmoet de Mandalorian, Grogu en de jonge Jedi meteen op de eerste pagina.",
    "Gebruik de inhoudsopgave of de navigatieknoppen om snel door alle tien hoofdstukken van het Nederlandse verhaal te reizen en de drie Sleutels van de Melkweg te ontdekken.",
  ],
};

let story = [];
let chapterCount = 0;

function createIllustration(title, subtitle, colors) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colors.from}"/>
        <stop offset="100%" stop-color="${colors.to}"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" rx="48" fill="url(#grad)"/>
    <g fill="#ffffff" opacity="0.5">
      <circle cx="120" cy="120" r="48"/>
      <circle cx="680" cy="140" r="32"/>
      <circle cx="200" cy="520" r="28"/>
      <circle cx="620" cy="460" r="44"/>
    </g>
    <text x="50%" y="45%" text-anchor="middle" font-family="'Chewy', 'Nunito', sans-serif" font-size="64" fill="#ffffff">${title}</text>
    <text x="50%" y="60%" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="28" fill="#ffffff">${subtitle}</text>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const startButton = document.getElementById("start-reading");
const chapterList = document.getElementById("chapter-list");
const pageNumber = document.getElementById("page-number");
const pageTitle = document.getElementById("page-title");
const pageContent = document.getElementById("page-content");
const illustration = document.getElementById("page-illustration");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progressBar = document.getElementById("progress");

let storyLoaded = false;
let currentIndex = 0;
let bookOpened = false;

progressBar.max = 1;
progressBar.value = 0;
progressBar.textContent = "0%";
progressBar.setAttribute("aria-valuenow", "0");
progressBar.setAttribute("aria-valuetext", "Nog geen inhoud");

function showLoadingState() {
  storyLoaded = false;
  bookOpened = false;
  currentIndex = 0;
  pageNumber.textContent = "";
  pageTitle.textContent = "Verhaal wordt geladen…";
  pageContent.innerHTML = "";
  const loadingParagraph = document.createElement("p");
  loadingParagraph.textContent = "Een ogenblik geduld terwijl we het verhaal ophalen.";
  pageContent.appendChild(loadingParagraph);
  illustration.removeAttribute("src");
  illustration.alt = "";
  startButton.disabled = true;
  startButton.textContent = "Bezig met laden…";
  prevButton.disabled = true;
  nextButton.disabled = true;
  progressBar.value = 0;
  progressBar.textContent = "0%";
  progressBar.setAttribute("aria-valuenow", "0");
  progressBar.setAttribute("aria-valuetext", "Nog geen inhoud");
}

function showErrorState(message) {
  storyLoaded = false;
  pageNumber.textContent = "";
  pageTitle.textContent = "Laden mislukt";
  pageContent.innerHTML = "";
  const errorParagraph = document.createElement("p");
  errorParagraph.textContent = message;
  pageContent.appendChild(errorParagraph);
  illustration.removeAttribute("src");
  illustration.alt = "";
  chapterList.innerHTML = "";
  startButton.disabled = true;
  startButton.textContent = "Niet beschikbaar";
  prevButton.disabled = true;
  nextButton.disabled = true;
  progressBar.value = 0;
  progressBar.textContent = "0%";
  progressBar.setAttribute("aria-valuenow", "0");
  progressBar.setAttribute("aria-valuetext", "Laden mislukt");
}

function initializeStory(rawStory) {
  const trimmed = rawStory.trim();
  if (!trimmed) {
    throw new Error("Verhaalbestand is leeg.");
  }

  const chapters = parseChapters(trimmed);
  if (!chapters.length) {
    throw new Error("Geen hoofdstukken gevonden in het verhaalbestand.");
  }

  chapterCount = chapters.length;
  story = [coverEntry, ...chapters];
  storyLoaded = true;
  progressBar.max = Math.max(story.length - 1, 1);
  buildIllustrations();
  renderTOC();
  renderPage(0);
  startButton.disabled = false;
  startButton.textContent = "Open het boek";
}

async function loadStory() {
  try {
    const response = await fetch(storySource);
    if (!response.ok) {
      throw new Error(`Kon verhaal niet ophalen (status ${response.status})`);
    }
    const text = await response.text();
    initializeStory(text);
  } catch (error) {
    console.error(error);
    showErrorState("Het verhaal kon niet worden geladen. Vernieuw de pagina of probeer het later opnieuw.");
  }
}

function buildIllustrations() {
  if (!story.length) return;
  story.forEach((entry, index) => {
    const colors = palette[index % palette.length];
    const title = entry.type === "cover" ? entry.title : entry.subtitle;
    const subtitle = entry.type === "cover" ? entry.subtitle : entry.title;
    entry.illustration = createIllustration(title, subtitle, colors);
    entry.alt = entry.type === "cover"
      ? `Coverillustratie voor ${entry.title}`
      : `Illustratie bij ${entry.heading}`;
  });
}

function renderTOC() {
  chapterList.innerHTML = "";
  if (!story.length) return;
  story.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.className = "chapter-list-item";
    const button = document.createElement("button");
    button.className = "chapter-button";
    button.type = "button";
    button.dataset.index = index.toString();
    button.textContent = entry.heading;
    button.addEventListener("click", () => {
      openBook();
      goToIndex(index);
    });
    listItem.appendChild(button);
    chapterList.appendChild(listItem);
  });
}

function openBook() {
  if (!storyLoaded || bookOpened) return;
  bookOpened = true;
  startButton.disabled = true;
  startButton.textContent = "Boek geopend";
  prevButton.disabled = false;
  nextButton.disabled = false;
  renderPage(currentIndex);
}

function goToIndex(index) {
  if (!storyLoaded || !story.length) return;
  currentIndex = Math.min(Math.max(index, 0), story.length - 1);
  renderPage(currentIndex);
}

function renderPage(index) {
  const entry = story[index];
  if (!storyLoaded || !entry) {
    return;
  }

  const isCover = entry.type === "cover";
  pageNumber.textContent = isCover
    ? "Cover"
    : `${entry.subtitle} van ${chapterCount}`;
  pageTitle.textContent = isCover ? entry.title : entry.heading;
  pageContent.innerHTML = "";
  entry.description.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    pageContent.appendChild(p);
  });

  illustration.src = entry.illustration;
  illustration.alt = entry.alt;

  if (!bookOpened) {
    prevButton.disabled = true;
    nextButton.disabled = true;
  } else {
    prevButton.disabled = index === 0;
    nextButton.disabled = index === story.length - 1;
  }

  const maxIndex = Math.max(story.length - 1, 1);
  const percentage = Math.round((index / maxIndex) * 100);
  progressBar.value = index;
  progressBar.textContent = `${percentage}%`;
  progressBar.setAttribute("aria-valuenow", index.toString());
  progressBar.setAttribute("aria-valuetext", isCover ? "Cover" : `${entry.subtitle} van ${chapterCount}`);

  document
    .querySelectorAll(".chapter-button")
    .forEach((button) => button.classList.remove("active"));
  const activeButton = document.querySelector(
    `.chapter-button[data-index="${index}"]`
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

startButton.addEventListener("click", () => {
  openBook();
  goToIndex(0);
});

prevButton.addEventListener("click", () => {
  goToIndex(currentIndex - 1);
});

nextButton.addEventListener("click", () => {
  goToIndex(currentIndex + 1);
});

showLoadingState();
loadStory();
