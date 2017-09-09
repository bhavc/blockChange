var request = require('request');
var CronJob = require('cron').CronJob;
let job = new CronJob({
  cronTime: '*/5 * * * * *',
  onTick: function() {
    //call the api from within here
    request('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR&extraParams=your_app_name', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('making an api call every 5 seconds')
        console.log(body)
      }
    })
  },
  start: false
});
job.start();
