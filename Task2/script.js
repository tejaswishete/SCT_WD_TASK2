let timer;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapCounter = 1;

// Format time in HH:MM:SS
function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update stopwatch display
function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  document.querySelector('.stopwatch').textContent = formatTime(elapsedTime);
}

// Start button click
document.getElementById('start').addEventListener('click', () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 1000);
    isRunning = true;
  }
});

// Pause button click
document.getElementById('pause').addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
});

// Reset button click
document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timer);
  elapsedTime = 0;
  isRunning = false;
  document.querySelector('.stopwatch').textContent = "00:00:00";
  document.getElementById('laps').innerHTML = ""; // Clear laps
  lapCounter = 1; // Reset lap counter
});

// Lap button click
document.getElementById('lap').addEventListener('click', () => {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
    document.getElementById('laps').appendChild(lapItem);
  }
});
