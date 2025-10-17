const pages = [
  {
    id: "start",
    title: "A Moonbeam Invitation",
    scene: "moon",
    illustrationAlt: "Mila gazing up at the moon as sparkles swirl in her garden.",
    content: [
      "The moon leaned low over Mila's window, painting her garden in silver light. A shimmering envelope drifted onto her pillow with a soft pop of stardust.",
      "Inside was a letter written in twinkling ink: 'Dear Mila, the Moonlit Garden is blooming tonight, and the fireflies have a mystery to solve. Will you join us?'",
    ],
    funFact:
      "Fireflies use their glow to talk to one another—some even flash in special patterns to say hello!",
    next: "gardenGathering",
    progressIndex: 1,
    status: "Mila has discovered a magical invitation. Tap Next when you're ready to follow her outside!",
  },
  {
    id: "gardenGathering",
    title: "Footsteps in the Glow",
    scene: "garden",
    illustrationAlt: "Fireflies swirling around flowers shaped like stars in Mila's garden.",
    content: [
      "Mila tiptoed into the night. Flowers shaped like stars hummed gentle notes while fireflies circled in excited loops.",
      "Captain Glimmer, the tiniest firefly with the bravest heart, zipped to her shoulder. 'We're missing the moon's lullaby,' he whispered. 'Will you help us find it?'",
    ],
    funFact:
      "Some flowers close their petals at night to keep warm and safe—these are called 'nyctinastic' plants!",
    activity: {
      type: "prompt",
      question: "What do you think the moon's lullaby might sound like? Use a describing word!",
      placeholder: "e.g. soft, shimmery, gentle",
      correctAnswers: ["soft", "gentle", "calm", "hushed", "quiet", "shimmery", "glowing", "sweet"],
      successMessage: "Beautiful! Captain Glimmer nods. 'That's just the kind of song we're searching for.'",
      retryMessage: "That's a curious guess! Try a describing word—think of how a bedtime song makes you feel.",
    },
    next: "chooseFriend",
    progressIndex: 2,
    status: "Captain Glimmer needs a word to guide the search. Share one to warm up the lullaby!",
  },
  {
    id: "chooseFriend",
    title: "Choosing a Guide",
    scene: "garden",
    illustrationAlt: "Two friendly creatures waiting at a fork in the glowing path.",
    content: [
      "Two garden friends stepped from the glow. Whistle the owl twirled a silver feather, and Ripple the frog balanced moon drops on his fingertips.",
      "'Pick me,' hooted Whistle. 'I'll lead you through the Forest of Whispers.' Ripple grinned. 'Or come with me to the Sparkle Pond. Lullabies love water!'",
    ],
    funFact:
      "Owls can swivel their heads almost all the way around to spot helpful clues in the dark!",
    choices: [
      {
        text: "Follow Whistle into the Forest of Whispers",
        next: "forestSong",
        summary: "Whistle glides ahead between glowing trees.",
      },
      {
        text: "Bounce with Ripple to the Sparkle Pond",
        next: "sparklePond",
        summary: "Ripple splashes laughter on every lily pad.",
      },
    ],
    progressIndex: 3,
    status: "Which friend feels right for the journey? Tap a path to continue the adventure.",
  },
  {
    id: "forestSong",
    title: "The Forest of Whispers",
    scene: "forest",
    illustrationAlt: "Tall trees with glowing leaves and soft musical notes floating between branches.",
    content: [
      "Whistle's wings brushed song notes from the leaves. Every tree hummed a piece of the lullaby, but the last notes hid in tiny lantern fruits dangling low.",
      "'They shy away unless you're gentle,' Whistle said. 'Maybe a friendly touch will coax them out.'",
    ],
    funFact:
      "Many plants use their leaves like tiny solar panels to sip energy during the day and glow softly at night in our story world!",
    activity: {
      type: "collect",
      instruction: "Tap the lantern fruits to gather the final notes.",
      items: ["Do", "Re", "Mi"],
      successMessage: "With the notes collected, the forest hums a warm chord that wraps around Mila like a hug.",
    },
    next: "celebration",
    progressIndex: 4,
    status: "There are three shy lantern fruits here. Collect them all to finish the forest melody!",
  },
  {
    id: "sparklePond",
    title: "Secrets of the Sparkle Pond",
    scene: "pond",
    illustrationAlt: "A pond shimmering with ripples shaped like music notes.",
    content: [
      "Ripple bounced from lily pad to lily pad, sending rings of light across the water. Every ripple chimed a different note.",
      "'If we match the ripples to the right pattern, the lullaby will rise from the pond,' Ripple croaked. 'Can you remember the rhythm?'",
    ],
    funFact:
      "Frogs sing to each other using their throats like stretchy drums—each species has its own special rhythm!",
    activity: {
      type: "prompt",
      question: "Clap a rhythm and then type a word that matches its beat (like 'ta-da' or 'la-la-la').",
      placeholder: "Type your rhythm here",
      correctAnswers: ["ta-da", "la-la", "la-la-la", "dum-dee", "ta-da-da", "la-la-la"],
      successMessage: "Ripple repeats your rhythm exactly and the pond glows brighter with every beat!",
      retryMessage: "Try typing the rhythm the way you clapped it—use small syllables like 'ta' or 'la'.",
    },
    next: "celebration",
    progressIndex: 4,
    status: "Tap in a playful rhythm so Ripple can echo it back!",
  },
  {
    id: "celebration",
    title: "Moonlight Encore",
    scene: "celebration",
    illustrationAlt: "Mila and her friends dancing under a full moon with musical fireflies.",
    content: [
      "The lullaby twirled into the sky. The moon beamed brighter, and the fireflies drew loops of thanks around Mila's heart.",
      "Captain Glimmer presented a tiny charm shaped like a crescent. 'Any night you need a song, hold this and we'll be there,' he promised.",
    ],
    funFact:
      "Music can change how we feel—slow songs help our hearts relax, which is perfect for bedtime adventures!",
    next: null,
    progressIndex: 5,
    status: "You've completed tonight's adventure! Revisit other paths to hear the lullaby in new ways.",
  },
];

