document.getElementById('about-action')?.addEventListener('click', async () => {
  const out = document.getElementById('about-result');
  out.textContent = 'Working...';
  try {
    // small demo: fetch same /test-api
    const res = await fetch('/test-api');
    const data = await res.json();
    out.textContent = `Server time: ${data.time}`;
  } catch (err) {
    out.textContent = 'Error: ' + (err?.message || err);
  }
});
