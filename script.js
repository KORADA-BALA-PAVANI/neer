const birthdayData = {
  friendName: "NEER",
  birthdayMessage: "Happy Birthday!",
  friendshipLevel: 99.9,

  letter: `My dearest bestie,

Today is your day, but somehow I feel lucky too — because life gave me a person like you.

Thank you for every stupid conversation, evening walks, every laugh that made no sense, every little fight, and every memory that became a story we still talk about.

I hope this bday brings you peace, confidence, beautiful surprises and everything your heart quietly wishes for.

No matter how much life changes, I hope we always find our way back to the same kind of laughter.

Neer, don't forget u have meee. Be strong and stay happy. Cheers to the birthday girl! ❤️

Happy Birthday, Neer. ❤️`,

  memories: [
    {
      image: "image/pic1.png",
      title: "Our College Memory",
      text: "Close up ad tesunapudu 😁.."
    },
    {
      image: "image/pic2.png",
      title: "Twinings Outfits",
      text: "A tiny moment that somehow became a huge memory. Pic medha click chey 💗"
    },
    {
      image: "image/pic3.png",
      title: "Always Us",
      text: "One more beautiful memory from our college days."
    }

    // Add another photo here if you want:
    // {
    //   image: "images/pic5.jpeg",
    //   title: "Another Memory",
    //   text: "Another little memory ❤️"
    // }
  ]
};


const quizQuestions = [
  [
    "Who is more likely to start laughing at the worst possible moment?",
    ["Me 😂", "You 😂", "Both of us", "Obviously both"]
  ],
  [
    "Who would survive longer without their phone?",
    ["Me", "You", "Neither", "Let's not test this"]
  ],
  [
    "Our most travelling plan usually starts with…",
    ["“From U”", "“From Gang”", "“Me”", "All three"]
  ],
  [
    "Who is more likely to send a random message at midnight?",
    ["Me", "You", "Both", "No one"]
  ],
  [
    "Our friendship is basically powered by…",
    ["Food", "Gossip", "Memories", "Everything"]
  ],
  [
    "If we get lost, who is most likely to say “I know the way”?",
    ["Me", "You", "Both", "Google Maps"]
  ],
  [
    "Who apologizes first after a silly fight?",
    ["Me", "You", "Depends", "We forget why we fought"]
  ],
  [
    "A perfect bestie day needs…",
    ["Food", "Long talks", "Random fun", "All of these"]
  ],
  [
    "Our conversations usually end with…",
    ["Good night", "One last thing", "More gossip", "3 hours later"]
  ],
  [
    "How well do you know your bestie?",
    ["A little", "Pretty well", "Very well", "Obviously 100%"]
  ]
];


const quizCorrectAnswers = [
  3, 1, 2, 2, 3, 3, 3, 3, 3, 3
];


const thisOrThatChoices = [
  ["Late-night talks 🌙", "Random calls 📞"],
  ["Food together 🍕", "Movies together 🎬"],
  ["Laughing for no reason 😂", "Deep conversations ❤️"]
];


let currentPage = 1;
let quizIndex = 0;
let score = 0;
let memoryIndex = 0;
let choiceIndex = 0;
let letterOpen = false;

const totalPages = 15;

const app = document.getElementById("app");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const indicator = document.getElementById("pageIndicator");
const toast = document.getElementById("toast");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");


/* -----------------------------
   Utility functions
----------------------------- */

function esc(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char];
  });
}


function imageHTML(memory) {
  return `
    <img
      src="${esc(memory.image)}"
      alt="${esc(memory.title)}"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"
    >
    <div class="placeholder-photo" style="display:none;">
      Add your photo here 📷
    </div>
  `;
}


function shell(content, cls = "") {
  return `
    <section class="page ${cls}">
      <div class="page-inner">
        ${content}
      </div>
    </section>
  `;
}


/* -----------------------------
   Main renderer
----------------------------- */

