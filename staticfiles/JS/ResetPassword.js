const newPass = document.getElementById('newPassword');
const confirmPass = document.getElementById('confirmPassword');
const submitBtn = document.getElementById('submitBtn');
const statusMsg = document.getElementById('statusMessage');

const rules = {
  length: document.getElementById('ruleLength'),
  upper: document.getElementById('ruleUpper'),
  number: document.getElementById('ruleNumber'),
  symbol: document.getElementById('ruleSymbol'),
  match: document.getElementById('ruleMatch'),
};

function validatePasswords() {
  const password = newPass.value.trim();
  const confirm = confirmPass.value.trim();

  const validLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password && confirm && password === confirm;

  toggleRule(rules.length, validLength);
  toggleRule(rules.upper, hasUpper);
  toggleRule(rules.number, hasNumber);
  toggleRule(rules.symbol, hasSymbol);

  const allValid = validLength && hasUpper && hasNumber && hasSymbol && passwordsMatch;
  submitBtn.disabled = !allValid;

  if (!passwordsMatch && password && confirm) {
    statusMsg.innerText = 'Passwords do not match';
    statusMsg.style.color = 'crimson';
  } else {
    statusMsg.innerText = '';
  }
}

function toggleRule(el, passed) {
  el.classList.toggle('hidden', passed);
}

newPass.addEventListener('input', validatePasswords);
confirmPass.addEventListener('input', validatePasswords);

document.getElementById('resetForm').addEventListener('submit', function (e) {
  e.preventDefault();
  statusMsg.innerText = 'Password changed successfully!';
  statusMsg.style.color = '#28a745';
});

// Backend
const resetForm = document.getElementById('resetForm');

resetForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const csrfToken = document.getElementById("csrfmiddlewaretoken").value;
  fetch('/Reset-Password/', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify({
      FormType: "ResetPassword",
      newPassword: newPass.value.trim(),
    }),
  })
    .then(res => res.json())
    .then(data => 
    {
      console.log(data.message);
    });
  });