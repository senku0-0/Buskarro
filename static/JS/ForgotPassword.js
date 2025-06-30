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

forgotForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();

  if (!email) {
    message.innerText = 'Please enter your email.';
    return;
  }

  message.innerText = 'OTP sent to ' + email;
  show(otpForm);
  hide(forgotForm.querySelector('button'));
  startTimer(30);
});

otpForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const otp = document.getElementById('otp').value.trim();
  message.innerText = otp === '123456'
    ? 'OTP verified. Proceed to reset password.'
    : 'Incorrect OTP. Try again.';
});

resendBtn.addEventListener('click', function() {
  const email = document.getElementById('email').value.trim();
  message.innerText = 'OTP resent to ' + email;
  startTimer(30);
});


const otpInput = document.getElementById('otp');
const verifyBtn = otpForm.querySelector('button');

// Start with the button disabled
verifyBtn.disabled = true;

otpInput.addEventListener('input', () => {
  const otp = otpInput.value.trim();
  verifyBtn.disabled = otp.length !== 6 || !/^\d{6}$/.test(otp);
});


timerText.classList.remove('pulse');
void timerText.offsetWidth;
timerText.classList.add('pulse');
