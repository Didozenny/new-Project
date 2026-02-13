/**
 * Name check & redirect - Oliver/mice get CuteImage, others get meanSkeleton
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.protocol === 'file:') {
    const warn = document.getElementById('file-warning');
    if (warn) warn.style.display = 'block';
  }

  const input = document.getElementById('name-input');
  const landing = document.getElementById('landing');
  const cuteResult = document.getElementById('cute-result');
  const meanResult = document.getElementById('mean-result');

  if (!input) return;

  // Normalize: lowercase, trim, collapse spaces, remove accents
  function normalize(str) {
    return str.trim().toLowerCase()
      .replace(/\s+/g, ' ')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // remove accents
  }

  // Accepted variations of Oliver Diego Antonio Brito Alarcon
  const oliverVariations = [
    'oliver diego antonio brito alarcon',
    'oliver diego antonio brito',
    'oliver diego antonio',
    'oliver diego brito',
    'oliver diego alarcon',
    'oliver antonio brito',
    'oliver antonio alarcon',
    'oliver brito alarcon',
    'oliver diego',
    'oliver antonio',
    'oliver brito',
    'oliver alarcon',
    'oliver',
    'oli',
    'diego antonio brito alarcon',
    'antonio brito alarcon',
  ];

  // Mouse/rat words in English, Spanish & diminutives (diminutivos) → CuteImage
  const mouseWords = [
    // English
    'mouse',
    'mice',
    'house mouse',
    'deer mouse',
    'field mouse',
    'wood mouse',
    'harvest mouse',
    'dormouse',
    'pocket mouse',
    'jumping mouse',
    'striped field mouse',
    'yellow-necked mouse',
    'meadow vole',
    'vole',
    // Spanish - común
    'raton',
    'ratón',
    'ratones',
    // Spanish - diminutivos
    'ratoncito',
    'ratoncillo',
    'ratoncillos',
    'ratoncitos',
    'ratoncín',
    'ratoncete',
    'ratoncillo de campo',
    'ratoncito de campo',
    'ratoncillo del campo',
    // Spanish - species
    'raton casero',
    'ratón casero',
    'raton de campo',
    'ratón de campo',
    'raton del campo',
    'ratón del campo',
    'raton de bosque',
    'ratón de bosque',
    'raton domestico',
    'ratón doméstico',
    'raton comun',
    'ratón común',
    'raton silvestre',
    'ratón silvestre',
    'raton albino',
    'ratón albino',
    'raton espiguero',
    'ratón espiguero',
    'raton de cosecha',
    'ratón de cosecha',
    // Guaren (guinea pig / cuy) & diminutivos
    'guaren',
    'guarencito',
    'guarencillo',
    'guarencillos',
    'guarencitos',
    'guarencín',
  ];

  // All cute page matches (normalized, no accents)
  const cuteMatches = new Set([
    ...oliverVariations.map(normalize),
    ...mouseWords.map(normalize),
  ]);

  function goesToCutePage(name) {
    const norm = normalize(name);
    if (!norm) return false;

    if (cuteMatches.has(norm)) return true;

    // Oliver: check word combinations
    const fullName = 'oliver diego antonio brito alarcon';
    if (fullName.includes(norm) || norm.includes('oliver') || norm === 'oli') return true;
    const allowedWords = ['oliver', 'oli', 'diego', 'antonio', 'brito', 'alarcon'];
    const words = norm.split(' ').filter(w => w.length > 0);
    if (words.every(w => allowedWords.includes(w)) && (words.includes('oliver') || words.includes('oli'))) return true;

    return false;
  }

  const meanAudio = document.getElementById('mean-audio');

  function playMeanAudio() {
    if (!meanAudio) return;
    meanAudio.loop = true;
    meanAudio.volume = 1;
    meanAudio.play().catch(() => {});
  }

  // Unlock audio when user first interacts (focus input) - helps bypass browser autoplay blocks
  input.addEventListener('focus', function unlock() {
    if (meanAudio) {
      meanAudio.play().then(() => meanAudio.pause()).catch(() => {});
      meanAudio.currentTime = 0;
    }
    input.removeEventListener('focus', unlock);
  }, { once: true });

  function showResult(goToCute) {
    document.body.classList.add('has-result');
    if (goToCute) {
      cuteResult.classList.add('active');
      cuteResult.setAttribute('aria-hidden', 'false');
      if (meanAudio) {
        meanAudio.pause();
        meanAudio.currentTime = 0;
      }
    } else {
      meanResult.classList.add('active');
      meanResult.setAttribute('aria-hidden', 'false');
      playMeanAudio();
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();
    const name = input.value.trim();

    if (!name) return;

    const goToCute = goesToCutePage(name);

    if (!goToCute) {
      playMeanAudio();
    }
    showResult(goToCute);
  });
});
