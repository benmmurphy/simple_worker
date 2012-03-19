var child_processes = require('child_process');
var express = require('express');

var worker = child_processes.fork('worker');

var app = express.createServer();
var responses = {};

var lastId = 0;

function createId() {
  return ++lastId;
}
  
app.get('/', function(req, res){
    var id = createId();
    worker.send({id: id, url: req.url,  query: req.query});
    responses[id] = res;
    console.log("sent request to worker: ", id);
});

function handle_worker_message(msg) {
  console.log("master received message: ", msg);
  var id = msg.id;
  if (id == null) {
    return;
  }

  console.log("received msg: ", id);

  var response = responses[id];

  if (response == null) {
    console.log("could not find response: ", id);
    return;
  }

  response.send(msg.response);
  delete responses[id];
}

worker.on("message", handle_worker_message);

app.listen(3000);

