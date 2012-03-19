var request = require('request');

var successful = 0;
var failures = 0;

var concurrent_requests = 0;

function run_request() {
  var rnd = Math.random();
  var expected = "ECHO: " + rnd;
  ++concurrent_requests;
  request({uri:'http://localhost:3000?echo=' + rnd}, function (error, response, body) {
      --concurrent_requests;
      if (body == expected) {
        ++successful;
        console.log("Success: ", concurrent_requests);
      } else {
        ++failures;
        console.log("Expected: " + expected + " but was: " + body);
      }
      add_requests();
  });
}

function add_requests() {
  while (concurrent_requests < 10) {
    run_request();
  }
};

add_requests();
