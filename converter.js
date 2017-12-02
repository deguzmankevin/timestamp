var sugar = require('sugar-date');
var date;
var unix;
module.exports = function (query) {
  var parse = sugar.Date.create(query);
  if (isUnix(query)) {
    date = new Date(parseInt(query));
    unix = query;
  }
  if (isDate(query)) {
    date = parse.toString().slice(0, 11);
    unix = Date.parse(query);
  }
  if (parse == 'Invalid Date') {
    date = null;
    unix = null;
  }
  
  var dateObj = {"unix": unix, "natural": date};
  return dateObj;
}


function isDate(q) {
  return q.charAt(0).match(/[a-z]/i);
}
function isUnix(q) {
  return q.charAt(0).match(/[0-9]/i);
}
function naturalToUnix(nat) {
  var natural = sugar.Date.create(nat);
  
}

function unixToNatural(unix) {
  
}
