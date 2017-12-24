var express = require('express');
var app = express();



app.get('/', function(req, res){   
    res.sendfile("./index.html");
    
});

app.get('/baidukfc/getall', function(req, res){
    var pg = require('pg');
    var conString = "postgres://postgres:86732629jj@123.206.102.193/scarp";
    var client = new pg.Client(conString); 
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        client.query('SELECT * FROM public."BAIDUKFC"', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            client.end();
            res.send(JSON.stringify(result['rows']));
        });
    });
})

app.get('/baidukfc/setxy', function(req, res){
    var pg = require('pg');
    var conString = "postgres://postgres:86732629jj@123.206.102.193/scarp";
    var client = new pg.Client(conString);
    var result = "";
    client.connect(function(err) {
      if(err) {
        result = "could not connect to postgres";
        return console.error('could not connect to postgres', err);
      }
      client.query("UPDATE public.\"BAIDUKFC\" SET  lng=" + req.query.lng + ", lat=" + req.query.lat + " WHERE id = '"+ req.query.id + "';", 
      function(err, result) {
        if(err) {
          result = "error running query";
          return console.error('error running query', err);
        }else {
          result = "success";
        }
        client.end();
        res.send("{\"response\":\"" + result + "\"}")
      })
    })
})

var server = app.listen(8082, function () {
    
    var host = server.address().address
    var port = server.address().port
    
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
    
})