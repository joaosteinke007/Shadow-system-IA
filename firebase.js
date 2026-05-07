/* =========================
   FIREBASE CONFIG
========================= */

import { initializeApp }

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {

  getAuth,

  createUserWithEmailAndPassword,

  signInWithEmailAndPassword,

  onAuthStateChanged,

  signOut

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

/* CONFIG DO PROJETO */

const firebaseConfig = {

  apiKey:
  "AIzaSyDUnLgwYrK36JauMgnSbjV3kuawKvPZHXI",

  authDomain:
  "shadow007-de831.firebaseapp.com",

  projectId:
  "shadow007-de831",

  storageBucket:
  "shadow007-de831.firebasestorage.app",

  messagingSenderId:
  "1070585277651",

  appId:
  "1:1070585277651:web:27f845620bb959b38bf826"

};

/* INICIAR FIREBASE */

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

/* =========================
   CADASTRO
========================= */

window.registrar =
async function(){

  const email =
  document.getElementById(
    "email"
  ).value;

  const senha =
  document.getElementById(
    "senha"
  ).value;

  try{

    await
    createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );

    alert(
      "🔥 bem vindo ao shadow system!"
    );

  }

  catch(e){

    alert(
      e.message
    );

  }

}

/* =========================
   LOGIN
========================= */

window.logar =
async function(){

  const email =
  document.getElementById(
    "email"
  ).value;

  const senha =
  document.getElementById(
    "senha"
  ).value;

  try{

    await
    signInWithEmailAndPassword(
      auth,
      email,
      senha
    );

    alert(
      "⚔️ Login realizado!"
    );

  }

  catch(e){

    alert(
      e.message
    );

  }

}

/* =========================
   LOGOUT
========================= */

window.sair =
async function(){

  await signOut(auth);

  alert(
    "👋 Logout realizado"
  );

}

/* =========================
   USUÁRIO ONLINE
========================= */

onAuthStateChanged(
  auth,
  (user)=>{

    const online =
    document.querySelector(
      ".online"
    );

    if(user){

      online.innerHTML =
      `🟢 ${user.email}`;

    }

    else{

      online.innerHTML =
      "🔴 OFFLINE";

    }

  }
);