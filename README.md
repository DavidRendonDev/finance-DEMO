# finance-DEMO
# 💸 Finanzas App

Una aplicación web de finanzas personales desarrollada con **HTML**, **CSS** y **JavaScript** que permite a los usuarios:

- Registrarse e iniciar sesión
- Consultar su saldo actual
- Agregar y enviar dinero
- Visualizar el historial de transacciones
- Ver gráficos de ingresos y egresos

---

## 📁 Estructura del Proyecto

```
Finanzas_app/
├── index.html         # Página de inicio: login y registro
├── app.html           # Página principal de la aplicación
├── style.css          # Estilos visuales (CSS)
├── script.js          # Lógica funcional de la app (JS)
└── data.js            # Datos simulados (usuarios y transacciones)
```

---

## 🚀 Cómo usar el proyecto

1. **Clona o descarga** este repositorio.
2. Abre el archivo `index.html` en tu navegador.
3. Regístrate como nuevo usuario o inicia sesión.
4. Al iniciar sesión correctamente, serás redirigido a `app.html`.

> **Nota**: Toda la persistencia de datos se maneja en el navegador con `LocalStorage`.

---

## 🔐 Funcionalidades principales

### Autenticación de Usuario
- Registro de nuevos usuarios
- Validación de correo y contraseña
- Inicio de sesión
- Persistencia de sesión usando `LocalStorage`

### Gestión de Finanzas
- **Saldo actual** visible en la pantalla principal
- **Agregar dinero** al saldo
- **Enviar dinero** a otros usuarios (simulado)
- **Historial** de todas las transacciones

### Visualización
- Gráficos de ingresos y egresos
- Diferenciación visual entre ingresos y gastos

---

## 📂 Archivos clave

### `index.html`
Contiene formularios de:
- Registro
- Inicio de sesión

### `app.html`
Muestra la interfaz principal del usuario logueado:
- Saldo
- Formulario para agregar o enviar dinero
- Historial
- Gráficos

### `style.css`
Diseño básico responsivo con colores personalizados y tipografía llamativa.

### `script.js`
Contiene toda la lógica JavaScript:
- Manejo de usuarios
- Gestión del `LocalStorage`
- Validación de formularios
- Renderizado de transacciones
- Generación de gráficos

### `data.js`
Archivo inicial de datos:
- Usuario por defecto
- Transacciones simuladas para pruebas

---

## 🧠 Tecnologías utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- `LocalStorage` para persistencia
- `Chart.js` (o similar) para los gráficos *(si está implementado)*

---

## 📌 Consideraciones

- Este proyecto está enfocado en el aprendizaje y prácticas básicas de desarrollo web.
- No es una aplicación segura para producción real (no hay cifrado, backend, ni base de datos).
- Ideal para estudiantes que desean practicar autenticación, almacenamiento local y manejo de DOM.

---

## 📷 Capturas de Pantalla

> Puedes agregar aquí imágenes de la interfaz: login, dashboard, gráficos, etc.

---

## 🧑‍💻 Autor

**David Rendon**  
Proyecto desarrollado con fines educativos y de práctica.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y compartirlo libremente.

---
