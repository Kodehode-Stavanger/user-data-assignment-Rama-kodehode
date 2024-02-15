const setts = [];

const input = {
  exerciseInput: document.getElementById("input-cont"),
  exercise: document.getElementById("exercise-cont"),
  addReps: document.getElementById("add-cont"),
  inputExercise: document.getElementById("input-exercise"),
  addBtn: document.getElementById("add-exercise"),

  display() {
    const inputTxt = this.inputExercise.value.trim();
    const txtElement = document.createElement("input");
    txtElement.className = "fake-txt";
    // txtElement.readOnly = true;
    txtElement.value = inputTxt.toUpperCase();
    txtElement.style.border = "none";
    this.inputExercise.value = "";
    this.exercise.append(txtElement);

    this.displayNumber();
    this.saveSet();
    this.makeBtn("-", () => this.incrementBtn());
    this.makeBtn("+", () => this.decrementBtn());
  },

  displayNumber() {
    const displayNumber = document.createElement("h3");
    displayNumber.className = "number";
    displayNumber.textContent = "0";
    this.addReps.append(displayNumber);
  },

  makeBtn(nameBtn, onClick) {
    const btn = document.createElement("button");
    btn.textContent = nameBtn;
    btn.addEventListener("click", onClick);
    this.addReps.append(btn);
    return this.btn;
  },

  incrementBtn() {},

  decrementBtn() {},

  saveSet() {
    const addSet = document.createElement("button");
    addSet.textContent = "ADD SET";

    this.addReps.append(addSet);
  },
};

input.addBtn.addEventListener("click", () => input.display());
