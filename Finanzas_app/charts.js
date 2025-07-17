// charts.js

document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.pathname.includes("app.html")) return;

  const user = JSON.parse(localStorage.getItem("activeUser"));
  if (!user || !user.transactions || user.transactions.length === 0) {
    // Si no hay transacciones, muestra un gráfico vacío
    const ctx = document.getElementById("chart").getContext("2d");
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Sin transacciones"],
        datasets: [{
          label: 'Monto',
          data: [0],
          backgroundColor: ["#dcdde1"],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Últimos Movimientos'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return "$" + value;
              }
            }
          }
        }
      }
    });
    return;
  }

  const ctx = document.getElementById("chart").getContext("2d");

  const transacciones = user.transactions.slice(-10); // Últimos 10 movimientos

  const labels = transacciones.map((t, i) => t.tipo + " " + (t.a || t.de || ""));
  const datos = transacciones.map(t => t.monto);
  const colores = transacciones.map(t =>
    t.tipo === "Ingreso" || t.tipo === "Recibido" ? "#4cd137" : "#e84118"
  );

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Monto',
        data: datos,
        backgroundColor: colores,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Últimos Movimientos'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return "$" + value;
            }
          }
        }
      }
    }
  });
});
