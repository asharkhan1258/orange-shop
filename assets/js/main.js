document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.back-to-top');
  if (btn) {
    window.addEventListener('scroll', () => {
      btn.style.display = window.scrollY > 350 ? 'grid' : 'none';
    });
    btn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const alertBox = form.querySelector('.form-message');
      if (alertBox) {
        alertBox.classList.remove('d-none');
        alertBox.textContent = 'Thanks. Your form is ready to connect to your preferred email or backend service.';
      }
    });
  });
});
