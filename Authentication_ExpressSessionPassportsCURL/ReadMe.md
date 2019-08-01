#  [A tutorial on Node.js Server & Authentication Basics: Express, Sessions, Passport, and cURL](https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d)


## File Structure

```
mkdir authTut
cd authTut
mkdir server
mkdir client
```

## Initialize and Run the Server

```
cd server
npm init -y
npm install express --save
touch server.js
```

After, filling the content of server.js. run the server with
```
node server.js
```

Alternatively, install nodemon with ``npm install --save nodemon``
```
nodemon server.js
```

## Setup client

```
cd ..
cd client
cURL -X GET http://localhost:3001/
> you just hit the home page
```

Let's print some verbose along with our cURL request
```
curl -X GET http://localhost:3001 -v
```

Note that the only thing that's actually sent to the server is 
```
> GET / HTTP/1.1
> Host: localhost:3001
> User-Agent: curl/7.55.1
> Accept: */*
```
Our simple curl instruction only set these 4 headers with no body and sends it to the server

On the other hand, the servers' internal ``req`` and ``res`` constructs are built with much more details. But however long that ``req`` and ``res`` object are the response that's actually coming back to the client is just:
```
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 66
< ETag: W/"42-Ybeup68SVZ+Id3fqVh25rCkXfno"
< Date: Wed, 31 Jul 2019 11:17:59 GMT
< Connection: keep-alive
<
You hit the home page without restarting the server automatically
```

## Unique string ids (for session) with uuid

Install on the server the uuid package
```
npm install --save uuid
```

After updating the server.js, the client receives a unique id for each response from the server.

## Adding express-session

It's a middleware that handles session **generation** since express doesn't natively support this.
```
npm install --save express-session
```

Then, after importing the express-session package in our server.js, we add the following code
```
// add & configure middleware
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
```

The genid is called everytime a new session is required. Also, ``return uuid`` will ensure that the generated string id (by uuid) is used as the sesssion id. We expect the session isd to be stored in ``req.sessionID``, meaning that the first time the genid function is called ``console.log(req.sessionID)`` will output ``undefined`` and after that the generated string id.

After "curl-ing" again from the client, we get this output on the server side.
```
Inside the session middleware
undefined
Inside the homepage callback function
bc610c2b-0010-4afc-95fb-e3d99a953956
```
The last two lines are output from the ``app.get('/')`` route with the lines
```
  console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  res.send(`You hit home page!\n`)
```

Now on the client side, magically with have an extra line generated in the response: The ``Set-Cookie:`` header.
```
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 19
< ETag: W/"13-y2PmXwA28Cet0Gh6rtuO8tM+Gc8"
< Set-Cookie: connect.sid=s%3Abc610c2b-0010-4afc-95fb-e3d99a953956.r%2B94awKzkdgsla0R41hlKJxjM0Vg4Z8IT2haDLP5v6E; Path=/; HttpOnly
< Date: Wed, 31 Jul 2019 11:32:26 GMT
< Connection: keep-alive
<
You hit home page!
```

It is my understanding that the ``connect.sid=s%3Abc610c2b-0010-4afc-95fb-e3d99a953956.r%2B94awKzkdgsla0R41hlKJxjM0Vg4Z8IT2haDLP5v6E`` is some crypto-transformed result of the uuid string in ``req.sessionID`` and the secret passed to the session object on the server (i.e. ``secret: 'keyboard cat',``)


Also notice that each time the server is "curl-ed", the genid on the server keeps on getting called and generates a new string id resulting in a set-cookie content on the client's that is always different. 
> **Browsers will automatically save/send the session id** and send it in each request to the server; however, cURL doesn’t automatically save our session ID and send it in the request headers.

## Set up client to send back sessionID

This can be easily done:

To save the sessionid **in the cookie**
```
curl -X GET http://localhost:3001 -c cookie-file.txt
```

To use the saved the sessionid **from the cookie**
```
curl -X GET http://localhost:3001 -v -b cookie-file.txt
```

The ``-c`` means that
> -c, --cookie-jar <filename> Write cookies to <filename> after operation (from ``curl --help``)

Also note the ``-b`` option
> -b, --cookie <data> Send cookies from string/file



