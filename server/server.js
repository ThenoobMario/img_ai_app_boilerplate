// NodeJS is an open source run time environment that executes JavaScript on the server side
let express = require("express") // Import express module and give our program access to it
let app = express() // Create an express application and assign it to the app variable
// An express app is a series of calls to functions called as middleware functions
// These functions have access to HTTP Requests and Response objects as well as the next function for applications request and response cycle

app.use(function (req,res,next) {
    // When a request comes in:
    // 1) Loggin information about the request to the terminal about where the express server is running
    console.log(`${new Date()} - ${req.method} request for ${req.url}`);
    // Pass control to the next handler
    next();
});
// The next handler responds by serving any static files inside the given directory
app.use(express.static("../static"));
// Specify the port at which Express should listen on
app.listen(81,function(){
    console.log("Serving static on port 81")
})