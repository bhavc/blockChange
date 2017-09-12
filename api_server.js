let express = require('express');
let app = express()

app.post('/notification', (req, res) => {
	res.send('HEY')
});

app.listen(8080)
console.log('Running at http://0.0.0.0:8080')