After using the cookie, our ``curl -X GET http://localhost:3001 -v -c cookie-file.txt`` curl request gives
```
> GET / HTTP/1.1
> Host: localhost:3001
> User-Agent: curl/7.55.1
> Accept: */*


< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 19
< ETag: W/"13-y2PmXwA28Cet0Gh6rtuO8tM+Gc8"
< Set-Cookie: connect.sid=s%3A03b37adf-b872-4f80-9b9f-40b85d88cdb2.3D6g6h%2BCKRpBs7IjHp9q%2Fw1tYifQSW1B5BwCVpXFdiA; Path=/; HttpOnly
< Date: Wed, 31 Jul 2019 11:48:20 GMT
< Connection: keep-alive
<
You hit home page!
```

The content of ``cookie-file.txt``
```
# Netscape HTTP Cookie File
# https://curl.haxx.se/docs/http-cookies.html
# This file was generated by libcurl! Edit at your own risk.

#HttpOnly_localhost     FALSE   /       FALSE   0       connect.sid     s%3A03b37adf-b872-4f80-9b9f-40b85d88cdb2.3D6g6h%2BCKRpBs7IjHp9q%2Fw1tYifQSW1B5BwCVpXFdiA
```

Note how the cookie line from the response header is saved in the cookie file.
From there on, using ``curl -X GET http://localhost:3001 -v -b cookie-file.txt`` gives
```
> GET / HTTP/1.1
> Host: localhost:3001
> User-Agent: curl/7.55.1
> Accept: */*
> Cookie: connect.sid=s%3A03b37adf-b872-4f80-9b9f-40b85d88cdb2.3D6g6h%2BCKRpBs7IjHp9q%2Fw1tYifQSW1B5BwCVpXFdiA

< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 19
< ETag: W/"13-y2PmXwA28Cet0Gh6rtuO8tM+Gc8"
< Date: Wed, 31 Jul 2019 11:51:35 GMT
< Connection: keep-alive
<
You hit home page!
```
and on the server, the lgos from the genid are gone, we repeatedly get the same output
```
Inside the homepage callback function
03b37adf-b872-4f80-9b9f-40b85d88cdb2
```

Note, how the cookie is not being appended in the server's response when being sent by the client.

### Altering the cookie.

I went on to alter the cookie from the file, adn replaced the last character "A" into a "B", and renamed the altered file into ``cookie-file-altered.txt``. Then
```
curl -X GET http://localhost:3001 -v -b cookie-file-altered.txt
```
sent back
```
> GET / HTTP/1.1
> Host: localhost:3001
> User-Agent: curl/7.55.1
> Accept: */*
> Cookie: connect.sid=s%3A03b37adf-b872-4f80-9b9f-40b85d88cdb2.3D6g6h%2BCKRpBs7IjHp9q%2Fw1tYifQSW1B5BwCVpXFdiB

< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 19
< ETag: W/"13-y2PmXwA28Cet0Gh6rtuO8tM+Gc8"
< Set-Cookie: connect.sid=s%3Ae450f9a3-c237-47b4-acad-b6150f153fbf.J%2FkE5gbh2e8KCV1Bx1rnQmctXIqjuNAg7ytt2k9%2B7tQ; Path=/; HttpOnly
< Date: Wed, 31 Jul 2019 11:59:26 GMT
< Connection: keep-alive
<
You hit home page!
``` 

A new cookie was generated, and this is confirmed by the logs on the server
```
Inside the session middleware
undefined
Inside the homepage callback function
e450f9a3-c237-47b4-acad-b6150f153fbf
```

Everytime the ``curl -X GET http://localhost:3001 -v -b cookie-file-altered.txt`` is issued and since the new cookie sent back is not saved, the server keeps on creating a new one. 
However, when ``curl -X GET http://localhost:3001 -v -b cookie-file.txt`` is issued (using the original unaltered cookie file), the reponse is back to normal adn the server logs do not register that genid was called.
```
> GET / HTTP/1.1
> Host: localhost:3001
> User-Agent: curl/7.55.1
> Accept: */*
> Cookie: connect.sid=s%3A03b37adf-b872-4f80-9b9f-40b85d88cdb2.3D6g6h%2BCKRpBs7IjHp9q%2Fw1tYifQSW1B5BwCVpXFdiA

< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 19
< ETag: W/"13-y2PmXwA28Cet0Gh6rtuO8tM+Gc8"
< Date: Wed, 31 Jul 2019 12:02:57 GMT
< Connection: keep-alive
<
You hit home page!
```

This tells me that the ``session`` module on the server keeps a list of clients using their sessionIds. And when a session id is sent to the server, that it does not recognize, it just assumes that this a new client a issues a new session id, and make sure that it does not identifies this "new" client with the "suspicious" sessionid it sent, meaning that repeating the same messsage with the invalid sessionid will just results in a new one being generated each time.

