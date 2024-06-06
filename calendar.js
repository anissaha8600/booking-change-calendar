/**
 * Author: Anis Saha
 * Date Created: 2024-05-22
 */
import { getDateEventMap, PRODUCT_ID_MAP } from "./product.js"

// get date-event map from the backend
const dateEventMap = getDateEventMap(PRODUCT_ID_MAP.workshop);
console.log(dateEventMap);

// get important interactive html elements
const calendarUI = document.getElementById("cal"); // main calendar div
const calSlider = document.getElementById("cal-slider"); // slider component of calnedar
const eventSpace = document.getElementById("event-space");  // section of calendar slider to showcase events for the day
let prevMonth = document.getElementById("prev-month"); // prev month button
let nextMonth = document.getElementById("next-month");  // next month button
let monthHeader = document.getElementById("month-title");   // header on calendar specifying month

// specify class names for calendar elements
const CAL_ENTRY_CLS = "cal-block";

console.log(prevMonth, nextMonth);
/* Render Month Content when month is switched */
let monthsFromNow = 0;
prevMonth.addEventListener('click', () => {
    monthsFromNow -= 1;
    renderMonth(monthsFromNow);
});

nextMonth.addEventListener('click', () => {
    monthsFromNow += 1;
    renderMonth(monthsFromNow);
});

// get just calendar header so that we can reset when month is changed
const calendarHeaderContent = calendarUI.innerHTML;
renderMonth(0);

/**
 * Callback function for dates with events on calendar to open event display slider when clicked
 * 
 * @param {int} monthsFromNow - number of months from current date
 * @param {int} dayOfMonth - day of month (to index date-event map)
 */
function openEventSliderCallback(monthsFromNow, dayOfMonth) {

    // add events to slider then push it down so user can see
    console.log(dateEventMap[monthsFromNow][dayOfMonth].join('\n'));
    eventSpace.innerHTML = dateEventMap[monthsFromNow][dayOfMonth]
        .map(d => d.html).join("\n");

    // add callbacks to newly added buttons 
    eventSpace.childNodes.forEach(btn => {
        btn.addEventListener("click", () => {setActiveEvent(btn);});
    });


    calSlider.classList.remove("retracted");

}

var activeEvent = null; // singleton for which element is currently active
/**
 * Set event element to active in calendar slider ui
 * 
 * @param {HTMLElement} element 
 */
function setActiveEvent(element) {

    // remove active status from prev selected element
    if (activeEvent !== null) {
        activeEvent.classList.remove(":active");
    }

    // add active status to new class
    activeEvent = element;
    element.classList.add(":active");
}

/**
 * Display calendar for month specified by month delta relative to current date
 * 
 * @param {int} monthsFromNow - number of months from current date to display on calendar
 */
function renderMonth(monthsFromNow) {

    let curr = new Date();
    curr.setMonth(curr.getMonth()+monthsFromNow);

    /* Reset inner HTML with new content whenever month is changed */
    calendarUI.innerHTML = calendarHeaderContent;
    console.log(calendarHeaderContent);

    /* re-query document queries bc pointers got lost on reset :/ */
    prevMonth = document.getElementById("prev-month");
    nextMonth = document.getElementById("next-month");
    monthHeader = document.getElementById("month-title");

    /* listeners got lost so re-adding them too */
    prevMonth.addEventListener('click', () => {
        monthsFromNow -= 1;
        renderMonth(monthsFromNow);
    });
    nextMonth.addEventListener('click', () => {
        monthsFromNow += 1;
        renderMonth(monthsFromNow);
    })


    const dateEntries = [];  // entries on month view of calendar (including spill over from adjacent months)
    
    const dayOfWeekStartEnd = [ // interval tracking first and last DOW for month
        null, null
    ];
    let lastDate = null; // last day of month

    // get first day of month and last
    curr.setDate(1); 
    dayOfWeekStartEnd[0] = curr.getDay();
    let past = new Date(curr);
    past.setDate(past.getDate()-dayOfWeekStartEnd[0]);
    const firstPreDate = past.getDate();

    // fill in edge dates that spillover into previous month
    for (let i=0; i<dayOfWeekStartEnd[0]; i++) {
        dateEntries.push({
            date : i+firstPreDate,
            spill : true
        });
    }

    // find last day of month
    curr.setMonth(curr.getMonth()+1);
    curr.setDate(curr.getDate()-1);
    dayOfWeekStartEnd[1] = curr.getDay();
    lastDate = curr.getDate();

    // fill in month dates
    for (let i=1; i<=lastDate; i++) {
        dateEntries.push({
            date : i,
            spill : false
        });
    }

    // fill in edge dates that spillover into next month
    for (let i=dayOfWeekStartEnd[1]; i<6; i++) {
        dateEntries.push({
            date : i-dayOfWeekStartEnd[1]+1,
            spill : true
        });
    }

    console.log()
    
    // change month on calendar
    let now = new Date(); // reset curr date
    monthHeader.innerHTML = curr.toLocaleString('default', {month: 'long', year: 'numeric'});

    // display onto calendar
    dateEntries.forEach(entry => {
        let div = document.createElement('button')
        div.classList.add(CAL_ENTRY_CLS);
        div.classList.add(curr.toLocaleDateString('default', {month: 'long'}));
        if (entry.spill) div.classList.add('spill');
        else if (monthsFromNow==0 && entry.date === now.getDate()) {
            div.classList.add('today');
        }

        // add event-day class to node if day contains events
        if (!entry.spill && dateEventMap?.[monthsFromNow]?.[entry.date]?.length >= 1) 
        {
            // fade out in css if in past date
            if (monthsFromNow < 0 || monthsFromNow === 0 && entry.date < now.getDate()) {
                div.classList.add("event-date-passed");
            }
            else {
                div.classList.add("event-date");
            }

            div.addEventListener("click", () => {openEventSliderCallback(monthsFromNow, entry.date);});
        }

        div.innerHTML = `<p class="cal-date">${entry.date}</p>`;
        calendarUI.appendChild(div);
    });

}