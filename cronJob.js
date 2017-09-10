var request = require('request');
var CronJob = require('cron').CronJob;

let apiCall = new CronJob({
  cronTime: '*/10 * * * * *',
  onTick: function() {
    //call the api from within here
    request('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,CAD,USD,EUR&extraParams=your_app_name', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('making an api call every 10 seconds')
        var json = JSON.parse(body);
        let canadianCurrency = json['CAD']
        console.log(canadianCurrency)
      }
    })
  },

  start: false
});
apiCall.start();


// function getKeyByValue(object, value) {
//   return Object.keys(object).find(key => object[key] == value)
// }
