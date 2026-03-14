let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();

        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit'
        };
    const formattedTime = now.toLocaleTimeString('en-US', options);
    dateTimeElement.textContent = `${formattedTime}`;
}

function createCalendar(month, year) {
    const calendarBody = document.getElementById('calendar-body');
    const monthYearElement = document.getElementById('month-year');
    const now = new Date();
    const today = now.getDate();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    monthYearElement.textContent = `${monthNames[month]} ${year}`;

    let calendarHTML = '<table>';
    calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
    calendarHTML += '<tr>';

    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<td></td>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        if ((firstDay + day - 1) % 7 === 0 && day !== 1) {
            calendarHTML += '</tr><tr>';
        }

        if (day === today && month === now.getMonth() && year === now.getFullYear()) {
            calendarHTML += `<td class="today">${day}</td>`;
        } else {
            calendarHTML += `<td>${day}</td>`;
        }
    }

    calendarHTML += '</tr></table>';
    calendarBody.innerHTML = calendarHTML;
}

function toggleCalendar() {
    const calendarElement = document.getElementById('calendar');

    if (calendarElement.style.display === 'none' || calendarElement.style.display === '') {
        calendarElement.style.display = 'block';
        createCalendar(currentMonth, currentYear);
    } else {
        calendarElement.style.display = 'none';
    }
}

function changeMonth(increment) {
    currentMonth += increment;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    createCalendar(currentMonth, currentYear);
}

window.onload = function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);

    document.getElementById('date-time').addEventListener('click', toggleCalendar);
    document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
    document.getElementById('next-month').addEventListener('click', () => changeMonth(1));
};
