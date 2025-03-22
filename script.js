const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');
const toggleFormatBtn = document.getElementById('toggleFormat');
const toggleThemeBtn = document.getElementById('toggleTheme');

let is24HourFormat = true;
let isDarkTheme = true;

function updateTime() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    let timeString;
    if (is24HourFormat) {
        timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    } else {
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);

    clockElement.textContent = timeString;
    dateElement.textContent = dateString;
}

function toggleFormat() {
    is24HourFormat = !is24HourFormat;
    updateTime();
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark', isDarkTheme);
}

toggleFormatBtn.addEventListener('click', toggleFormat);
toggleThemeBtn.addEventListener('click', toggleTheme);

updateTime();
setInterval(updateTime, 1000);