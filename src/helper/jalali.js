const moment = require('jalali-moment');



exports.jalaliMoment = time => {
    return moment(time.date).locale('fa').format('D / MMM / YYYY');
}