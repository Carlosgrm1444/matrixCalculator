// Declara las variables filas y columnas a nivel global
var filas, columnas;

document.getElementById("acceptSize").addEventListener("click", function () {
  // Obtén los valores de filas y columnas del primer modal
  filas = document.getElementById("input1").value;
  columnas = document.getElementById("input2").value;

  // Cierra el primer modal
  var sizeModal = new bootstrap.Modal(document.getElementById("sizeModal"));
  sizeModal.hide();

  // Genera la matriz de inputs
  var matrixContainer = document.getElementById("matrixContainer");
  matrixContainer.innerHTML = ""; // Limpia cualquier contenido anterior

  for (var i = 0; i < filas; i++) {
    var rowDiv = document.createElement("div");
    rowDiv.className = "d-flex mb-2";

    for (var j = 0; j < columnas; j++) {
      var input = document.createElement("input");
      input.type = "number";
      input.className = "form-control mr-2";
      input.placeholder = `Valor [${i + 1}, ${j + 1}]`;
      rowDiv.appendChild(input);
    }

    matrixContainer.appendChild(rowDiv);
  }

  // Muestra el segundo modal
  var matrixModal = new bootstrap.Modal(document.getElementById("matrixModal"));
  matrixModal.show();
});

document.getElementById("saveMatrix").addEventListener("click", function () {
  var inputs = document.querySelectorAll("#matrixContainer input");
  var matrix = [];

  // Recorre los inputs y almacena sus valores en una matriz bidimensional
  inputs.forEach(function (input, index) {
    var row = Math.floor(index / columnas);
    var col = index % columnas;

    if (!matrix[row]) {
      matrix[row] = [];
    }

    matrix[row][col] = input.value;
  });

  // Imprime la matriz en la consola
  console.log(matrix);

  // Cierra el segundo modal
  var matrixModal = new bootstrap.Modal(document.getElementById("matrixModal"));
  matrixModal.hide();
});
