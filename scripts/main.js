document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.querySelector(".bill-input");
  const tipButtons = document.querySelectorAll(".tipPercentage");
  const customTipInput = document.querySelector(".custom-btn");
  const numPeopleInput = document.querySelector(".people-input");
  const tipAmountDisplay = document.querySelector(".tipAmount");
  const totalAmountDisplay = document.querySelector(".totalAmount");
  const resetButton = document.querySelector(".reset-button");
  const errorMsg = document.querySelector(".error-msg");
  const peopleWrapper = document.querySelector(".people-number");

  let bill = 0;
  let tipPercent = 0;
  let numPeople = 1;

  // Input handler utility
  function handleInput(inputElement, setter) {
    inputElement.addEventListener("input", () => {
      setter(parseFloat(inputElement.value) || 0);
      calculateTip();
    });
  }

  // Setup inputs
  handleInput(billInput, (val) => (bill = val));
  handleInput(numPeopleInput, (val) => {
    numPeople = val;
    validatePeopleInput();
  });

  // Custom tip input
  customTipInput.addEventListener("input", () => {
    clearActiveTips();
    tipPercent = parseFloat(customTipInput.value) / 100 || 0;
    calculateTip();
  });

  // Tip button click
  tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectTipButton(button);
    });
  });

  function selectTipButton(button) {
    clearActiveTips();
    button.classList.add("active");
    tipPercent = parseFloat(button.textContent) / 100;
    customTipInput.value = "";
    calculateTip();
  }

  function calculateTip() {
    if (!validatePeopleInput()) {
      updateDisplay(0, 0);
      return;
    }

    if (bill <= 0) {
      updateDisplay(0, 0);
      return;
    }

    const tipTotal = bill * tipPercent;
    const tipPerPerson = tipTotal / numPeople;
    const totalPerPerson = (bill + tipTotal) / numPeople;

    updateDisplay(tipPerPerson, totalPerPerson);
  }

  function validatePeopleInput() {
    if (numPeople <= 0 || isNaN(numPeople)) {
      errorMsg.style.display = "inline";
      peopleWrapper.classList.add("error");
      return false;
    } else {
      errorMsg.style.display = "none";
      peopleWrapper.classList.remove("error");
      return true;
    }
  }

  function updateDisplay(tip, total) {
    tipAmountDisplay.textContent = `$${tip.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${total.toFixed(2)}`;
  }

  function clearActiveTips() {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
  }

  // Reset button
  resetButton.addEventListener("click", () => {
    bill = 0;
    tipPercent = 0;
    numPeople = 1;
    billInput.value = "";
    customTipInput.value = "";
    numPeopleInput.value = "";
    updateDisplay(0, 0);
    clearActiveTips();
    errorMsg.style.display = "none";
    peopleWrapper.classList.remove("error");
  });
});
