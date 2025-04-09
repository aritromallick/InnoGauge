document.getElementById('validateBtn').addEventListener('click', async () => {
  const idea = document.getElementById('ideaInput').value.trim();
  if (!idea) {
    alert("Please enter a startup idea.");
    return;
  }

  document.getElementById('validateBtn').innerText = 'Validating...';

  const response = await fetch('/api/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea })
  });

  if (!response.ok) {
    alert('Something went wrong. Try again.');
    document.getElementById('validateBtn').innerText = 'Validate';
    return;
  }

  const data = await response.json();

  document.getElementById('score').innerText = data.score + " / 10";
  document.getElementById('reasoning').innerText = data.reasoning;
  document.getElementById('plan').innerText = data.plan;
  document.getElementById('result').classList.remove('hidden');

  localStorage.setItem('lastIdea', idea);
  localStorage.setItem('lastScore', data.score);
  localStorage.setItem('lastReasoning', data.reasoning);
  localStorage.setItem('lastPlan', data.plan);

  document.getElementById('validateBtn').innerText = 'Validate';
});

// Optional: load last result on page load
window.onload = () => {
  if (localStorage.getItem('lastIdea')) {
    document.getElementById('ideaInput').value = localStorage.getItem('lastIdea');
    document.getElementById('score').innerText = localStorage.getItem('lastScore') + " / 10";
    document.getElementById('reasoning').innerText = localStorage.getItem('lastReasoning');
    document.getElementById('plan').innerText = localStorage.getItem('lastPlan');
    document.getElementById('result').classList.remove('hidden');
  }
};
