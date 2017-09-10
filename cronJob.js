var request = require('request');
var CronJob = require('cron').CronJob;
let apiCall = new CronJob({
  cronTime: '*/30 * * * * *',
  onTick: function() {
    //call the api from within here
    request('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,CAD,USD,EUR&extraParams=your_app_name', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('making an api call every 30 seconds')
        console.log(body)
      }
    })
  },
  start: false
});
apiCall.start();
