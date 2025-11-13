document.getElementById('ping')?.addEventListener('click', async () => {
  const result = document.getElementById('result');
  result.textContent = 'Pinging...';
  try {
    const res = await fetch('/test-api');
    const data = await res.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    result.textContent = 'Error: ' + (err?.message || err);
  }
});
