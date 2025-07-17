const sessionEmail = localStorage.getItem("sesionActiva");
if (!sessionEmail) window.location.href = "index.html";

// Unificación de claves y funciones para manejo de usuarios
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
function getCurrentUser() {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  return activeUser || null;
}
function updateUser(updatedUser) {
  const users = getUsers().map(u =>
    u.email === updatedUser.email ? updatedUser : u
  );
  saveUsers(users);
  localStorage.setItem("activeUser", JSON.stringify(updatedUser));
}