It also important to note that when the server dies the memory of all these sessionid dies along with it. We need a persistent storage for session ids to prevent that, because after the server's death all client with sessionid that were valid so far, will have their sessionids invalidated and will be assumed to be new clients and get new sessionids.

The persistent storage for sessions is called a **``session store``**

## Setting up a Session Store

We will use one that uses a file as a session store - ``session-file-store`` installed on the server with ``npm install session-file-store --save``
The session configuration becomes
```
// add & configure middleware
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(), //A store is added
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
```

> When we use the the ‘session-file-store’ module, by default, it creates a new ‘/sessions’ directory when it is first called. The first time and each subsequent time that we create a new session, the module creates a new file for the session info in the /sessions folder

Also, because of this last remark, we need to start our nodemon mon server and tell it to ignore changes to the sessions folder ``nodemon --ignore sessions/ server.js``. To ease things a little bit, the package.json is changed to start the nodemon server in this way by calling ``npm run dev:server``

After issuing a ``curl -X GET http://localhost:3001 -v -c cookie-file.txt``, we get a new session file generated in the sessions folder on the server
```
{
	"cookie":{
		"originalMaxAge":null,
		"expires":null,
		"httpOnly":true,
		"path":"/"
	},
	"__lastAccess":1564575961299
}
```
Also, the server logs indicate that a new session id was generated.

After restarting the server, ``curl -X GET http://localhost:3001 -v -b cookie-file.txt`` generates logs on the server that show that the server did not generated a new session for this client.


## Authentication

