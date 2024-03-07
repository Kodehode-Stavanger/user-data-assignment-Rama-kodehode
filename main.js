const showExerciseName = document.getElementById("name-exercise");
const createCards = document.getElementById("show-card");
const inputExercise = document.getElementById("input-exercise");
const graphContainer = document.getElementById("graph-container");
const fitnessGraph = document.getElementById("fitness-graph");
const exerciseForm = document.getElementById("exercise-form");
const saveCont = document.getElementById("save-cont");
const dataBtn = document.getElementById("databtn");
const deleteBtn = document.getElementById("deletebtn");
const dataDropdown = document.getElementById("data-dropdown");
let savedSetts = getFromLocalStorage("setts");
console.log(savedSetts);

let setts = [];
let exerciseCounter = 1;
let displayNumber = 0;

exerciseForm.addEventListener("submit", function (event) {
  event.preventDefault();
  displayCard();
});

// Display card when form is submitted
function displayCard() {
  const inputName = inputExercise.value.trim();

  const exerciseName = document.createElement("p");
  const showReps = document.createElement("p");
  const addSet = makeBtn("ADD SET", () => addSetBtn(inputName, displayNumber));
  const decrementing = makeBtn("-", decrementBtn);
  const incrementing = makeBtn("+", incrementBtn);
  const saveBtn = makeBtn("SAVE", save);

  exerciseName.textContent = inputName.toUpperCase();
  showReps.textContent = displayNumber;

  createCards.append(
    exerciseName,
    showReps,
    addSet,
    decrementing,
    incrementing
  );

  saveCont.append(saveBtn);

  function incrementBtn() {
    displayNumber++;
    showReps.textContent = displayNumber;
  }

  function decrementBtn() {
    if (displayNumber > 0) {
      displayNumber--;
      showReps.textContent = displayNumber;
    }
  }

  function save() {
    // Save setts array to local storage
    saveToLocalStorage("setts", setts);
    // createGraph([]);
    clearDisplayCard();
    // clearGraph();
    // Reset displayCard and graph
  }
  // createGraph(savedSetts);
}

function displaySavedData() {
  if (savedSetts) {
    dataDropdown.innerHTML = "";
    // Create dropdown items for each
    savedSetts.forEach((item) => {
      const listItem = document.createElement("p");
      listItem.textContent = `${item.exerciseName}: ${item.reps} `;

      dataDropdown.append(listItem);
    });
  }
}

function clearDisplayCard() {
  inputExercise.value = "";
  displayNumber = 0;
  createCards.innerHTML = "";
  saveCont.innerHTML = "";

  exerciseCounter = 1;
}

// Function to add sets to an array
function addSetBtn(exerciseName, displayNumber) {
  const updatedExerciseName = exerciseName + " " + exerciseCounter;
  const setData = {
    exerciseName: updatedExerciseName,
    reps: displayNumber,
  };
  setts.push(setData);
  console.log(setts);

  exerciseCounter++;

  createGraph();
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

function clearLocalStorage() {
  localStorage.clear();
}

dataBtn.addEventListener("click", () => {
  savedSetts = getFromLocalStorage("setts");
  if (savedSetts) {
    setts = savedSetts;
  }

  displaySavedData();

  createGraph(savedSetts);
  console.log(savedSetts);
});

deleteBtn.addEventListener("click", () => {
  clearLocalStorage();
  dataDropdown.innerHTML = "";
  savedSetts = null;
  setts = [];
  clearGraph();
});

// Function to create a button
function makeBtn(nameBtn, onClick) {
  const btn = document.createElement("button");
  btn.textContent = nameBtn;
  btn.addEventListener("click", onClick);
  return btn;
}

// Function to create graph
function createGraph() {
  const maxValue = Math.max(...setts.map((point) => point.reps));

  // Graph colors by its percentage
  const colors = setts.map((point) => {
    const percentage = (point.reps / maxValue) * 100;
    if (percentage >= 80) {
      return "rgba(0,200,0,0.6)";
    } else if (percentage >= 50) {
      return "rgba(200,200,0,0.6)";
    } else {
      return "rgba(200,0,0,0.6)";
    }
  });

  const data = [
    {
      x: setts.map((point) => point.exerciseName),
      y: setts.map((point) => point.reps),
      type: "bar",
      orientation: "v",
      marker: { color: colors },
    },
  ];

  const graphHeader = { title: "EXERCISE" };

  Plotly.react("fitness-graph", data, graphHeader);
}

// Clear graph
function clearGraph() {
  fitnessGraph.innerHTML = "";
}