const pageMap = new Map(pages.map((page) => [page.id, page]));
const maxProgress = Math.max(...pages.map((page) => page.progressIndex));

const startButton = document.getElementById("start-story");
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");
const readButton = document.getElementById("read-aloud");
const progressBar = document.getElementById("progress");
const statusElement = document.getElementById("status");
const titleElement = document.getElementById("page-title");
const textElement = document.getElementById("story-text");
const funFactElement = document.getElementById("fun-fact");
const choicesElement = document.getElementById("choices");
const activityElement = document.getElementById("activity");
const illustrationElement = document.getElementById("illustration");

let storyStarted = false;
let currentPageId = null;
let readTimer = null;
let currentWordIndex = 0;
const visitedSteps = new Set();
const historyStack = [];
const pageState = new Map();

startButton.addEventListener("click", () => {
  storyStarted = true;
  startButton.disabled = true;
  startButton.textContent = "Adventure in Progress";
  renderPage("start");
});

prevButton.addEventListener("click", () => {
  if (historyStack.length === 0) {
    return;
  }
  stopReadAlong();
  const previous = historyStack.pop();
  renderPage(previous, { pushHistory: false });
});

nextButton.addEventListener("click", () => {
  if (!currentPageId) {
    return;
  }
  const currentPage = pageMap.get(currentPageId);
  if (!currentPage?.next) {
    return;
  }
  stopReadAlong();
  renderPage(currentPage.next);
});

readButton.addEventListener("click", () => {
  if (!storyStarted || !currentPageId) {
    return;
  }
  if (readTimer) {
    stopReadAlong();
  } else {
    startReadAlong();
  }
});

