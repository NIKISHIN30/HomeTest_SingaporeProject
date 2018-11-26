var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser');
 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/friends_api')
  .then(() => console.log('Mongodb up successfully!'))
  .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoute = require('./api/routes/userRoute');
userRoute(app);

app.listen(port);
console.log('API server started on: ' + port);
