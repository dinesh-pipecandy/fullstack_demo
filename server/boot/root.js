'use strict';

module.exports = function(server) {
  var router = server.loopback.Router();

  // router.get('/^\/([^a][^p][^i]|.{1,2}|.{4,})\/.*$/', function(req,res,next){
  router.get(/^\/([^a]|a[^p]|ap[^i]|api[^/]).*$/, function(req,res,next){
    res.sendFile('/home/hp/Experiments/lb_React_gulp/React_lb/client/build/index.html');
  });


  server.use(router);
};