function render() {

  let content = "";
  let cls = "";

  switch (currentPage) {

    /* PAGE 1 */
    case 1:

      cls = "curtain";

      content = `
        <div class="heart"></div>

        <div class="eyebrow">
          A little surprise
        </div>

        <h1>Hey Bestie...</h1>

        <p class="script">
          I made something for you.
        </p>

        <button class="cta" onclick="startJourney()">
          START THE SURPRISE ✨
        </button>
      `;

      break;


    /* PAGE 2 */
    case 2:

      content = `
        <div class="eyebrow">
          Page 02 · A little message
        </div>

        <h2>Before anything else...</h2>

        <div class="card glass">

          <p class="lead typewriter">
            Happiest Bday Neer......... I hope ur doing well.
            Somehow I found u because of Banu Sir raa!
            From classmates to besties, we have a beautiful journey ✨
          </p>

          <p class="script">
            And I'm really glad I found you.
          </p>

        </div>
      `;

      break;


    /* PAGE 3 */
    case 3:

      content = `
        <div class="eyebrow">
          Page 03 · Our story
        </div>

        <h2>But ours...</h2>

        <div class="card glass story-lines">
          <span>Classroom / Hostel Gossips</span>
          <span>Travelling together</span>
          <span>Pranks</span>
        </div>

        <div class="script">
          We have a lot of memories from your BTech journey raa..
        </div>
      `;

      break;


    /* PAGE 4 */
    case 4: {

      const memory = birthdayData.memories[memoryIndex];

      content = `
        <div class="eyebrow">
          Page 04 · Memory ${memoryIndex + 1} / ${birthdayData.memories.length}
        </div>

        <h2>Remember this?</h2>

        <div class="memory glass" onclick="openMemory()">

          ${imageHTML(memory)}

          <div style="padding:15px 5px 2px">

            <h3>${esc(memory.title)}</h3>

            <p class="lead">
              ${esc(memory.text)}
            </p>

          </div>

        </div>

        <button class="cta" onclick="nextMemory()">
          ${
            memoryIndex < birthdayData.memories.length - 1
              ? "NEXT MEMORY →"
              : "CONTINUE →"
          }
        </button>
      `;

      break;
    }


    /* PAGE 5 */
    case 5: {

      const q = quizQuestions[quizIndex];

      const progress =
        ((quizIndex + 1) / quizQuestions.length) * 100;

      content = `
        <div class="eyebrow">
          Page 05 · Fun quiz
        </div>

        <h2>Okay... enough emotional stuff.</h2>

        <p class="lead">
          Let's see how well you actually know your bestie!
        </p>

        <div class="quiz">

          <div class="progress">
            <div style="width:${progress}%"></div>
          </div>

          <strong>
            Question ${quizIndex + 1} / ${quizQuestions.length}
          </strong>

          <h3>
            ${esc(q[0])}
          </h3>

          <div class="options">

            ${q[1]
              .map(
                (option, index) => `
                  <button
                    class="option"
                    onclick="answerQuiz(${index})"
                  >
                    ${esc(option)}
                  </button>
                `
              )
              .join("")}

          </div>

        </div>
      `;

      break;
    }


    /* PAGE 6 */
    case 6: {

      let message;

      if (score >= 9) {
        message = "Okay... you actually know me! 😭❤️";
      } else if (score >= 7) {
        message = "Not bad, bestie. You were paying attention! 😂";
      } else if (score >= 5) {
        message = "We have some catching up to do 😂";
      } else {
        message = "We may need a friendship training session 😂";
      }

      content = `
        <div class="eyebrow">
          Page 06 · Quiz result
        </div>

        <p class="script">
          Calculating Bestie Level...
        </p>

        <div class="score">
          ${score} / 10 💗
        </div>

        <h3>
          ${message}
        </h3>

        <p class="lead">
          Score saved for this little journey.
          The friendship itself is definitely not graded. ❤️
        </p>

        <button class="cta" onclick="goNext()">
          SEE OUR FRIENDSHIP LEVEL →
        </button>
      `;

      break;
    }


    /* PAGE 7 */
    case 7:

      content = `
        <div class="eyebrow">
          Page 07 · Friendship meter
        </div>

        <h2>
          FRIENDSHIP LEVEL
        </h2>

        <div
          id="meterNumber"
          class="score"
          style="font-size:clamp(4rem,11vw,8rem)"
        >
          0%
        </div>

        <div class="meter">
          <div id="meterFill"></div>
        </div>

        <p class="script">
          Some friendships are measured in years.<br>
          Ours is measured in memories. ❤️
        </p>
      `;

      break;


    /* PAGE 8 */
    case 8: {

      if (choiceIndex >= thisOrThatChoices.length) {

        content = `
          <div class="eyebrow">
            Page 08 · This or that
          </div>

          <h2>
            Yep... that sounds exactly like us. 💗
          </h2>

          <p class="script">
            No further evidence required.
          </p>

          <button class="cta" onclick="goNext()">
            CONTINUE THE JOURNEY →
          </button>
        `;

      } else {

        const choice = thisOrThatChoices[choiceIndex];

        content = `
          <div class="eyebrow">
            Page 08 · This or that
          </div>

          <h2>
            One more game...
          </h2>

          <div class="choice-wrap">

            <button
              class="choice"
              onclick="chooseThis()"
            >
              ${choice[0]}
            </button>

            <div class="vs">
              VS
            </div>

            <button
              class="choice"
              onclick="chooseThis()"
            >
              ${choice[1]}
            </button>

          </div>

          <p class="lead">
            ${choiceIndex + 1} / ${thisOrThatChoices.length}
          </p>
        `;
      }

      break;
    }


    /* PAGE 9 */
    case 9:

      content = `
        <div class="eyebrow">
          Page 09 · A serious question
        </div>

        <h2>
          One serious question...
        </h2>

        <p class="lead">
          If we could go back and relive just ONE day together,
          which day would you choose?
        </p>

        <textarea
          id="memoryAnswer"
          placeholder="Write the day or memory here... naku msg chey adhe ento Neer ❤️"
        ></textarea>

        <button class="cta" onclick="saveAnswer()">
          SAVE THIS MEMORY ❤️
        </button>
      `;

      break;


    /* PAGE 10 */
    case 10:

      if (letterOpen) {

        content = `
          <div class="eyebrow">
            Page 10 · The letter
          </div>

          <div class="letter">

            <div
              class="script"
              style="color:#b55b83;font-size:2.6rem"
            >
              For you, ${esc(birthdayData.friendName)}...
            </div>

            <div style="white-space:pre-line">
              ${esc(birthdayData.letter)}
            </div>

          </div>

          <button class="cta" onclick="goNext()">
            CONTINUE ❤️
          </button>
        `;

      } else {

        content = `
          <div class="eyebrow">
            Page 10 · Something I don't say often
          </div>

          <h2>
            I have something I don't say often...
          </h2>

          <div
            class="envelope"
            onclick="openLetter()"
          ></div>

          <button class="cta" onclick="openLetter()">
            OPEN THE LETTER 💌
          </button>
        `;
      }

      break;


    /* PAGE 11 */
    case 11: {

      const photos = birthdayData.memories.slice(0, 4);

      content = `
        <div class="eyebrow">
          Page 11 · Photo wall
        </div>

        <h2>
          A few pieces of our chaos...
        </h2>

        <div class="polaroids">

          ${photos
            .map(
              (memory, index) => `
                <div
                  class="polaroid p${index + 1}"
                  onclick="openSpecific('${encodeURIComponent(memory.image)}')"
                >

                  ${imageHTML(memory)}

                  <div
                    style="
                      font-family:Parisienne;
                      font-size:1.2rem;
                      margin-top:7px;
                    "
                  >
                    ${esc(memory.title)}
                  </div>

                </div>
              `
            )
            .join("")}

        </div>
      `;

      break;
    }


    /* PAGE 12 */
    case 12:

      content = `
        <div class="eyebrow">
          Page 12 · The final surprise
        </div>

        <h2>
          And finally...
        </h2>

        <p class="lead">
          There's one thing I really want you to know.
        </p>

        <button class="cta" onclick="goNext()">
          ONE LAST CLICK ✨
        </button>
      `;

      break;


    /* PAGE 13 */
    case 13:

      cls = "final";

      content = `
        <div
          class="firework"
          style="left:20%;top:25%"
        ></div>

        <div
          class="firework"
          style="right:22%;top:35%;animation-delay:.4s"
        ></div>

        <div
          class="firework"
          style="left:50%;top:15%;animation-delay:.8s"
        ></div>

        <div class="balloons">
          🎈 ✨ 🎈
        </div>

        <div class="eyebrow">
          Page 13 · The big reveal
        </div>

        <h1>
          HAPPY BIRTHDAY,<br>
          ${esc(birthdayData.friendName)} 🎂💗
        </h1>

        <p class="lead">
          ${esc(birthdayData.birthdayMessage)}
        </p>

        <div class="script">
          Today is all about you. ❤️
        </div>
      `;

      break;


    /* PAGE 14 */
    case 14:

      content = `
        <div class="eyebrow">
          Page 14 · From my heart
        </div>

        <p class="script">
          Thank you for being there.
        </p>

        <div class="card glass story-lines">

          <span>
            For the stupid conversations.
          </span>

          <span>
            The random calls. The fights. The laughter.
          </span>

          <span>
            The memories. And all the moments in between.
          </span>

        </div>

        <h3>
          Life may change a lot...
        </h3>

        <h3>
          But I hope our friendship never becomes just a memory.
        </h3>

        <h2>
          Happy Birthday, Bestie. ❤️
        </h2>
      `;

      break;


    /* PAGE 15 */
    case 15:

      content = `
        <div class="eyebrow">
          Page 15 · The end... or is it?
        </div>

        <h2>
          Our story doesn't end here.
        </h2>

        <p class="lead">
          This is just another memory we're adding to it.
        </p>

        <button class="cta" onclick="restart()">
          START THE JOURNEY AGAIN 🔄
        </button>
      `;

      break;
  }


  app.innerHTML = shell(content, cls);

  indicator.textContent =
    `${String(currentPage).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;


  backBtn.style.display =
    currentPage === 1 ? "none" : "block";


  /*
    Pages where NEXT button should be hidden.
    Page 8 is now handled internally, so it stays hidden.
  */
  nextBtn.style.display =
    [1, 4, 5, 6, 8, 9, 10, 12, 15].includes(currentPage)
      ? "none"
      : "block";


  if (currentPage === 7) {
    animateMeter();
  }

  if (currentPage === 1) {
    startParticles();
  }
}


/* -----------------------------
   Page transitions
----------------------------- */

function transition(callback) {

  const oldPage = app.firstElementChild;

  if (!oldPage) {
    callback();
    render();
    return;
  }

  oldPage.classList.add("fade-out");

  setTimeout(() => {
    callback();
    render();
  }, 300);
}


function goNext() {

  if (currentPage < totalPages) {

    transition(() => {
      currentPage++;
    });

  }
}


function goBack() {

  if (currentPage > 1) {

    transition(() => {
      currentPage--;
    });

  }
}


function startJourney() {

  transition(() => {
    currentPage = 2;
  });

}


function restart() {

  score = 0;
  quizIndex = 0;
  memoryIndex = 0;
  choiceIndex = 0;
  letterOpen = false;

  localStorage.removeItem("bestieMemoryAnswer");

  transition(() => {
    currentPage = 1;
  });

}


nextBtn.addEventListener("click", goNext);
backBtn.addEventListener("click", goBack);


/* -----------------------------
   Memories
----------------------------- */

function nextMemory() {

  if (memoryIndex < birthdayData.memories.length - 1) {

    memoryIndex++;

    render();

  } else {

    memoryIndex = 0;

    goNext();

  }

}


/* -----------------------------
   Quiz
----------------------------- */

function answerQuiz(answerIndex) {

  const correct =
    quizCorrectAnswers[quizIndex];

  const isCorrect =
    answerIndex === correct;

  if (isCorrect) {
    score++;
  }

  toastMsg(
    isCorrect
      ? "Bestie points! 💗"
      : "Hmm... I'll let that one slide 😂"
  );


  setTimeout(() => {

    if (quizIndex < quizQuestions.length - 1) {

      quizIndex++;
      render();

    } else {

      currentPage = 6;
      render();

      burstConfetti(100);
    }

  }, 600);

}


/* -----------------------------
   Friendship meter
----------------------------- */

function animateMeter() {

  const target =
    Number(birthdayData.friendshipLevel) || 99.9;

  const number =
    document.getElementById("meterNumber");

  const fill =
    document.getElementById("meterFill");

  if (!number || !fill) return;

  const start = 0;
  const duration = 2500;
  const startTime = performance.now();

  fill.style.width = "0%";

  function step(now) {

    const progress =
      Math.min(
        1,
        (now - startTime) / duration
      );

    const easing =
      1 - Math.pow(1 - progress, 3);

    const value =
      start + (target - start) * easing;

    number.textContent =
      value.toFixed(1) + "%";

    fill.style.width =
      value + "%";

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}


/* -----------------------------
   This or That
----------------------------- */

function chooseThis() {

  choiceIndex++;

  render();

}


/* -----------------------------
   Memory answer
----------------------------- */

function saveAnswer() {

  const textarea =
    document.getElementById("memoryAnswer");

  const answer =
    textarea?.value.trim();

  if (!answer) {

    toastMsg(
      "Write a little memory first 💗"
    );

    return;
  }

  localStorage.setItem(
    "bestieMemoryAnswer",
    answer
  );

  toastMsg(
    "Memory saved. ❤️"
  );

  setTimeout(goNext, 800);

}


/* -----------------------------
   Letter
----------------------------- */

function openLetter() {

  letterOpen = true;

  render();

  burstConfetti(35);

}


/* -----------------------------
   Lightbox
----------------------------- */

function openMemory() {

  const memory =
    birthdayData.memories[memoryIndex];

  if (memory) {
    openSpecific(memory.image);
  }

}


function openSpecific(src) {

  const decodedSrc =
    decodeURIComponent(src);

  lightboxImg.src = decodedSrc;

  lightbox.classList.add("show");

  lightbox.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeLightboxFunction() {

  lightbox.classList.remove("show");

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  lightboxImg.removeAttribute("src");

}


closeLightbox.addEventListener(
  "click",
  closeLightboxFunction
);


lightbox.addEventListener(
  "click",
  function (event) {

    if (event.target === lightbox) {
      closeLightboxFunction();
    }

  }
);


/* -----------------------------
   Toast
----------------------------- */

function toastMsg(message) {

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1400);

}


/* -----------------------------
   Particles
----------------------------- */

function startParticles() {

  const box =
    document.getElementById("particles");

  if (!box) return;

  if (box.querySelector(".particle")) {
    return;
  }

  for (let i = 0; i < 45; i++) {

    const particle =
      document.createElement("i");

    particle.className =
      "particle";

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.animationDelay =
      Math.random() * 7 + "s";

    particle.style.animationDuration =
      5 + Math.random() * 7 + "s";

    box.appendChild(particle);
  }

}


/* -----------------------------
   Confetti
----------------------------- */

function burstConfetti(count = 90) {

  const box =
    document.getElementById("confetti");

  if (!box) return;

  const colors = [
    "#f6a8c8",
    "#bda9ff",
    "#e9c98b",
    "#ffffff"
  ];

  for (let i = 0; i < count; i++) {

    const piece =
      document.createElement("i");

    piece.style.position =
      "absolute";

    piece.style.left =
      Math.random() * 100 + "%";

    piece.style.top =
      "-5%";

    piece.style.width =
      5 + Math.random() * 7 + "px";

    piece.style.height =
      9 + Math.random() * 10 + "px";

    piece.style.background =
      colors[i % colors.length];

    piece.style.borderRadius =
      Math.random() > 0.5
        ? "2px"
        : "50%";

    piece.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    const xMovement =
      Math.random() * 300 - 150;

    piece.style.animation =
      `fall ${2 + Math.random() * 2}s linear forwards`;

    piece.style.setProperty(
      "--confetti-x",
      `${xMovement}px`
    );

    box.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 4500);
  }

}


/* -----------------------------
   Keyboard navigation
----------------------------- */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "ArrowRight" &&
      !["INPUT", "TEXTAREA"].includes(
        document.activeElement.tagName
      )
    ) {
      goNext();
    }

    if (
      event.key === "ArrowLeft" &&
      !["INPUT", "TEXTAREA"].includes(
        document.activeElement.tagName
      )
    ) {
      goBack();
    }

    if (event.key === "Escape") {
      closeLightboxFunction();
    }

  }
);


/* -----------------------------
   Start
----------------------------- */

render();
