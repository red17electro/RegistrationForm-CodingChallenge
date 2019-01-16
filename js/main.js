/**
 * Execute the logic on load
 */

window.addEventListener("load", event => {
  const $passwordInput = document.querySelector("#password");
  const $showPasswordInput = document.querySelector("#showPass");

  $passwordInput.addEventListener("input", strengthMeter); // register for oninput
  $passwordInput.addEventListener("propertychange", strengthMeter); // for IE8
  $showPasswordInput.addEventListener("change", showPassword);
});

strengthMeter = e => {
  var passwordRequirements = [
    {
      regex: /.*[A-Z]/,
      message: "a capital letter "
    },
    {
      regex: /.*[a-z]/,
      message: "a lowercase letter "
    },
    {
      regex: /.*[!@#$%^&*() =+_-]/,
      message: "a special character "
    },
    {
      regex: /.*\d/,
      message: "a number "
    },
    {
      message: "at least 8 characters long"
    }
  ];
  var errors = false;

  const sumbissionBtn = document.querySelector("#submit");
  const outDatedMessage = document.querySelector("#req-message");
  if (outDatedMessage) {
    outDatedMessage.remove();
  }

  const successClass = "success-password";
  const failedClass = "fail-password";

  const value = e.target.value;

  const message = document.createElement("p");
  message.id = "req-message";
  message.innerHTML = "Make sure your password contains at least ";

  for (var i = 0; i < passwordRequirements.length; i++) {
    const para = document.createElement("p");
    para.innerHTML = passwordRequirements[i].message;

    if (passwordRequirements[i].hasOwnProperty("regex")) {
      if (value.search(passwordRequirements[i].regex) < 0) {
        errors = true;
        para.className = failedClass;
      } else {
        para.className = successClass;
      }
    } else {
      if (value.length < 8) {
        errors = true;
        para.className = failedClass;
      } else {
        para.className = successClass;
      }
    }

    message.append(para);
  }

  if (!errors) {
    message.remove;
    sumbissionBtn.disabled = false;
  } else {
    e.target.parentNode.insertBefore(message, e.target.nextSibling);
  }
};

showPassword = e => {
  const $passwordInput = document.querySelector("#password");
  if (e.target.checked) {
    $passwordInput.type = "text";
  } else {
    $passwordInput.type = "password";
  }
};
