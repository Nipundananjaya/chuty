/* ==========================================================================
   ROMANTIC INTERACTION ENGINE
   Milestones: Started Dating: 2025.03.29 | First Met: 2026.01.13
   ========================================================================== */

// --- MILESTONE CONFIGURATION ---
const DATES = {
  datingStart: new Date('2025-03-29T00:00:00'),
  firstMet: new Date('2026-01-13T00:00:00')
};

// --- ROMANTIC REASONS REPOSITORY ---
const REASONS = [
  "The way your eyes sparkle whenever you smile at me.",
  "How you make the ordinary moments feel extraordinary and magical.",
  "Your sweet laugh that instantly cures any bad day I'm having.",
  "The comforting warmth of your hands when we walk together.",
  "The adorable way you talk when you're super excited about something.",
  "How you believe in me even when I doubt myself.",
  "Because you are not just my love, but my best friend and safe place.",
  "The sweet scent of your hair when I hold you close.",
  "How beautiful you look, especially when you think you don't.",
  "Your kindness, your caring heart, and how deeply you feel things.",
  "The way my heart still beats faster every time your name pops up on my phone.",
  "Because every love song suddenly made sense after I met you.",
  "The silly jokes we share that no one else in the world would understand.",
  "How safe and complete I feel whenever I am with you.",
  "Your cute little pouts when you're playfully upset.",
  "Because you chose me, and you continue to choose me every single day.",
  "The way you look at me like I'm the only person in a crowded room.",
  "Because loving you is the easiest and most natural thing I've ever done.",
  "How our hugs make all the chaos of the outside world disappear.",
  "The future that we are dreaming and building together step by step.",
  "Because you make me want to be the best version of myself for you.",
  "The soft tone of your voice when you say 'I love you'.",
  "Simply because you exist, and my universe is a million times brighter with you in it."
];

// --- "OPEN WHEN..." LETTERS ---
const LETTERS = {
  miss: {
    title: "Open When You Miss Me... 💭",
    content: "My Dearest Love,\n\nWhenever you feel that ache of missing me, close your eyes for three seconds and take a deep breath. Place your hand on your heart—can you feel that steady beat? That is me, always living inside you.\n\nNo matter how many miles or hours stand between us, remember that we are looking at the exact same sky, wishing on the exact same stars. My love for you is not bound by distance. I am counting down every single second until I can wrap my arms around you again.\n\nYou are my home, always."
  },
  sad: {
    title: "Open When You're Having a Rough Day... 🌧️",
    content: "Hey beautiful,\n\nI know today feels heavy and exhausting, but please pause and remind yourself of how wonderfully resilient, strong, and precious you are.\n\nBad days are only temporary, but my love and devotion to you are eternal. You don't have to carry the entire world on your shoulders alone—I am right here beside you to share the weight.\n\nWrap yourself in a warm blanket, imagine my tightest hug, and remember: tomorrow is a brand new page. You are so deeply loved."
  },
  mad: {
    title: "Open When You're Mad at Me... 🥺",
    content: "My Sweetheart,\n\nIf I did or said something foolish that hurt you or made you angry, I am genuinely, deeply sorry. Seeing you upset—especially because of me—breaks my heart into a thousand pieces.\n\nEven when we disagree or have frustrating moments, my love for you never wavers for a split second. Our love is so much bigger than any silly argument. Let's talk it out gently, because all I ever want is to hold your hands and make you smile again.\n\nI love you more than pride or words can ever say."
  },
  doubt: {
    title: "Open When You Wonder How Much I Love You... 💖",
    content: "My Forever Girl,\n\nIf you ever wonder how much you mean to me, try counting the drops in the deepest ocean or the grains of sand on every shore. Even that doesn't come close.\n\nSince 2025.03.29, you have been my favorite thought in the morning, my peace during the busy day, and my sweetest dream at night. Meeting you on 2026.01.13 confirmed what my soul already knew: you are my destiny.\n\nI loved you yesterday, I adore you today, and I will choose you again and again for all eternity."
  }
};

// --- GLOBAL AUDIO CONTROLLER ---
class RomanticAudio {
  constructor() {
    this.audio = document.getElementById('bgAudio');
    this.vinyl = document.getElementById('vinylDisk');
    this.toggleBtn = document.getElementById('musicToggleBtn');
    this.volumeSlider = document.getElementById('volumeSlider');
    this.isPlaying = false;
    this.audioContext = null;
    this.isSynthesizerActive = false;

    this.init();
  }

