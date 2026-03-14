let timerInterval;
let accumulatedTime = 0; // Track accumulated break time in seconds for today
let db;

document.getElementById('breakButton').addEventListener('click', openModal);
document.getElementById('closeButton').addEventListener('click', closeModal);

function openModal() {
    document.getElementById('breakModal').style.display = 'block';
    updateCurrentTime();
    timerInterval = setInterval(updateTimer, 1000);
    loadTimeLog();
}

function closeModal() {
    document.getElementById('breakModal').style.display = 'none';
    clearInterval(timerInterval);
    saveLogEntry();
}

function updateTimer() {
    accumulatedTime++;
    if (accumulatedTime >= 3600) {
        clearInterval(timerInterval);
        document.getElementById('breakImage').src = 'buttons/breaktimeend.png';
        document.getElementById('timer').textContent = 'Break Over';
    } else {
        document.getElementById('timer').textContent = formatTime(accumulatedTime);
    }
}

function formatTime(seconds) {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('currentTime').textContent = timeString;
    setTimeout(updateCurrentTime, 1000);
}


function initIndexedDB() {
    const request = indexedDB.open('BreakTimerDB', 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        db.createObjectStore('timeLog', { autoIncrement: true });
    };

    request.onsuccess = function(event) {
        db = event.target.result;
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}

function saveLogEntry() {
    const now = new Date();
    const logEntry = {
        date: now.toLocaleDateString(),
        startTime: now.toLocaleTimeString(),
        timer: formatTime(accumulatedTime)
    };

    const transaction = db.transaction(['timeLog'], 'readwrite');
    const objectStore = transaction.objectStore('timeLog');
    objectStore.add(logEntry);
}

function loadTimeLog() {
    const transaction = db.transaction(['timeLog'], 'readonly');
    const objectStore = transaction.objectStore('timeLog');
    const request = objectStore.getAll();

    request.onsuccess = function(event) {
        const logs = event.target.result;
        const timeLogDiv = document.getElementById('timeLog');
        timeLogDiv.innerHTML = '';
        logs.forEach(log => {
            const logEntry = document.createElement('div');
            logEntry.textContent = `${log.date}, ${log.startTime}, ${log.timer}`;
            timeLogDiv.appendChild(logEntry);
        });
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}


initIndexedDB();
