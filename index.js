document.addEventListener("DOMContentLoaded", function() {
    const billInput = document.getElementById('amount-money');
    const tipButtons = document.querySelectorAll('#percent button');
    const customTipInput = document.getElementById('custom');
    const peopleInput = document.getElementById('amount-people');
    const tipAmountDisplay = document.querySelector('.tip-amount .amount');
    const totalDisplay = document.querySelector('.total .amount');
    const resetButton = document.getElementById('btn-reset');
    const errorMessage = document.querySelector('.error-message');
  
    let billValue = 0;
    let tipValue = 0;
    let peopleValue = 0;
  
    // Handle bill input
    billInput.addEventListener('input', function() {
      billValue = parseFloat(billInput.value);
      calculateTip();
    });
  
    // Handle tip button clicks
    tipButtons.forEach(button => {
      button.addEventListener('click', function() {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        tipValue = parseFloat(button.textContent) / 100;
        customTipInput.value = '';
        calculateTip();
      });
    });
  
    // Handle custom tip input
    customTipInput.addEventListener('input', function() {
      tipButtons.forEach(button => button.classList.remove('active'));
      tipValue = parseFloat(customTipInput.value) / 100 || 0;
      calculateTip();
    });
  
    // Handle people input
    peopleInput.addEventListener('input', function() {
      peopleValue = parseFloat(peopleInput.value);
  
      if (peopleValue <= 0 || isNaN(peopleValue)) {
        errorMessage.style.display = 'block';
        peopleInput.classList.add('invalid');
      } else {
        errorMessage.style.display = 'none';
        peopleInput.classList.remove('invalid');
      }
  
      calculateTip();
    });
  
    // Calculate tip and total amount
    function calculateTip() {
      if (peopleValue > 0) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let totalAmount = (billValue / peopleValue) + tipAmount;
  
        tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
        totalDisplay.textContent = `$${totalAmount.toFixed(2)}`;
      } else {
        tipAmountDisplay.textContent = '$0.00';
        totalDisplay.textContent = '$0.00';
      }
    }
  
    // Handle reset button click
    resetButton.addEventListener('click', function() {
      billInput.value = '';
      customTipInput.value = '';
      peopleInput.value = '';
      tipAmountDisplay.textContent = '$0.00';
      totalDisplay.textContent = '$0.00';
      tipButtons.forEach(button => button.classList.remove('active'));
      errorMessage.style.display = 'none';
      peopleInput.classList.remove('invalid');
      billValue = 0;
      tipValue = 0;
      peopleValue = 0;
    });
  });
  