'use strict';

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let monthsWith31Days = ['January', 'March', 'May', 'July', 'August', 'October', 'December'];


function isALeapYear(year) {
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}


function findCenturyCode(cc) {
    return (-2*cc) + (8 * Math.floor(cc / 4) + 6)
}


function dayOfTheWeek(year, month, day) {
    let yy = year % 100;
    let yearCode = (yy + Math.floor(yy / 4)) % 7;

    let monthCodes = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5]
    let monthCode = monthCodes[months.indexOf(month)];

    let cc = Math.floor(year / 100);
    let centuryCode = findCenturyCode(cc);

    let leapYearCode = isALeapYear(year) && (month === 'February' || month === 'January') ? -1 : 0;

    let dayOfTheWeek = (yearCode + monthCode + centuryCode + day + leapYearCode) % 7;
    if (dayOfTheWeek === 0) {
        return 7;
    }
    return dayOfTheWeek;
}

let calendar = document.querySelector('.calendar');
let currentMonth = new Date().getMonth();
let currentDay = new Date().getDate();
let currentYear = new Date().getFullYear();

let currentMonthOnCalendar;

for (let i = 2000; i < currentYear + 1; i++) {
    createCalendar(i);
}

function createCalendar(year) {
    let yearDiv = document.createElement('div');
    yearDiv.setAttribute('class', 'year');

    let element = document.createElement('h1');
    element.textContent = year;
    element.setAttribute('class', 'yearHeader')
    yearDiv.appendChild(element);

    for (let month of months) {

        // figure out the number of days in the month

        let daysInThisMonth;
        if (monthsWith31Days.includes(month)) {
            daysInThisMonth = 31;
        } else if (month === 'February') {
            if (isALeapYear(year)) {
                daysInThisMonth = 29;
            } else {
                daysInThisMonth = 28;
            }
        } else {
            daysInThisMonth = 30;
        }

        // create a table out of those days
        let monthDiv = document.createElement('div');
        monthDiv.setAttribute('class', 'month');

        element = document.createElement('h2');
        element.textContent=month;
        element.setAttribute('class', 'monthHeader');
        monthDiv.appendChild(element);

        element = document.createElement('table');
        let rowElement = document.createElement('tr');

        let dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
        for (let day = 0; day < 7; day++) {
            let dayElement = document.createElement('th');
            dayElement.innerHTML = dayNames[day];
            rowElement.appendChild(dayElement);
        }
        element.appendChild(rowElement);

        rowElement = document.createElement('tr');
        let firstDayOfTheMonth = dayOfTheWeek(year, month, 1);
        for (let day = (-1 * firstDayOfTheMonth) + 2; day <= daysInThisMonth; day++) {
            let dayElement = document.createElement('td');
            if (day === currentDay && months.indexOf(month) === currentMonth && year === currentYear) {
                dayElement.setAttribute('id', 'currentDay');
                currentMonthOnCalendar = monthDiv;
            }
            day < 1 ? dayElement.innerHTML = '&nbsp;' : dayElement.innerHTML = day;
            rowElement.appendChild(dayElement);

            if (((day + firstDayOfTheMonth - 1) % 7 === 0 && day !== 0) || day === daysInThisMonth) {
                element.appendChild(rowElement);
                rowElement = document.createElement('tr');
            }

        }
        monthDiv.appendChild(element);

        yearDiv.appendChild(monthDiv);
    }
    calendar.appendChild(yearDiv);
}

currentMonthOnCalendar.scrollIntoView();