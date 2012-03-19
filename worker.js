process.on("message", function(msg) {
  console.log("worker received msg: ", msg);
  setTimeout(function() {
    var result = {id: msg.id, response: "ECHO: " + msg.query.echo};
    console.log("sending result: ", result);
    process.send(result);
  }, 500);
});
