const setts = [];

const input = {
  exerciseInput: document.getElementById("input-cont"),
  exercise: document.getElementById("exercise-cont"),
  addMinusCont: document.getElementById("add-minus-cont"),
  inputExercise: document.getElementById("input-exercise"),
  addExercise: document.getElementById("add-exercise"),
  displayCont: document.getElementById("display-cont"),

  displayNumb: 0,

  display() {
    const inputTxt = this.inputExercise.value.trim();
    const txtElement = document.createElement("input");
    txtElement.className = "fake-txt";
    txtElement.value = inputTxt.toUpperCase();
    txtElement.style.border = "none";
    this.inputExercise.value = "";

    this.exercise.append(txtElement);

    this.displayNumber();
    this.saveSet();
    this.makeBtn(this.addMinusCont, "-", () => this.decrementBtn());
    this.makeBtn(this.addMinusCont, "+", () => this.incrementBtn());
  },

  displayNumber(container) {
    const displayNumbEl = document.createElement("h3");
    displayNumbEl.className = "number";
    displayNumbEl.textContent = this.displayNumb;
    this.addMinusCont.append(displayNumbEl);
  },

  makeBtn(container, nameBtn, onClick) {
    const btn = document.createElement("button");
    btn.textContent = nameBtn;
    btn.addEventListener("click", onClick);
    container.append(btn);
    return btn;
  },

  incrementBtn() {
    this.displayNumb++;
    this.updateDisplayNumb();
  },

  decrementBtn() {
    if (this.displayNumb > 0) {
      this.displayNumb--;
      this.updateDisplayNumb();
    }
  },

  updateDisplayNumb() {
    const displayNumbEl = document.querySelector(".number");
    if (displayNumbEl) {
      displayNumbEl.textContent = this.displayNumb;
    }
  },

  saveSet(container) {
    const addSet = document.createElement("button");
    addSet.textContent = "ADD SET";

    this.addMinusCont.append(addSet);
  },
};

input.addExercise.addEventListener("click", () => input.display());
