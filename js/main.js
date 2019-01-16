/**
 * Execute the logic on load
 */

window.addEventListener("load", event => {
  const $passwordInput = document.querySelector("#password");

  const strengthMeter = function(e) {
    debugger;
    console.log();
  };

  $passwordInput.addEventListener("input", strengthMeter); // register for oninput
  $passwordInput.addEventListener("propertychange", strengthMeter); // for IE8
});
