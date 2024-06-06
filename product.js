export const PRODUCT_ID_MAP = {
    "workshop": 8246,
    "workshop_trial": 1629,
    "camp_4day": 2063,
    "camp_5day": 924,
    "camp_1day": 2749
  };

const ID_PRODUCT_MAP = {
    8246 : {
        title : "Workshop"
    },
    1629 : {
        title : "Workshop Trial"
    }
}

/** Given a date, return a string representing date w format 'YYYY-mm-ddTHH:I 
 * @param {Date} date - date to be converted
 * @return {string} - converted date in format specified above
*/
function dateToString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}


/** Given a productID and UserID, return a map from every date with a booking
 * slot of the specified product, mapping to the html components of the buttons 
 * to show in the calendar ui
 * 
 * @param {int} productId - id of product as in site database
 * @param {int} userId - id of current user as in site database
 * 
 * @return {Map<string, Array<string>>} - mapping date string to array of html elements 
 *                                        of time slot options for user and product
 */
export function getDateEventMap(productId, userId=0) {

    // will replace this with a backend call when we get there
    const records = [ { date: '2024-05-25T13:30',
    duration: 2,
    available: 6,
    booked: 2,
    product_id: 8246 },
    { date: '2024-05-27T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-05-28T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-06-01T13:30',
    duration: 2,
    available: 5,
    booked: 3,
    product_id: 8246 },
    { date: '2024-06-03T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-06-04T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-06-08T13:30',
    duration: 2,
    available: 5,
    booked: 3,
    product_id: 8246 },
    { date: '2024-06-10T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-06-11T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-06-15T13:30',
    duration: 2,
    available: 6,
    booked: 2,
    product_id: 8246 },
    { date: '2024-06-17T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-06-18T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-06-22T13:30',
    duration: 2,
    available: 6,
    booked: 2,
    product_id: 8246 },
    { date: '2024-06-24T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-06-25T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-06-29T13:30',
    duration: 2,
    available: 6,
    booked: 2,
    product_id: 8246 },
    { date: '2024-07-01T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-07-02T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-07-06T13:30',
    duration: 2,
    available: 7,
    booked: 1,
    product_id: 8246 },
    { date: '2024-07-08T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-07-09T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-07-13T13:30',
    duration: 2,
    available: 7,
    booked: 1,
    product_id: 8246 },
    { date: '2024-07-15T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-07-16T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-07-20T13:30',
    duration: 2,
    available: 7,
    booked: 1,
    product_id: 8246 },
    { date: '2024-07-22T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-07-23T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-07-27T13:30',
    duration: 2,
    available: 7,
    booked: 1,
    product_id: 8246 },
    { date: '2024-07-29T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-07-30T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-08-03T13:30',
    duration: 2,
    available: 7,
    booked: 1,
    product_id: 8246 },
    { date: '2024-08-05T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-08-06T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-08-10T13:30',
    duration: 2,
    available: 7,
    booked: 1,
    product_id: 8246 },
    { date: '2024-08-12T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-08-13T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-08-17T13:30',
    duration: 2,
    available: 7,
    booked: 1,
    product_id: 8246 },
    { date: '2024-08-19T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-08-20T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-08-24T13:30',
    duration: 2,
    available: 7,
    booked: 1,
    product_id: 8246 },
    { date: '2024-08-26T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-08-27T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-08-31T13:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-09-02T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-09-03T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-09-07T13:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-09-09T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-09-10T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-09-14T13:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-09-16T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-09-17T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-09-21T13:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 },
    { date: '2024-09-23T16:30',
    duration: 2,
    available: 8,
    booked: 0,
    product_id: 8246 } ];

    // convert records into date -> html map
    // for display next to calendar component
    const now = new Date();
    let dateEventMap = {};

    
    // get html components for each time slot
    records
    .filter(r => r.product_id === productId)
    .forEach(r => {
        let date = new Date(r.date);
        const mo = date.getMonth();
        const yrs_away = date.getFullYear()-now.getFullYear();
        const dt = date.getDate();

        const totalSlots = r.available + r.booked;
    
        const robj = {
            date : date,
            html : `
            <button class="event-btn ${r.available>0 ? "available" : ""}" ${r.available===0 ? "disabled" : ""}>
                    <span class="slot-indicator"></span>
                    <span class="event-content">
                        <h5>${ID_PRODUCT_MAP[r.product_id].title} (${r.available}/${totalSlots} Available)</h5>
                        <p>${date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}</p>
                    </span>
                </button>
            `
        }
    
        const monthsFromNow = ((yrs_away*12)+mo) - now.getMonth();
        if (!dateEventMap[monthsFromNow]) {
            dateEventMap[monthsFromNow] = {
                dt : [robj]
            }
        } 
        else if (!dateEventMap[monthsFromNow][dt]) {
            dateEventMap[monthsFromNow][dt] = [robj];
        }
        else {
            dateEventMap[monthsFromNow][dt].push(robj);
        }

    });

    console.log("date event map:",dateEventMap);
    return dateEventMap;
}



