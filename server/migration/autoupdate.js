
var dataSource = require(process.cwd() + "/server/server.js").dataSources["test"];
dataSource.autoupdate(function(err) {
  if(err) {
    console.log("err in autoupdate:: ", err);
  }
  process.exit();
});

