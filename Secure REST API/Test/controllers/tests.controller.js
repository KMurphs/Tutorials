exports.getReply = function(req, res) {
    const testObject = {
        test: "Test Object"
    }

    for (const idx in Object.keys(req.query)) {
        const key = Object.keys(req.query)[idx]
        testObject[key] = req.query[key]
    }

    console.log("\nServer Received Test Request:")
    console.log(req.method + " " + req.url)
    console.log("Server Responded with Test Object:")
    console.log(testObject)
    res.status(200).json(testObject);
}


exports.getDefaultReply = function(req, res) {
    const testObject = {
        test: "Route not Supported"
    }

    for (const idx in Object.keys(req.query)) {
        const key = Object.keys(req.query)[idx]
        testObject[key] = req.query[key]
    }

    console.log("\nServer Received Test Request:")
    console.log(req.method + " " + req.url)
    console.log("Server Responded with Test Object:")
    console.log(testObject)
    res.status(404).json(testObject);
}


exports.postReply = function(req, res) {
    const testObject = {
        tests: "Tests Objects"
    }

    for (const idx in Object.keys(req.body)) {
        const key = Object.keys(req.body)[idx]
        testObject[key] = req.body[key]
    }

    console.log("\nServer Received Test Request:")
    console.log(req.method + " " + req.url)
    console.log("Server Responded with Test Object:")
    console.log(testObject)
    res.status(200).json(testObject);
}


exports.postDefaultReply = function(req, res) {
    const testObject = {
        tests: "Route not Supported"
    }

    for (const idx in Object.keys(req.body)) {
        const key = Object.keys(req.body)[idx]
        testObject[key] = req.body[key]
    }

    console.log("\nServer Received Test Request:")
    console.log(req.method + " " + req.url)
    console.log("Server Responded with Test Object:")
    console.log(testObject)
    res.status(404).json(testObject);
}


exports.putReply = function(req, res) {
    const testObject = {
        tests: "Tests Objects"
    }

    for (const idx in Object.keys(req.body)) {
        const key = Object.keys(req.body)[idx]
        testObject[key] = req.body[key]
    }

    console.log("\nServer Received Test Request:")
    console.log(req.method + " " + req.url)
    console.log("Server Responded with Test Object:")
    console.log(testObject)
    res.status(200).json(testObject);
}


exports.putDefaultReply = function(req, res) {
    const testObject = {
        tests: "Route not Supported"
    }

    for (const idx in Object.keys(req.body)) {
        const key = Object.keys(req.body)[idx]
        testObject[key] = req.body[key]
    }

    console.log("\nServer Received Test Request:")
    console.log(req.method + " " + req.url)
    console.log("Server Responded with Test Object:")
    console.log(testObject)
    res.status(404).json(testObject);
}



exports.deleteReply = function(req, res) {
    const testObject = {
        tests: "Tests Objects"
    }

    console.log("\nServer Received Test Request:")
    console.log(req.method + " " + req.url)
    res.status(200).json({})
}


exports.deleteDefaultReply = function(req, res) {
    const testObject = {
        tests: "Route not Supported"
    }

    console.log("\nServer Received Test Request:")
    console.log(req.method + " " + req.url)
    res.status(404).json({})
}