  init() {
    if (this.audio) {
      this.audio.volume = 0.65;
      this.audio.loop = true;
    }

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    if (this.vinyl) {
      this.vinyl.addEventListener('click', () => this.toggle());
    }

    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', (e) => {
        if (this.audio) this.audio.volume = e.target.value;
      });
    }
  }

  play() {
    if (this.audio) {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.updateUI(true);
          })
          .catch((err) => {
            console.log("Audio play error, falling back to Web Audio Piano Synth:", err);
            this.playSynthesizer();
          });
      }
    } else {
      this.playSynthesizer();
    }
  }

  pause() {
    if (this.audio && !this.isSynthesizerActive) {
      this.audio.pause();
    } else if (this.isSynthesizerActive) {
      this.stopSynthesizer();
    }
    this.isPlaying = false;
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    if (this.vinyl) {
      if (playing) this.vinyl.classList.add('playing');
      else this.vinyl.classList.remove('playing');
    }
    if (this.toggleBtn) {
      this.toggleBtn.innerHTML = playing ? '⏸️' : '▶️';
    }
  }

  // Web Audio Romantic Gentle Piano Synthesizer Fallback
  playSynthesizer() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();
      this.isSynthesizerActive = true;
      this.isPlaying = true;
      this.updateUI(true);

      // Romantic chord notes (C, E, G, B, D, A)
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 392.00]  // G
      ];

      let chordIndex = 0;
      let noteIndex = 0;

      this.synthInterval = setInterval(() => {
        if (!this.isSynthesizerActive || !this.audioContext) return;
        
        const currentChord = chords[chordIndex];
        const freq = currentChord[noteIndex % currentChord.length];
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        
        gain.gain.setValueAtTime(0.08, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 1.8);
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.start();
        osc.stop(this.audioContext.currentTime + 1.8);
        
        noteIndex++;
        if (noteIndex % 4 === 0) {
          chordIndex = (chordIndex + 1) % chords.length;
        }
      }, 500);

    } catch (e) {
      console.warn("Synthesizer error:", e);
    }
  }

  stopSynthesizer() {
    this.isSynthesizerActive = false;
    if (this.synthInterval) clearInterval(this.synthInterval);
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// --- LIVE CHRONOMETER SYSTEM ---
function updateLoveCounter() {
  const now = new Date();
  
  // 1. Time since dating started: 2025.03.29
  const diffDating = now - DATES.datingStart;
  
  const totalSeconds = Math.max(0, Math.floor(diffDating / 1000));
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const daysEl = document.getElementById('chronoDays');
  const hoursEl = document.getElementById('chronoHours');
  const minsEl = document.getElementById('chronoMins');
  const secsEl = document.getElementById('chronoSecs');

  if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
  if (minsEl) minsEl.innerText = String(minutes).padStart(2, '0');
  if (secsEl) secsEl.innerText = String(seconds).padStart(2, '0');

  // Approximate heartbeats together (72 bpm average)
  const heartbeats = Math.floor((diffDating / (1000 * 60)) * 72);
  const heartbeatEl = document.getElementById('heartbeatCounter');
  if (heartbeatEl) {
    heartbeatEl.innerText = heartbeats.toLocaleString() + " beats";
  }

  // 2. Time since first met: 2026.01.13
  const diffMet = now - DATES.firstMet;
  const metDays = Math.max(0, Math.floor(diffMet / (1000 * 3600 * 24)));
  const metEl = document.getElementById('firstMetCounter');
  if (metEl) {
    metEl.innerText = `${metDays} Days Since Our First Hug`;
  }
}

// --- CANVAS PARTICLE SYSTEM (Rose Petals & Golden Dust) ---
function initCanvasParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = 35;

  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 5,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 1 - 0.5,
      angle: Math.random() * 360,
      spin: Math.random() * 0.03 - 0.015,
      color: Math.random() > 0.4 ? 'rgba(255, 77, 109, 0.45)' : 'rgba(255, 182, 193, 0.55)',
      isStar: Math.random() > 0.7
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    petals.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      if (p.isStar) {
        // Golden glowing star dust
        ctx.fillStyle = 'rgba(255, 209, 102, 0.7)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffd166';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Floating rose petal shape
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      p.y += p.speedY;
      p.x += Math.sin(p.angle) * 0.8 + p.speedX;
      p.angle += p.spin;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
    });

    requestAnimationFrame(render);
  }

  render();
}

// --- CURSOR TRAIL EFFECT ---
function initCursorTrail() {
  const symbols = ['❤️', '💖', '✨', '🌹', '💕'];
  let throttle = false;

  document.addEventListener('mousemove', (e) => {
    if (throttle) return;
    throttle = true;
    setTimeout(() => { throttle = false; }, 85);

    const span = document.createElement('span');
    span.className = 'cursor-heart';
    span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    span.style.left = e.clientX + 'px';
    span.style.top = e.clientY + 'px';
    document.body.appendChild(span);

    setTimeout(() => {
      span.remove();
    }, 1200);
  });
}

