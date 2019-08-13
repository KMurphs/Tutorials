//npm modules
const express = require('express');
const uuid = require('uuid/v4')
const session = require('express-session')
const redis   = require("redis");
const client  = redis.createClient();
const redisStore = require('connect-redis')(session);
// const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    // axios.get(`http://localhost:5000/users?email=${email}`)
    // .then(res => {
    //   const user = res.data[0]
    //   if (!user) {
    //     return done(null, false, { message: 'Invalid credentials.\n' });
    //   }
    //   if (!bcrypt.compareSync(password, user.password)) {
    //     return done(null, false, { message: 'Invalid credentials.\n' });
    //   }
    //   return done(null, user);
    // })
    // .catch(error => done(error));

    await redisGetHashMapByField("user:*", "email", email).then(res => {
      const user = res
      if (!user) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }
      return done(null, user);
    })
    .catch(error => done(error));
  }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // axios.get(`http://localhost:5000/users/${id}`)
  // .then(res => done(null, res.data) )
  // .catch(error => done(error, false))
  console.log('ahha')
  client.hgetall(`user:${id}`, function (err, obj) {
    console.dir(obj);
    done(null, obj)
  });
});

// create the server
const app = express();

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl:  260}),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

// create the homepage route at '/'
app.get('/', (req, res) => {
  res.send(`You got home page!\n`)
})

// create the login get and post routes
app.get('/login', (req, res) => {
  console.log(req.sessionID)
  res.send(`You got the login page!\n`)
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(info) {return res.send(info.message)}
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/authrequired');
    })
  })(req, res, next);
})

// create the login get and post routes
app.get('/signup', (req, res) => {
  console.log(req.sessionID)
  res.send(`You got the signup page!\n`)
})

app.post('/signup', (req, res, next) => {
  console.log(req.body)
  console.log(req.body.password)

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  redisGetHashMapByField("user:*", "email", req.body.email).then(user => {
    console.log(user)
    if (!user) {
      const userID = uuid();
      client.hmset(`user:${userID}`, "id", userID, "email", req.body.email, "password", hash, function (err, result) {
        console.log(result)
        res.send(`You successfully registered!\n`)
      });
    } else {
      client.hset(user.id, "password", hash, function (err, result) {
        console.log(result)
        res.send(`Password was updated!\n`)
      });
    }
  })
})

app.get('/authrequired', (req, res) => {
  if(req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n')
  } else {
    res.redirect('/')
  }
})

// tell the server what port to listen on
app.listen(3001, () => {
  console.log('Listening on localhost:3001')
  seedDB()
})


const seedDB = function(){
  // client.hmset("user:someid1", "id", "someid1", "email", "testemail1", "password", "hashedpassword1");
  // client.hmset("user:someid2", "id", "someid2", "email", "testemail2", "password", "hashedpassword2");
  // client.hmset("user:someid3", "id", "someid3", "email", "testemail3", "password", "hashedpassword3");
  // client.keys('user:*', function (err, keys) {
  client.keys('*', function (err, keys) {
    if (err) return console.log(err);

    for(var i = 0, len = keys.length; i < len; i++) {
      console.log(keys[i]);
    }
  });  
  client.hgetall(`user:someid3`, function (err, obj) {
    console.dir(obj);
  });
}




const redisGetHashMapByField = function(hashPattern, fieldName, fieldValue){

  return new Promise(function(resolve, reject){

    client.keys(hashPattern, async function (err, items) {

      if(err) reject(err)

      let i;
      for(i = 0; i < items.length; i++) {

        await new Promise(function(resolve, reject){  
          client.hgetall(items[i], function(err, itemData){
            if(err) reject(err)
            if(itemData[fieldName] == fieldValue)
              resolve(itemData);
          })                     
        }).then(res => resolve(res)).catch(err => reject(err))

      }
      if(i == items.length)
        resolve()
    });
  })  
}
