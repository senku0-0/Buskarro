const forgotForm = document.getElementById('forgotForm');
const otpForm = document.getElementById('otpForm');
const resendBtn = document.getElementById('resendBtn');
const resendWrapper = document.getElementById('resendWrapper');
const message = document.getElementById('message');
const timerText = document.getElementById('timerText');

function show(el) {
  el.classList.remove('hidden');
}
function hide(el) {
  el.classList.add('hidden');
}

function startTimer(duration) {
  let timeLeft = duration;
  hide(resendWrapper);
  timerText.innerText = `You can resend OTP in ${timeLeft}s`;

  const countdown = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      timerText.innerText = `You can resend OTP in ${timeLeft}s`;
    } else {
      clearInterval(countdown);
      timerText.innerText = '';
      show(resendWrapper);
    }
  }, 1000);
}

const otpInput = document.getElementById('otp');
const verifyBtn = otpForm.querySelector('button');
verifyBtn.disabled = true;

otpInput.addEventListener('input', () => {
  const otp = otpInput.value.trim();
  verifyBtn.disabled = otp.length !== 6 || !/^\d{6}$/.test(otp);
});

timerText.classList.remove('pulse');
void timerText.offsetWidth;
timerText.classList.add('pulse');

// Backend Validation
forgotForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const csrfToken = document.getElementById("csrfmiddlewaretoken").value;

  fetch('/Forgot-Password/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify({ FormType: "RegisterEmail", email: email }),
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.message);
    message.innerText = data.message;
    if (resendWrapper.classList.contains('hidden')) show(otpForm);
    hide(forgotForm.querySelector('button'));
    startTimer(30);
  });
});


otpForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const csrfToken = document.getElementById("csrfmiddlewaretoken").value;
  const email = document.getElementById('email').value.trim();
  const otp = document.getElementById('otp').value.trim();

  fetch('/Forgot-Password/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify({ FormType: "ValidateOTP", email: email, otp: otp }),
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.message);
    message.innerText = data.message;
    if (data.message === "OTP is valid") {
      message.style.color = 'green';
      setTimeout(() => {
      window.location.href = '/Reset-Password/';
      }, 1000);
    } else {
      message.style.color = 'red';
    }
  });
});

resendBtn.addEventListener('click', function () {
  const email = document.getElementById('email').value.trim();
  message.innerText = 'OTP resent to ' + email;
  startTimer(30);
});