function renderPage(pageId, options = { pushHistory: true }) {
  const page = pageMap.get(pageId);
  if (!page) {
    return;
  }

  if (currentPageId && options.pushHistory) {
    historyStack.push(currentPageId);
  }

  currentPageId = pageId;
  updateProgress(page);
  statusElement.textContent = page.status ?? "";
  titleElement.textContent = page.title;
  illustrationElement.dataset.scene = page.scene ?? "moon";
  illustrationElement.setAttribute("aria-label", page.illustrationAlt ?? "");
  createSparkles(page.scene);
  renderIllustrationCaption(page);

  textElement.innerHTML = page.content.map((paragraph) => `<p>${wrapWords(paragraph)}</p>`).join("");
  funFactElement.textContent = page.funFact ?? "";

  renderChoices(page);
  renderActivity(page);
  configureNavigation(page);
  stopReadAlong();
}

function renderIllustrationCaption(page) {
  illustrationElement.querySelectorAll(".illustration-caption").forEach((caption) => caption.remove());
  if (!page.illustrationAlt) {
    return;
  }
  const caption = document.createElement("p");
  caption.className = "illustration-caption";
  caption.textContent = page.illustrationAlt;
  illustrationElement.appendChild(caption);
}

function wrapWords(text) {
  return text
    .split(/(\s+)/)
    .map((segment) => {
      if (/^\s+$/.test(segment)) {
        return segment;
      }
      return `<span class="word">${segment}</span>`;
    })
    .join("");
}

function renderChoices(page) {
  choicesElement.innerHTML = "";
  if (!page.choices) {
    return;
  }
  page.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.type = "button";
    button.textContent = choice.text;
    button.addEventListener("click", () => {
      const state = pageState.get(page.id) ?? {};
      state.selectedChoice = choice.next;
      pageState.set(page.id, state);
      statusElement.textContent = choice.summary ?? page.status ?? "";
      renderPage(choice.next);
    });
    choicesElement.appendChild(button);
  });
}

function renderActivity(page) {
  activityElement.innerHTML = "";
  const activity = page.activity;
  if (!activity) {
    activityElement.classList.remove("has-activity");
    return;
  }
  activityElement.classList.add("has-activity");
  if (activity.type === "prompt") {
    renderPromptActivity(page, activity);
  } else if (activity.type === "collect") {
    renderCollectActivity(page, activity);
  }
}

function renderPromptActivity(page, activity) {
  const state = pageState.get(page.id) ?? {};
  const title = document.createElement("h3");
  title.textContent = "Try this!";
  activityElement.appendChild(title);

  const question = document.createElement("p");
  question.textContent = activity.question;
  activityElement.appendChild(question);

  const form = document.createElement("form");
  form.className = "prompt-form";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = activity.placeholder ?? "Type here";
  input.value = state.answer ?? "";

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = state.completed ? "Great job!" : "Share it";

  const feedback = document.createElement("p");
  feedback.className = "feedback";
  if (state.completed) {
    feedback.textContent = activity.successMessage ?? "Wonderful!";
  }

  form.append(input, submit, feedback);
  activityElement.appendChild(form);

  if (state.completed) {
    input.disabled = true;
    submit.disabled = true;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const answer = input.value.trim().toLowerCase();
    if (!answer) {
      feedback.textContent = "Try writing your idea!";
      feedback.dataset.state = "retry";
      return;
    }
    const accepted = activity.correctAnswers?.some((item) => item.toLowerCase() === answer);
    if (accepted) {
      state.completed = true;
      state.answer = input.value.trim();
      submit.textContent = "Great job!";
      submit.disabled = true;
      input.disabled = true;
      feedback.textContent = activity.successMessage ?? "Wonderful!";
      feedback.dataset.state = "success";
    } else {
      state.completed = false;
      state.answer = input.value.trim();
      feedback.textContent = activity.retryMessage ?? "That's an interesting idea—try another!";
      feedback.dataset.state = "retry";
    }
    pageState.set(page.id, state);
  });
}

