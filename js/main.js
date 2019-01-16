/**
 * Execute the logic on load
 */

window.addEventListener("load", event => {
  const $emailInput = document.querySelector("#email");
  const $passwordInput = document.querySelector("#password");
  const $showPasswordCheckBox = document.querySelector("#showPass");
  const $termsCheckBox = document.querySelector("#terms");

  activateSumbission();

  $emailInput.addEventListener("input", activateSumbission);
  $emailInput.addEventListener("propertychange", activateSumbission);

  $passwordInput.addEventListener("input", activateSumbission);
  $passwordInput.addEventListener("propertychange", activateSumbission);

  $showPasswordCheckBox.addEventListener("change", showPassword);
  $termsCheckBox.addEventListener("change", activateSumbission);
});

strengthMeter = () => {
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

  const $element = document.querySelector("#password");

  const $outDatedMessage = document.querySelector("#req-message");
  if ($outDatedMessage) {
    $outDatedMessage.remove();
  }

  const successClass = "success-password";
  const failedClass = "fail-password";

  const value = $element.value;

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
    message.remove();
    return true;
  } else {
    $element.parentNode.insertBefore(message, $element.nextSibling);
    return false;
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

activateSumbission = () => {
  const $sumbissionBtn = document.querySelector("#submit");
  const $emailField = document.querySelector("#email");
  const $termsCheckBox = document.querySelector("#terms");
  $sumbissionBtn.className = "";

  if (strengthMeter()) {
    if (validateEmail($emailField.value)) {
      if ($termsCheckBox.checked) {
        $sumbissionBtn.disabled = false;
        $sumbissionBtn.className = "enabled";
      }
    }
  }
};

validateEmail = email => {
  // taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
