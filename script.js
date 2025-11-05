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

const story = [
  {
    type: "cover",
    title: "Mila's Moonlit Garden",
    subtitle: "An interactive bedtime adventure",
    description: [
      "Welcome to a digital-first picture book experience. This framework packages your manuscript, illustrations, and chapter summaries so you can launch a magical story without writing new code.",
      "Swap in custom copy and artwork, or use the starter content to prototype a bedtime journey for young readers.",
    ],
  },
  {
    title: "Invitation Under the Stars",
    subtitle: "Chapter One",
    description: [
      "Moonlight spills across Mila's windowsill along with a shimmering note. The fireflies are hosting a midnight celebration and only the bravest dreamers are invited.",
      "Introduce the main character and the spark that begins the adventure. Keep sentences short and rhythmic to support read-aloud sessions.",
    ],
  },
  {
    title: "Footsteps on the Glow Path",
    subtitle: "Chapter Two",
    description: [
      "Mila tiptoes into the garden, following glowing stepping stones that appear one by one. Each step reveals a new sound and scent for young readers to explore.",
      "Use this chapter to show off sensory details. Encourage interaction by prompting children to mimic the sounds Mila hears.",
    ],
  },
  {
    title: "The Whispering Trees",
    subtitle: "Chapter Three",
    description: [
      "Tall trees bend low to greet Mila, their leaves rustling secret messages. She meets Whistle the owl, who offers to guide her deeper into the Moonlit Garden.",
      "Introduce supporting characters and lay the groundwork for choices that keep kids engaged with the narrative.",
    ],
  },
  {
    title: "Songs of the Sparkle Pond",
    subtitle: "Chapter Four",
    description: [
      "At the pond, Ripple the frog plucks melodies from the water. Mila learns that music can unlock hidden doors throughout the night.",
      "This chapter can host your first mini-activity. Invite readers to clap a rhythm or hum along as Mila discovers the pond's tune.",
    ],
  },
  {
    title: "Lantern Fruit Quest",
    subtitle: "Chapter Five",
    description: [
      "Lantern fruits sway from silver vines, each containing a glowing note of the moon's lullaby. Mila must collect them gently before they float away.",
      "Great for simple tap-or-click games, this chapter demonstrates how you can weave interactive tasks between narrative beats.",
    ],
  },
  {
    title: "Firefly Chorus",
    subtitle: "Chapter Six",
    description: [
      "Fireflies swirl in choreographed patterns, spelling out hints for Mila's next step. Captain Glimmer explains the rules of their twinkling language.",
      "Use this slot to add educational sidebars. Brief facts help caregivers extend the story into a learning moment.",
    ],
  },
  {
    title: "Moonbeam Maze",
    subtitle: "Chapter Seven",
    description: [
      "Mila enters a maze formed from soft moonbeams. Each turn brightens or dims depending on her confidence in the song she's building.",
      "Encourage problem solving here—pose a riddle or a simple puzzle that lets readers feel clever when the beams glow brighter.",
    ],
  },
  {
    title: "Garden of Echoes",
    subtitle: "Chapter Eight",
    description: [
      "Every word Mila whispers repeats through the flowers. She practices the lullaby, fine-tuning the verses that will soothe the night creatures.",
      "Highlight repetition and call-and-response patterns so adults and children can perform the story together.",
    ],
  },
  {
    title: "Moonrise Gathering",
    subtitle: "Chapter Nine",
    description: [
      "Friends from each corner of the garden assemble beneath a rising moon. They bring instruments woven from petals, leaves, and twigs.",
      "This is a perfect place to showcase illustration spreads. Consider a panoramic image to celebrate the entire cast.",
    ],
  },
  {
    title: "Lullaby's Promise",
    subtitle: "Chapter Ten",
    description: [
      "The completed lullaby drifts into the sky, promising peaceful dreams for every listener. Mila tucks the final note into her pocket for the next adventure.",
      "Wrap up the journey with a gentle cooldown paragraph and a teaser for future stories to keep readers eager for more.",
    ],
  },
];

const startButton = document.getElementById("start-reading");
const chapterList = document.getElementById("chapter-list");
const pageNumber = document.getElementById("page-number");
const pageTitle = document.getElementById("page-title");
const pageContent = document.getElementById("page-content");
const illustration = document.getElementById("page-illustration");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progressBar = document.getElementById("progress");

progressBar.max = story.length - 1;

let currentIndex = 0;
let bookOpened = false;

function buildIllustrations() {
  story.forEach((entry, index) => {
    const colors = palette[index % palette.length];
    const title = entry.type === "cover" ? "Cover" : `Chapter ${index}`;
    const subtitle = entry.type === "cover" ? entry.subtitle : entry.title;
    entry.illustration = createIllustration(title, subtitle, colors);
    entry.alt = `${entry.type === "cover" ? "Cover art" : "Illustration"} for ${entry.title}`;
  });
}

function renderTOC() {
  chapterList.innerHTML = "";
  story.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.className = "chapter-list-item";
    const button = document.createElement("button");
    button.className = "chapter-button";
    button.type = "button";
    button.dataset.index = index.toString();
    button.textContent = entry.type === "cover" ? "Cover" : `${entry.subtitle}`;
    button.addEventListener("click", () => {
      openBook();
      goToIndex(index);
    });
    listItem.appendChild(button);
    chapterList.appendChild(listItem);
  });
}

function openBook() {
  if (bookOpened) return;
  bookOpened = true;
  startButton.disabled = true;
  startButton.textContent = "Book Opened";
  prevButton.disabled = false;
  nextButton.disabled = false;
  renderPage(currentIndex);
}

function goToIndex(index) {
  currentIndex = Math.min(Math.max(index, 0), story.length - 1);
  renderPage(currentIndex);
}

function renderPage(index) {
  const entry = story[index];
  if (!entry) return;

  const isCover = entry.type === "cover";
  pageNumber.textContent = isCover
    ? "Cover"
    : `Chapter ${index} of ${story.length - 1}`;
  pageTitle.textContent = entry.title;
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

  progressBar.value = index;
  progressBar.textContent = `${Math.round((index / (story.length - 1)) * 100)}%`;

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

buildIllustrations();
renderTOC();
renderPage(0);
