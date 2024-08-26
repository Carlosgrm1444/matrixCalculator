// Referencias a los modales y elementos
const matrixModal = document.getElementById("matrixModal");
const inputModal = document.getElementById("inputModal");
const openModalBtn = document.getElementById("openModal");
const generateMatrixBtn = document.getElementById("generateMatrix");
const submitMatrixBtn = document.getElementById("submitMatrix");
const closeBtns = document.querySelectorAll(".close");

// Abrir el primer modal
openModalBtn.onclick = () => {
  matrixModal.style.display = "block";
};

// Cerrar los modales al hacer click en 'X'
closeBtns.forEach((btn) => {
  btn.onclick = () => {
    btn.parentElement.parentElement.style.display = "none";
  };
});

// Generar inputs según dimensiones
generateMatrixBtn.onclick = () => {
  const rows = document.getElementById("rows").value;
  const cols = document.getElementById("cols").value;

  if (rows > 0 && cols > 0) {
    // Cerrar primer modal
    matrixModal.style.display = "none";

    // Crear inputs en el segundo modal
    const matrixInputs = document.getElementById("matrixInputs");
    matrixInputs.innerHTML = ""; // Limpiar inputs anteriores
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = `(${i + 1},${j + 1})`;
        matrixInputs.appendChild(input);
      }
      matrixInputs.appendChild(document.createElement("br"));
    }

    // Mostrar segundo modal
    inputModal.style.display = "block";
  } else {
    alert("Por favor, ingrese dimensiones válidas.");
  }
};

// Acción para el botón de submit (puedes personalizarla según tu necesidad)
submitMatrixBtn.onclick = () => {
  alert("Matriz generada con éxito!");
  inputModal.style.display = "none";
};

// Cerrar el modal si el usuario hace click fuera de él
window.onclick = (event) => {
  if (event.target == matrixModal) {
    matrixModal.style.display = "none";
  } else if (event.target == inputModal) {
    inputModal.style.display = "none";
  }
};
