//https://shiya.io/send-http-requests-to-a-server-with-node-js/

const http = require("http")
    // const http = require("https")
const config = require("../common/config/env.config")


const options = {
    host: "localhost",
    port: config.PORT,
    path: "/users",
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer token"
    }
};


const req = http.request(options, function(res) {
    var responseString = "";
    console.log(res.headers)
    console.log(res.httpVersion)
    console.log(res.statusCode)
    console.log(res.statusMessage)
    console.log(res.url)
    console.log(Object.keys(res.headers))

    res.on("data", function(data) {
        responseString += data;
        // save all the data from response
    });
    res.on("end", function() {
        console.log("Response: ");
        console.log(responseString);
        // print to console when response ends
    });
});


const reqBody = "sometext";
req.write(reqBody);

req.end();