// --- "OPEN WHEN..." ENVELOPES SYSTEM ---
function initEnvelopes() {
  const cards = document.querySelectorAll('.envelope-card');
  const modal = document.getElementById('letterModal');
  const titleEl = document.getElementById('letterTitle');
  const bodyEl = document.getElementById('letterBody');
  const closeBtn = document.getElementById('letterCloseBtn');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-letter');
      const letter = LETTERS[type];
      if (letter && modal && titleEl && bodyEl) {
        titleEl.innerText = letter.title;
        bodyEl.innerText = letter.content;
        modal.classList.add('active');
        spawnConfetti();
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

// --- 3D SECRET MYSTERY BOX SYSTEM ---
function initSecretGift() {
  const giftBox = document.getElementById('giftBox');
  const instruction = document.getElementById('giftInstruction');
  let step = 0;

  if (!giftBox) return;

  giftBox.addEventListener('click', () => {
    step++;
    if (step === 1) {
      // Ribbon unwrap
      giftBox.style.transform = 'scale(1.1) rotate(5deg)';
      document.querySelector('.gift-bow').style.display = 'none';
      if (instruction) instruction.innerText = "The ribbon untied! Tap the box to open the lid! ✨";
      spawnConfetti();
    } else if (step === 2) {
      // Box open reveal
      giftBox.style.transform = 'scale(1.2) translateY(-20px)';
      if (instruction) instruction.innerText = "Opening secret message... ❤️";
      
      setTimeout(() => {
        const modal = document.getElementById('letterModal');
        const titleEl = document.getElementById('letterTitle');
        const bodyEl = document.getElementById('letterBody');
        
        if (titleEl && bodyEl && modal) {
          titleEl.innerText = "My Forever Promise To You 💍✨";
          bodyEl.innerText = "My Dearest,\n\nYou are my once-in-a-lifetime blessing. From the very moment we became 'Us' on 2025.03.29, and the unforgettable day I finally saw your eyes on 2026.01.13, you have given my world color, laughter, and endless warmth.\n\nI promise to celebrate your victories, hold your hand through the storms, make you laugh when you're stressed, and love you fiercely with every beat of my heart.\n\nThank you for choosing me. I love you endlessly!";
          modal.classList.add('active');
          spawnMassiveConfetti();
        }
        step = 0;
        giftBox.style.transform = '';
        document.querySelector('.gift-bow').style.display = 'block';
        if (instruction) instruction.innerText = "Tap the gift to unwrap your secret surprise ✨";
      }, 500);
    }
  });
}

// --- "REASONS WHY I LOVE YOU" JAR ---
function initLoveJar() {
  const btn = document.getElementById('btnGetReason');
  const display = document.getElementById('reasonText');
  const countTag = document.getElementById('reasonCountTag');
  const jarGraphic = document.getElementById('jarGraphic');
  let currentIdx = 0;

  function pullReason() {
    if (!display) return;
    display.style.opacity = '0';

    setTimeout(() => {
      currentIdx = (currentIdx + 1) % REASONS.length;
      display.innerText = `"${REASONS[currentIdx]}"`;
      if (countTag) countTag.innerText = `Reason #${currentIdx + 1} of 1000+`;
      display.style.opacity = '1';
      spawnConfetti(5);
    }, 250);
  }

  if (btn) btn.addEventListener('click', pullReason);
  if (jarGraphic) jarGraphic.addEventListener('click', pullReason);
}

// --- ROMANTIC LOVE QUIZ SYSTEM ---
function initLoveQuiz() {
  const cards = document.querySelectorAll('.quiz-card');
  const cert = document.getElementById('certificateBox');
  let currentQ = 0;

  const options = document.querySelectorAll('.quiz-btn');
  options.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.getAttribute('data-correct') === 'true';
      
      if (isCorrect || btn.getAttribute('data-any-correct') === 'true') {
        spawnConfetti(10);
        cards[currentQ].classList.remove('active');
        currentQ++;

        if (currentQ < cards.length) {
          cards[currentQ].classList.add('active');
        } else {
          // Reveal Certificate!
          if (cert) {
            cert.classList.add('active');
            spawnMassiveConfetti();
          }
        }
      } else {
        btn.style.background = 'rgba(255, 50, 50, 0.4)';
        btn.innerText += " ❌ (Try again my love!)";
        setTimeout(() => {
          btn.style.background = '';
        }, 1200);
      }
    });
  });
}

