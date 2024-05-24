// get important elements
const calendarUI = document.getElementById("cal");
let prevMonth = document.getElementById("prev-month");
let nextMonth = document.getElementById("next-month");
let monthHeader = document.getElementById("month-title");

// set class names
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
 * Display calendar for month specified by month delta relative to current date
 * 
 * @param {int} monthsFromNow - number of months from current date to display on calendar
 */
function renderMonth(monthsFromNow) {

    let curr = new Date();
    curr.setMonth(curr.getMonth()+monthsFromNow);

    /* The above approach wasn't working so I'm just going to use HTML strings */
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
    for (i=1; i<=lastDate; i++) {
        dateEntries.push({
            date : i,
            spill : false
        });
    }

    // fill in edge dates that spillover into next month
    for (i=dayOfWeekStartEnd[1]; i<6; i++) {
        dateEntries.push({
            date : i-dayOfWeekStartEnd[1]+1,
            spill : true
        });
    }

    console.log()
    
    // change month on calendar
    now = new Date(); // reset curr date
    monthHeader.innerHTML = curr.toLocaleString('default', {month: 'long', year: 'numeric'});

    // display onto calendar
    dateEntries.forEach(entry => {
        div = document.createElement('button')
        div.classList.add(CAL_ENTRY_CLS);
        div.classList.add(curr.toLocaleDateString('default', {month: 'long'}));
        if (entry.spill) div.classList.add('spill');
        else if (monthsFromNow==0 && entry.date === now.getDate()) {
            div.classList.add('today');
        }
        div.innerHTML = `<p class="cal-date">${entry.date}</p>`;
        calendarUI.appendChild(div);
    });

}