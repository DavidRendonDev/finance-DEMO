// script.js

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // Si ya está logueado y está en index, redirige al panel
  if ((path.includes("index.html") || path.endsWith("/")) && localStorage.getItem("activeUser")) {
    window.location.href = "app.html";
    return;
  }

  if (path.includes("index.html") || path.endsWith("/")) {
    initLoginRegister();
  } else if (path.includes("app.html")) {
    initApp();
  }
});

// --- Registro y Login ---
function initLoginRegister() {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value;
      const confirm = document.getElementById("registerConfirm").value;

      if (!name || !email || !password || !confirm) {
        alert("Completa todos los campos.");
        return;
      }
      if (password !== confirm) {
        alert("Las contraseñas no coinciden.");
        return;
      }
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some(u => u.email === email)) {
        alert("El correo ya está registrado.");
        return;
      }
      users.push({
        name,
        email,
        password,
        balance: 0,
        transactions: []
      });
      localStorage.setItem("users", JSON.stringify(users));
      alert("¡Registro exitoso!");
      registerForm.reset();
      showSection('login');
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        alert("Correo o contraseña incorrectos.");
        return;
      }
      localStorage.setItem("activeUser", JSON.stringify(user));
      loginForm.reset();
      window.location.href = "app.html";
    });
  }
}

// --- Dashboard ---
function initApp() {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  if (!activeUser) {
    window.location.href = "index.html";
    return;
  }
  const userName = document.getElementById("userName");
  const userBalance = document.getElementById("userBalance");
  const historial = document.getElementById("historial");

  userName.textContent = activeUser.name;
  userBalance.textContent = activeUser.balance.toFixed(2);
  renderHistorial(activeUser.transactions);

  // Mostrar formularios
  window.mostrarFormulario = function (tipo) {
    document.getElementById("formAgregar").style.display = "none";
    document.getElementById("formEnviar").style.display = "none";
    if (tipo === "agregar") {
      document.getElementById("formAgregar").style.display = "flex";
    } else if (tipo === "enviar") {
      document.getElementById("formEnviar").style.display = "flex";
    }
  };

  // Agregar dinero
  window.agregarDinero = function () {
    const monto = parseFloat(document.getElementById("montoAgregar").value);
    if (isNaN(monto) || monto <= 0) {
      alert("Monto inválido");
      return;
    }
    activeUser.balance += monto;
    activeUser.transactions.push({ tipo: "Ingreso", monto, fecha: new Date().toLocaleString() });
    guardarYActualizar();
    alert("Dinero agregado exitosamente");
    document.getElementById("montoAgregar").value = "";
    document.getElementById("formAgregar").style.display = "none";
  };

  // Enviar dinero usando API REST
  window.enviarDinero = async function () {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    const destinoEmail = document.getElementById("emailDestino").value.trim();
    const monto = parseFloat(document.getElementById("montoEnviar").value);
    if (!destinoEmail || isNaN(monto) || monto <= 0) {
      alert("Datos inválidos");
      return;
    }
    if (destinoEmail === activeUser.email) {
      alert("No puedes enviarte dinero a ti mismo.");
      return;
    }
    if (monto > activeUser.balance) {
      alert("Saldo insuficiente.");
      return;
    }
    // Buscar destinatario en la API
    const res = await fetch('http://localhost:3001/users?email=' + encodeURIComponent(destinoEmail));
    const destinatarios = await res.json();
    if (destinatarios.length === 0) {
      alert("Destinatario no encontrado.");
      return;
    }
    const destinatario = destinatarios[0];
    // Actualizar saldo y transacciones del emisor
    activeUser.balance -= monto;
    activeUser.transactions.push({ tipo: "Envío", monto: -monto, fecha: new Date().toLocaleString(), a: destinoEmail });
    await fetch(`http://localhost:3001/users/${activeUser.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ balance: activeUser.balance, transactions: activeUser.transactions })
    });
    localStorage.setItem("activeUser", JSON.stringify(activeUser));
    // Actualizar saldo y transacciones del destinatario
    destinatario.balance += monto;
    destinatario.transactions.push({ tipo: "Recibido", monto, fecha: new Date().toLocaleString(), de: activeUser.email });
    await fetch(`http://localhost:3001/users/${destinatario.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ balance: destinatario.balance, transactions: destinatario.transactions })
    });
    alert("Dinero enviado correctamente");
    document.getElementById("emailDestino").value = "";
    document.getElementById("montoEnviar").value = "";
    document.getElementById("formEnviar").style.display = "none";
    // Actualiza la vista del historial y saldo
    document.getElementById("userBalance").textContent = activeUser.balance.toFixed(2);
    renderHistorial(activeUser.transactions);
  };

  // Cerrar sesión
  window.cerrarSesion = function () {
    localStorage.removeItem("activeUser");
    window.location.href = "index.html";
  };

  function guardarYActualizar() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(u => u.email === activeUser.email);
    users[index] = activeUser;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("activeUser", JSON.stringify(activeUser));
    document.getElementById("userBalance").textContent = activeUser.balance.toFixed(2);
    renderHistorial(activeUser.transactions);
  }

  function renderHistorial(transacciones) {
    historial.innerHTML = "";
    if (!transacciones || transacciones.length === 0) {
      historial.innerHTML = "<li>Sin transacciones.</li>";
      return;
    }
    transacciones.slice().reverse().forEach(t => {
      const li = document.createElement("li");
      li.textContent = `${t.fecha} - ${t.tipo} ${t.a ? "a " + t.a : t.de ? "de " + t.de : ""}: $${Math.abs(t.monto)}`;
      historial.appendChild(li);
    });
  }
}
