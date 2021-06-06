import $ from 'jquery';
import {basketBehavior} from './cartBehaviour';

export let daysCounter = (min, max) =>
{
  let startDay = min.split('-');
  let endDay = max.split('-');

  startDay = new Date(startDay[0], startDay[1], startDay[2]);
  endDay = new Date(endDay[0], endDay[1], endDay[2]);
  let sDMiniseconds = parseInt(startDay.getTime()/1000);
  let eDMiniseconds = parseInt(endDay.getTime()/1000);

  let diff = eDMiniseconds - sDMiniseconds;
  let diffInHours = diff/3600;
  var diffInDays = diffInHours/24;

  return diffInDays;
}

export let calendar = () => {
    let date = new Date()
    let minDate = date.toISOString().substring(0, 10);

    let addNextDay = (day) => {
        return (day.substring(0,8) + (parseInt(day.substring(8,10), 10) + 1));
    }

    let maxDate = addNextDay(minDate);
    let latestDate = (parseInt(minDate.substring(0,4), 10) +1) + minDate.substring(4,10);

    let fragment = $(`<div class="datepicker-element"></div>`);
    let datepickerFrom = $(`<h5>From:</h5> 
                            <input
                            class="datepicker datepicker-from"
                            type="date"
                            min="${minDate}"
                            max="${latestDate}"
                            />`);
    let datepickerTo = $(`<h5>To:</h5>
                         <input
                         class = "datepicker datepicker-to" 
                         type = "date"
                         min = "${maxDate}"
                         max = "${latestDate}"
                         value = "${maxDate}"
                         />`);

    //detect the change
        datepickerFrom.bind('input', (e) => {
    // handle events
        minDate = e.target.value;
        let nextDay = addNextDay(minDate);
        $('.datepicker-to').val(nextDay);
        $('.datepicker-to').attr("min", nextDay);
        basketBehavior();
    });

    datepickerTo.bind('input', (e) => {
        maxDate = e.target.value;
        basketBehavior();
    });

    fragment.append(datepickerFrom).append(datepickerTo);
    return fragment;
}