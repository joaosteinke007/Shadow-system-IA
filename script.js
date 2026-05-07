/* =========================
   SHADOW SYSTEM AI - CORE
========================= */

/* HÁBITOS */
let habitos = {
  treino: false,
  estudo: false,
  agua: false,
  foco: false,
  leitura: false
};

/* STREAK */
let streak = 0;
let ultimoDia = null;

/* ELEMENTOS */
const progressoEl = document.getElementById("progressoDia");
const iaEl = document.getElementById("ia");
const fraseEl = document.getElementById("frase");
const statusEl = document.getElementById("statusDia");
const streakEl = document.getElementById("streak");

/* =========================
   SPLASH (CORRIGIDO + SEGURO)
========================= */
window.addEventListener("load", () => {

  const splash = document.getElementById("splash");

  if (splash) {
    setTimeout(() => {

      splash.style.opacity = "0";

      setTimeout(() => {
        splash.remove();
      }, 500);

    }, 1400);
  }

  carregar();
  verificarDia();
  atualizarTudo();
});

/* =========================
   HÁBITOS
========================= */
function toggleHabito(nome){

  if(!habitos.hasOwnProperty(nome)) return;

  habitos[nome] = !habitos[nome];

  salvar();
  atualizarTudo();
}

/* =========================
   PROGRESSO
========================= */
function atualizarHabitos(){

  if(!progressoEl) return;

  const total = Object.keys(habitos).length;
  const feitos = Object.values(habitos).filter(Boolean).length;

  const porcentagem = Math.round((feitos / total) * 100);

  progressoEl.innerText =
    `📊 Progresso: ${feitos}/${total} (${porcentagem}%)`;

  atualizarStatus(porcentagem);
}

/* =========================
   STATUS
========================= */
function atualizarStatus(p){

  if(!statusEl) return;

  if(p === 0){
    statusEl.innerText = "📊 Seu dia ainda não começou";
  }
  else if(p < 50){
    statusEl.innerText = "⚡ Você começou, continua";
  }
  else if(p < 100){
    statusEl.innerText = "🔥 Quase lá";
  }
  else{
    statusEl.innerText = "🏆 Dia perfeito!";
  }
}

/* =========================
   IA
========================= */
function atualizarIA(){

  if(!iaEl) return;

  const total = Object.keys(habitos).length;
  const feitos = Object.values(habitos).filter(Boolean).length;
  const p = Math.round((feitos / total) * 100);

  if(p === 0){
    iaEl.innerText = "🧠 Você ainda não começou hoje.";
  }
  else if(p < 50){
    iaEl.innerText = "⚔️ Disciplina começa agora, não pare.";
  }
  else if(p < 100){
    iaEl.innerText = "🔥 Você está indo muito bem hoje.";
  }
  else{
    iaEl.innerText = "🏆 Dia perfeito. Você venceu hoje.";
  }
}

/* =========================
   FRASES
========================= */
function atualizarFrase(){

  if(!fraseEl) return;

  const frases = [
    "Disciplina vence motivação.",
    "Pequenos hábitos mudam sua vida.",
    "O futuro depende do hoje.",
    "Consistência é tudo.",
    "Não pare agora."
  ];

  fraseEl.innerText =
    frases[Math.floor(Math.random() * frases.length)];
}

/* =========================
   STREAK
========================= */
function verificarDia(){

  const hoje = new Date().toDateString();

  if(ultimoDia !== hoje){

    if(ultimoDia !== null){

      const feitos = Object.values(habitos).filter(Boolean).length;
      const total = Object.keys(habitos).length;

      if(feitos === total){
        streak++;
      } else {
        streak = 0;
      }
    }

    habitos = {
      treino: false,
      estudo: false,
      agua: false,
      foco: false,
      leitura: false
    };

    ultimoDia = hoje;

    salvar();
  }
}

/* =========================
   STREAK UI
========================= */
function atualizarStreakUI(){

  if(streakEl){
    streakEl.innerText = `${streak} dias seguidos 🔥`;
  }
}

/* =========================
   SALVAR
========================= */
function salvar(){

  localStorage.setItem("shadow_habits", JSON.stringify({
    habitos,
    streak,
    ultimoDia
  }));
}

/* =========================
   CARREGAR
========================= */
function carregar(){

  const data = localStorage.getItem("shadow_habits");

  if(!data) return;

  try {
    const obj = JSON.parse(data);

    habitos = obj.habitos || habitos;
    streak = obj.streak || 0;
    ultimoDia = obj.ultimoDia || null;

  } catch(e){
    console.log("Erro ao carregar");
  }
}

/* =========================
   UPDATE GERAL
========================= */
function atualizarTudo(){

  atualizarHabitos();
  atualizarIA();
  atualizarFrase();
  atualizarStreakUI();
}

/* =========================
   VOZ IA
========================= */
function falar(texto){

  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "pt-BR";
  msg.rate = 1;

  speechSynthesis.speak(msg);
}

function ouvir(){

  const resposta = iaEl ? iaEl.innerText : "Sistema ativo";
  falar(resposta);
}