> [Authentication is the act of proving an assertion, such as the identity of a computer system user. In contrast with identification, the act of indicating a person or thing's identity, authentication is the process of verifying that identity](https://en.wikipedia.org/wiki/Authentication)

In order to implement authentication, we first need to capture identities by signing up (login/logout functionality) with an id (usually email) associated with a secret (usually a password) that can be used from thereon to **verify the identity** of a future user who claims to be the *user identified by the previously registered id (i.e email)*

### Login/Logout Endpoints

We also want to be able to POST (submit data to the server), and for that we need an utility that will parse the data we will send to the server and save the parsed data into req.body as a json object allowing further manipulations - Run ``npm install body-parser --save`` on the server
```
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
```
and
```
// create the login get and post routes
app.get('/login', (req, res) => {
  console.log('Inside GET /login callback function')
  console.log(req.sessionID)
  res.send(`You got the login page!\n`)
})

app.post('/login', (req, res) => {
  console.log('Inside POST /login callback function')
  console.log(req.body)
  res.send(`You posted to the login page!\n`)
})
```

> You’ll notice in the above that when we configure our app to use the body-parser middleware, *bodyParser.json() and bodyParser.urlencoded()*. **While we are sending our data directly to the server in JSON format**, if we ever added and actual frontend to our application, the data in the **POST request Content-Type would come through as a ‘application/x-www-form-urlencoded’**. Here, we’re including it just in case you ever want to use this file as boilerplate for a new project.

### Authentication Utility

Install the *passport.js authentication utility* module along with the *passport-local authentication strategy* module ``npm install passport passport-local --save``
The passport flow is a little bit weird to follow since the code isn't written in order.
```
New user 										// posting data email and password
1.	app.use body parser 						// 
	app.use session and genid					// since new user, new session id is generated
	app.use possport initialize 				// nothing? 

2.	app.use(passport.session())					// fetches user from filestore using session id 
	passport.deserializeUser 					// first, checks whether there is a user previouslu authenticated and associated with the current session
															//then calls the deserializer callback to getuserbyid()

3.	app.post 									// Hits the post endpoint/route, the callback.1 provided is executed
	passport.authenticate (auth strategy)		// in callback.1, the passport authenticate calls a function associated with the strategy
	passport.use(new LocalStrategy)				// call database db.finduserbyemail(), if password match return found user, (or empty user)
	passport.authenticate (callback)			// in callback.1, in passport authenticate's still, it calls callback.2 with found user (or empty) 
													       // (here the user exists (user) but not logged in (req.session.passport, req.user))
	req.login(user)								// first calls the serializer then callback.3
	passport.serializeUser 						// User id is save to the session file store here. req.session.passport, req.user are also populated (i.e. the user is logged in)
															// req.isAuthenticated() is set to return true

4. 	res.send 									// sending response back to client
```

Note that the passport is just **``req.session.passport: {"user":"2f24vvg"}``** and that the user in req.user **``req.user: {"id":"2f24vvg","email":"test@test.com","password":"password"}``**
The file store becomes 
```
{
	"cookie":{
		"originalMaxAge":null,
		"expires":null,
		"httpOnly":true,
		"path":"/"
	},
	"passport":{
		"user":"2f24vvg"
	},
	"__lastAccess":1564578120281
}
```

Note: It is my understanding that serialize mean give a user a serial number (session id generated by express session). It saves the user id to the session file, therefore assocaiting the user with the sessionid "serial number". Then deserialize, retrieves a user given its "serial number", the sessionid provided by the clientin his request's cookie.

### From the client's perspective.

user, no session, home page 
curl -X GET http://localhost:3001 -c cookie-file.txt
Inside session middleware genid function
Request object sessionID from client: undefined
Inside the homepage callback
e3eb93aa-fd71-4837-8f2c-370db50eb39d

user, session, authentication required page
curl -X GET http://localhost:3000/authrequired -b cookie-file.txt -L
Inside GET /authrequired callback
User authenticated? false
Inside the homepage callback
e3eb93aa-fd71-4837-8f2c-370db50eb39d


user, with or without session, login
curl -X POST  http://localhost:3001/login -v -b cookie-file.txt -H "Content-Type: application/json" -d '{"email":"test@test.com", "password":"password"}'
Inside POST /login callback
Inside local strategy callback
Local strategy returned true
Inside passport.authenticate() callback
req.session.passport: undefined
req.user: undefined
Inside serializeUser callback. User id is save to the session file store here Inside req.login() callback
req.session.passport: {"user":"2f24vvg"}
req.user: {"id":"2f24vvg","email":"test@test.com","password":"password"}

user, with session (since already authenticated), authentication required page
curl -X GET http://localhost:3001/authrequired -b cookie-file.txt -L
Inside deserializeUser callback
The user id passport saved in the session file store is: 2f24vvg
Inside GET /authrequired callback
User authenticated? true


unauth session
```
{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"__lastAccess":1564582101635}
```
auth session
```
{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"__lastAccess":1564582101635,"passport":{"user":"2f24vvg"}}
```


## User Database

```
mkdir db
cd db
npm init -y
npm install json-server --save
touch db.json
```
> json-server is a package that automatically sets up RESTful routes for data in the db.json file


Let's seed our json db with
```
{
  "users": [
    {
      "id":"2f24vvg",
      "email": "test@test.com",
      "password": "password" 
    },
    {
      "id":"d1u9nq",
      "email": "user2@example.com",
      "password": "password"
    }
  ]
}
```
in the ``db.json`` file. Then start the json db server ``npm run json:server``, and visit ``http://localhost:5000/users``

> Then open http://localhost:5000/users in your browser. You should see the JSON from our db.json file being output. Try hit a specific /users route: http://localhost:5000/users/2f24vvg. You should just see the id, email, and password for that one user. Let’s try that again, but instead of passing the user id directly into the URL, let’s pass an email address in as a query parameter to the URL: http://localhost:5000/users?email=user2@example.com. This time you should get our 2nd user’s JSON object.


### Setup server to request data from data server

``npm install axios --save`` then ``curl http://localhost:3001/login -c cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"test@test.com", "password":"password"}' -L`` should yield
``you hit the authentication endpoint``

> Note, I’ve excluded the ‘-X POST’ flag as we want cURL to follow the redirect from the /login route to the /authrequired route, which we GET. If we leave the ‘-X POST’ flag then it will try to post to the /authrequired route as well. Instead, we’ll just let cURL infer what it should do on each route.


### Setup server to handle encrypting password

Install bcrypt on the server ``npm install bcrypt-nodejs --save``. [this tool](https://www.browserling.com/tools/bcrypt) can be used to hash the word "password" and to get "$2a$10$w2SPgxcxZAO7aLk0M8nqEuK6Yz.KAWOd/uf8NrjRgQSvRQud0jvyq". We can now update our json data db with
```
{
  "users": [
    {
      "id":"2f24vvg",
      "email": "test@test.com",
      "password": "$2a$12$nv9iV5/UNuV4Mdj1Jf8zfuUraqboSRtSQqCmtOc4F7rdwmOb9IzNu" 
    },
    {
      "id":"d1u9nq",
      "email": "user2@example.com",
      "password": "$2a$12$VHZ9aJ5A87YeFop4xVW.aOMm95ClU.EviyT9o0i8HYLdG6w6ctMfW"
    }
  ]
}
```

Now again, ``curl http://localhost:3001/login -c cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"test@test.com", "password":"password"}' -L`` should yield
``you hit the authentication endpoint``