function renderCollectActivity(page, activity) {
  const state = pageState.get(page.id) ?? { collected: new Set() };
  if (!(state.collected instanceof Set)) {
    state.collected = new Set(state.collected ?? []);
  }

  const title = document.createElement("h3");
  title.textContent = activity.instruction ?? "Collect the glowing notes.";
  activityElement.appendChild(title);

  const container = document.createElement("div");
  container.className = "collect-container";

  const message = document.createElement("p");
  message.className = "feedback";
  if (state.collected.size === activity.items.length) {
    message.textContent = activity.successMessage;
    message.dataset.state = "success";
  } else {
    message.textContent = "Tap each lantern fruit to hear it sing.";
  }

  activity.items.forEach((label) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "collect-item";
    item.textContent = label;
    if (state.collected.has(label)) {
      item.classList.add("collected");
    }
    item.addEventListener("click", () => {
      if (state.collected.has(label)) {
        return;
      }
      createSparkleBurst(item);
      state.collected.add(label);
      item.classList.add("collected");
      if (state.collected.size === activity.items.length) {
        message.textContent = activity.successMessage ?? "You gathered every glow!";
        message.dataset.state = "success";
      } else {
        message.textContent = `Only ${activity.items.length - state.collected.size} more to go!`;
        message.dataset.state = "progress";
      }
      pageState.set(page.id, state);
    });
    container.appendChild(item);
  });

  activityElement.append(container, message);
}

function configureNavigation(page) {
  prevButton.disabled = historyStack.length === 0;
  const hasChoices = Array.isArray(page.choices) && page.choices.length > 0;
  nextButton.disabled = !page.next || hasChoices;
  nextButton.textContent = page.next ? "Next" : "The End";
  readButton.disabled = !storyStarted;
}

function startReadAlong() {
  const words = textElement.querySelectorAll(".word");
  if (!words.length) {
    return;
  }
  words.forEach((word) => word.classList.remove("highlight"));
  currentWordIndex = 0;
  readButton.textContent = "Stop Read Along";
  readTimer = setInterval(() => {
    if (currentWordIndex > 0 && words[currentWordIndex - 1]) {
      words[currentWordIndex - 1].classList.remove("highlight");
    }
    if (currentWordIndex >= words.length) {
      stopReadAlong();
      return;
    }
    words[currentWordIndex].classList.add("highlight");
    currentWordIndex += 1;
  }, 350);
}

function stopReadAlong() {
  if (readTimer) {
    clearInterval(readTimer);
    readTimer = null;
  }
  textElement.querySelectorAll(".word").forEach((word) => word.classList.remove("highlight"));
  readButton.textContent = "Read Along";
}

function updateProgress(page) {
  visitedSteps.add(page.progressIndex);
  progressBar.value = visitedSteps.size / maxProgress;
  progressBar.textContent = `${Math.round((visitedSteps.size / maxProgress) * 100)}%`;
}

function createSparkles(scene) {
  illustrationElement.querySelectorAll(".sparkle").forEach((sparkle) => sparkle.remove());
  const count = scene === "celebration" ? 18 : scene === "garden" ? 14 : 10;
  for (let index = 0; index < count; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.top = `${Math.random() * 90}%`;
    sparkle.style.left = `${Math.random() * 90}%`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    sparkle.style.animationDuration = `${1.8 + Math.random()}s`;
    illustrationElement.appendChild(sparkle);
  }
}

function createSparkleBurst(target) {
  for (let index = 0; index < 4; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.top = `${50 + (Math.random() - 0.5) * 80}%`;
    sparkle.style.left = `${50 + (Math.random() - 0.5) * 80}%`;
    sparkle.style.animationDuration = `${1 + Math.random()}s`;
    target.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1800);
  }
}

// Initialize accessibility text when the story hasn't started yet.
statusElement.textContent = "Press Start to open the moonlit invitation.";
progressBar.value = 0;
progressBar.textContent = "0%";
readButton.disabled = true;
