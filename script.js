const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');
const greetingElement = document.getElementById('greeting');
const toggleFormatBtn = document.getElementById('toggleFormat');
const toggleSecondsBtn = document.getElementById('toggleSeconds');
const toggleThemeBtn = document.getElementById('toggleTheme');
const timezoneSelect = document.getElementById('timezone');

let is24HourFormat = true;
let isDarkTheme = true;
let showSeconds = true;
let selectedTimezone = 'local';

function updateTime() {
    const now = new Date();

    const timeOptions = {
        hour12: !is24HourFormat,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: selectedTimezone === 'local' ? undefined : selectedTimezone
    };
    
    if (showSeconds) timeOptions.second = '2-digit';

    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: selectedTimezone === 'local' ? undefined : selectedTimezone
    };

    clockElement.textContent = now.toLocaleTimeString('en-US', timeOptions);
    dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
    updateGreeting(now);
}

function updateGreeting(now) {
    const options = {
        hour: '2-digit',
        hour12: false,
        timeZone: selectedTimezone === 'local' ? undefined : selectedTimezone
    };
    const hour = parseInt(now.toLocaleTimeString('en-US', options));
    
    let greeting = 'Good Evening!';
    if (hour < 12) greeting = 'Good Morning!';
    else if (hour < 18) greeting = 'Good Afternoon!';
    
    greetingElement.textContent = greeting;
}

function toggleFormat() {
    is24HourFormat = !is24HourFormat;
    updateTime();
}

function toggleSeconds() {
    showSeconds = !showSeconds;
    updateTime();
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark', isDarkTheme);
}

toggleFormatBtn.addEventListener('click', toggleFormat);
toggleSecondsBtn.addEventListener('click', toggleSeconds);
toggleThemeBtn.addEventListener('click', toggleTheme);
timezoneSelect.addEventListener('change', (e) => {
    selectedTimezone = e.target.value;
    updateTime();
});

updateTime();
setInterval(updateTime, 1000);