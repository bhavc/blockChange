A Cryptocurrency portfolio web application. Tracks your coins, networth, daily
changes to coins you're holding and other coin metrics that a modern day investor
would be interested in. Built in notification feature also sends alerts depending on user preferences. 

![intro](https://user-images.githubusercontent.com/16729002/30709420-2f166822-9ed0-11e7-8734-b6d0aca40f11.png)
<img width="1679" alt="1" src="https://user-images.githubusercontent.com/16729002/30709428-32033fec-9ed0-11e7-845a-1f3eb33a18ab.png">

Historical pricing for the top 10 coins by market cap 
![screen shot 2017-09-25 at 10 08 24 am](https://user-images.githubusercontent.com/16729002/30812739-96eb7ac6-a1d9-11e7-8a45-a6b31d51b93a.png)

Reddit API pulls in real time data from the r/cryptocurrency subreddit

<img width="1680" alt="2" src="https://user-images.githubusercontent.com/16729002/30709437-370dd8bc-9ed0-11e7-9e3a-685223ac957e.png">



Want to be notified of Bitcoins value at the end of the day? Set a notification. How about a notification for when the value of Ethereum dips 10%? Set a query and you will be notified when the conditions are met. Notification is delivered using SMS and Email. 

<img width="1680" alt="3" src="https://user-images.githubusercontent.com/16729002/30709440-38ff4a66-9ed0-11e7-849c-e5aaf5012896.png">





Built using:
- HTML & CSS (Materialize)
- React.js
- Express
- Node
- Postgres


Uses React BoilerPlate

### Usage

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

You must also start the actual server found in the Server file using the following: 
```
node server.js
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