// --- THE RUNAWAY "NO" BUTTON ---
function initRunawayButton() {
  const noBtn = document.getElementById('btnNo');
  const yesBtn = document.getElementById('btnYes');

  if (noBtn) {
    const dodge = () => {
      const randomX = (Math.random() - 0.5) * 350;
      const randomY = (Math.random() - 0.5) * 200;
      noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    };

    noBtn.addEventListener('mouseenter', dodge);
    noBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodge();
    });
  }

  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      spawnMassiveConfetti();
      const modal = document.getElementById('letterModal');
      const titleEl = document.getElementById('letterTitle');
      const bodyEl = document.getElementById('letterBody');

      if (titleEl && bodyEl && modal) {
        titleEl.innerText = "YAY! She Said YES! 💍🥰🎉";
        bodyEl.innerText = "You just made me the happiest person in the entire universe!\n\nNo returns, no refunds—you are officially stuck with me forever and ever! ❤️❤️❤️\n\nI love you to the moon, through every galaxy, and right back to my heart.";
        modal.classList.add('active');
      }
    });
  }
}

// --- LIGHTBOX GALLERY ---
function initLightbox() {
  const items = document.querySelectorAll('.polaroid-item');
  const modal = document.getElementById('lightboxModal');
  const imgEl = document.getElementById('lightboxImg');
  const captionEl = document.getElementById('lightboxCaption');
  const dateEl = document.getElementById('lightboxDate');
  const closeBtn = document.getElementById('lightboxClose');

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.polaroid-caption');
      const date = item.querySelector('.polaroid-date');

      if (img && imgEl && modal) {
        imgEl.src = img.src;
        if (captionEl && caption) captionEl.innerText = caption.innerText;
        if (dateEl && date) dateEl.innerText = date.innerText;
        modal.classList.add('active');
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

// --- CONFETTI GENERATORS ---
function spawnConfetti(count = 25) {
  const colors = ['#ff4d6d', '#ffd166', '#ff758f', '#ffffff', '#ffb3c1'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.top = '50%';
    el.style.left = '50%';
    el.style.width = Math.random() * 10 + 6 + 'px';
    el.style.height = Math.random() * 10 + 6 + 'px';
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    el.style.zIndex = '999999';
    el.style.pointerEvents = 'none';

    const x = (Math.random() - 0.5) * window.innerWidth * 0.8;
    const y = (Math.random() - 0.5) * window.innerHeight * 0.8;

    el.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${x}px, ${y}px) rotate(${Math.random() * 720}deg) scale(0)`, opacity: 0 }
    ], {
      duration: 1200 + Math.random() * 600,
      easing: 'cubic-bezier(0.1, 1, 0.1, 1)'
    });

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }
}

function spawnMassiveConfetti() {
  for (let i = 0; i < 4; i++) {
    setTimeout(() => spawnConfetti(40), i * 300);
  }
}

// --- IN-BROWSER PHOTO CUSTOMIZER WITH LOCALSTORAGE ---
function initPhotoCustomizer() {
  const modal = document.getElementById('customizerModal');
  const openBtn = document.getElementById('openCustomizerBtn');
  const closeBtn = document.getElementById('closeCustomizerBtn');
  const saveBtn = document.getElementById('saveCustomizerBtn');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => modal.classList.add('active'));
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  // Load saved photos from LocalStorage
  const savedPhotos = JSON.parse(localStorage.getItem('romantic_custom_photos') || '{}');
  for (const [id, dataUrl] of Object.entries(savedPhotos)) {
    const targetImg = document.getElementById(id);
    if (targetImg) targetImg.src = dataUrl;
  }

  // Listen for file changes
  const fileInputs = document.querySelectorAll('.custom-file-input');
  fileInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const targetId = input.getAttribute('data-target-id');
      if (file && targetId) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const targetImg = document.getElementById(targetId);
          if (targetImg) targetImg.src = event.target.result;
          savedPhotos[targetId] = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  });

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      try {
        localStorage.setItem('romantic_custom_photos', JSON.stringify(savedPhotos));
        alert("✨ Your precious photos have been saved successfully!");
        if (modal) modal.classList.remove('active');
      } catch (err) {
        alert("Note: Saved in current session! (For permanent photos, drop them in the 'images' folder)");
        if (modal) modal.classList.remove('active');
      }
    });
  }
}

// --- BOOTSTRAP APPLICATION ---
document.addEventListener('DOMContentLoaded', () => {
  const romanticAudio = new RomanticAudio();

  // Entry Curtain Click Handler
  const enterBtn = document.getElementById('btnEnterSurprise');
  const entryCurtain = document.getElementById('entryCurtain');

  if (enterBtn && entryCurtain) {
    enterBtn.addEventListener('click', () => {
      romanticAudio.play();
      entryCurtain.classList.add('hidden');
      spawnMassiveConfetti();
    });
  }

  // Initialize Modules
  updateLoveCounter();
  setInterval(updateLoveCounter, 1000);

  initCanvasParticles();
  initCursorTrail();
  initEnvelopes();
  initSecretGift();
  initLoveJar();
  initLoveQuiz();
  initRunawayButton();
  initLightbox();
  initPhotoCustomizer();
});
