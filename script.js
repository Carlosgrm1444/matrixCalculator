let arrayList = [];

mc = {
  calculate: {
    askOperation: () => {
      // Actualizar las opciones en los selects
      const matrixOptions = arrayList
        .map(
          (_, index) =>
            `<option value="${index}">Matriz ${String.fromCharCode(
              65 + index
            )}</option>`
        )
        .join("");

      // Crear el contenido del modal
      const modalContent = `
      <div class="modal fade" id="operationModal" tabindex="-1" aria-labelledby="operationModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="operationModalLabel">Selecciona una operación y matrices</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="operationType" class="form-label">Tipo de operación</label>
                <select id="operationType" class="form-select">
                  <option value="add">Suma</option>
                  <option value="subtract">Resta</option>
                  <option value="multiply">Multiplicación</option>
                  <!-- Puedes agregar más opciones si es necesario -->
                </select>
              </div>
              <div class="mb-3">
                <label for="matrixA" class="form-label">Matriz 1</label>
                <select id="matrixA" class="form-select">
                  ${matrixOptions}
                </select>
              </div>
              <div class="mb-3">
                <label for="matrixB" class="form-label">Matriz 2</label>
                <select id="matrixB" class="form-select">
                  ${matrixOptions}
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" onclick="mc.calculate.performOperation()">Realizar Operación</button>
            </div>
          </div>
        </div>
      </div>
      `;

      // Insertar el contenido del modal en el body y mostrarlo
      document.body.insertAdjacentHTML("beforeend", modalContent);
      const operationModal = new bootstrap.Modal(
        document.getElementById("operationModal")
      );
      operationModal.show();
    },

    performOperation: () => {
      // Obtener los valores seleccionados
      const operationType = document.getElementById("operationType").value;
      const matrixAIndex = parseInt(document.getElementById("matrixA").value);
      const matrixBIndex = parseInt(document.getElementById("matrixB").value);

      // Verificar si las matrices están seleccionadas y válidas
      if (
        isNaN(matrixAIndex) ||
        isNaN(matrixBIndex) ||
        matrixAIndex === matrixBIndex
      ) {
        alert("Por favor selecciona dos matrices diferentes.");
        return;
      }

      const matrixA = arrayList[matrixAIndex];
      const matrixB = arrayList[matrixBIndex];

      // Lógica para realizar la operación según el tipo seleccionado
      let result;

      switch (operationType) {
        case "add":
          result = addMatrices(matrixA, matrixB);
          break;
        case "subtract":
          result = subtractMatrices(matrixA, matrixB);
          break;
        case "multiply":
          result = multiplyMatrices(matrixA, matrixB);
          break;
        default:
          alert("Operación no válida.");
          return;
      }

      // Mostrar el resultado (puedes adaptar esto según tus necesidades)
      console.log("Resultado:", result);

      // Cerrar el modal
      document.getElementById("operationModal").remove();
    },
  },

  matrixLists: {
    askIndexes: () => {
      // Crear el modal para ingresar el tamaño de la matriz
      const modalContent = `
      <div class="modal fade" id="indexModal" tabindex="-1" aria-labelledby="indexModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="indexModalLabel">Ingresa el tamaño de la matriz</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Filas: <input type="number" id="rows" min="1" class="form-control" />
              Columnas: <input type="number" id="columns" min="1" class="form-control" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" onclick="mc.matrixLists.askValues()" data-bs-dismiss="modal">Continuar</button>
            </div>
          </div>
        </div>
      </div>
    `;

      document.body.insertAdjacentHTML("beforeend", modalContent);
      const indexModal = new bootstrap.Modal(
        document.getElementById("indexModal")
      );
      indexModal.show();
    },

    askValues: () => {
      const rows = parseInt(document.getElementById("rows").value);
      const columns = parseInt(document.getElementById("columns").value);

      if (isNaN(rows) || isNaN(columns)) {
        alert("Por favor ingresa valores válidos para filas y columnas.");
        return;
      }

      // Crear el modal para ingresar los valores de la matriz
      let valuesModalContent = `
      <div class="modal fade" id="valuesModal" tabindex="-1" aria-labelledby="valuesModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="valuesModalLabel">Ingresa los valores de la matriz</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <table class="table table-bordered">
                <tbody id="matrixValuesContainer">
    `;

      // Crear la tabla con inputs para los valores de la matriz
      for (let i = 0; i < rows; i++) {
        valuesModalContent += "<tr>";
        for (let j = 0; j < columns; j++) {
          valuesModalContent += `
            <td>
              <input type="number" id="val-${i}-${j}" class="form-control" 
              placeholder="(${i}, ${j})" />
            </td>`;
        }
        valuesModalContent += "</tr>";
      }

      valuesModalContent += `
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" onclick="mc.matrixLists.addMatrix()" data-bs-dismiss="modal">Agregar Matriz</button>
            </div>
          </div>
        </div>
      </div>
    `;

      document.body.insertAdjacentHTML("beforeend", valuesModalContent);
      const valuesModal = new bootstrap.Modal(
        document.getElementById("valuesModal")
      );
      valuesModal.show();
    },

    addMatrix: () => {
      const rows = parseInt(document.getElementById("rows").value);
      const columns = parseInt(document.getElementById("columns").value);
      const newMatrix = [];

      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
          // Obtener el valor del input
          const inputElement = document.getElementById(`val-${i}-${j}`);
          let value = parseInt(inputElement.value);

          // Verificar si el valor es NaN y reemplazarlo por 0
          if (isNaN(value)) {
            value = 0;
          }

          row.push(value);
        }
        newMatrix.push(row);
      }

      arrayList.push(newMatrix);

      document.getElementById("indexModal").remove();
      document.getElementById("valuesModal").remove();

      mc.matrixLists.showList();
    },

    showList: () => {
      let listContent = '<div class="container mt-4">';

      // Iterar sobre cada matriz en arrayList
      arrayList.forEach((matrix, index) => {
        const rows = matrix.length;
        const columns = matrix[0].length;
        const label = String.fromCharCode(65 + index); // Genera "A", "B", "C", etc.

        listContent += `
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div>
              <b class="text-nowrap">Matriz ${label}</b>
              <br />
              <i>(${rows}x${columns})</i>
            </div>
            <div>
              <button class="btn btn-danger btn-sm ms-3 my-1" onclick="mc.matrixLists.removeMatrix(${index})">
                <i class="bi bi-trash"></i>
              </button>
              <button class="btn btn-warning btn-sm ms-3 my-1" onclick="mc.matrixLists.editMatrix(${index})">
                <i class="bi bi-pencil"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <table class="table table-bordered">
              <tbody>
      `;

        // Crear la tabla para la matriz
        matrix.forEach((row) => {
          listContent += "<tr>";
          row.forEach((value) => {
            listContent += `<td>${value}</td>`;
          });
          listContent += "</tr>";
        });

        listContent += `
              </tbody>
            </table>
          </div>
        </div>
        `;
      });

      listContent += "</div>";

      // Agregar el contenido al div con id "list"
      document.getElementById("list").innerHTML = listContent;
    },

    editMatrix: (index) => {
      // Obtener la matriz para editar
      const matrix = arrayList[index];
      const rows = matrix.length;
      const columns = matrix[0].length;

      // Mostrar un modal para editar la matriz (similar a askValues)
      let valuesModalContent = `
      <div class="modal fade" id="editMatrixModal" tabindex="-1" aria-labelledby="editMatrixModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editMatrixModalLabel">Editar Matriz ${String.fromCharCode(
                65 + index
              )}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <table class="table table-bordered">
                <tbody id="matrixValuesContainer">
      `;

      // Crear la tabla con inputs para editar los valores de la matriz
      for (let i = 0; i < rows; i++) {
        valuesModalContent += "<tr>";
        for (let j = 0; j < columns; j++) {
          valuesModalContent += `
            <td>
              <input type="number" id="edit-val-${i}-${j}" class="form-control" 
              value="${matrix[i][j]}" placeholder="(${i}, ${j})" />
            </td>`;
        }
        valuesModalContent += "</tr>";
      }

      valuesModalContent += `
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" onclick="mc.matrixLists.updateMatrix(${index})" data-bs-dismiss="modal">Actualizar</button>
            </div>
          </div>
        </div>
      </div>
    `;

      document.body.insertAdjacentHTML("beforeend", valuesModalContent);
      const editMatrixModal = new bootstrap.Modal(
        document.getElementById("editMatrixModal")
      );
      editMatrixModal.show();
    },

    updateMatrix: (index) => {
      const rows = arrayList[index].length;
      const columns = arrayList[index][0].length;
      const updatedMatrix = [];

      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
          // Obtener el valor del input
          const inputElement = document.getElementById(`edit-val-${i}-${j}`);
          let value = parseInt(inputElement.value);

          // Verificar si el valor es NaN y reemplazarlo por 0
          if (isNaN(value)) {
            value = 0;
          }

          row.push(value);
        }
        updatedMatrix.push(row);
      }

      arrayList[index] = updatedMatrix;

      document.getElementById("editMatrixModal").remove();
      mc.matrixLists.showList();
    },

    removeMatrix: (index) => {
      // Eliminar la matriz de arrayList
      arrayList.splice(index, 1);
      mc.matrixLists.showList();
    },
  },
};

// Funciones para realizar las operaciones (puedes implementar según la lógica específica)
function addMatrices(matrixA, matrixB) {
  // Verificar dimensiones y realizar suma
  // Ejemplo básico:
  return matrixA.map((row, i) => row.map((value, j) => value + matrixB[i][j]));
}

function subtractMatrices(matrixA, matrixB) {
  // Verificar dimensiones y realizar resta
  // Ejemplo básico:
  return matrixA.map((row, i) => row.map((value, j) => value - matrixB[i][j]));
}

function multiplyMatrices(matrixA, matrixB) {
  // Verificar dimensiones y realizar multiplicación
  // Ejemplo básico:
  // Multiplicación de matrices requiere comprobaciones de dimensiones
  const result = Array(matrixA.length)
    .fill(null)
    .map(() => Array(matrixB[0].length).fill(0));
  for (let i = 0; i < matrixA.length; i++) {
    for (let j = 0; j < matrixB[0].length; j++) {
      for (let k = 0; k < matrixB.length; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }
  return result;
}
