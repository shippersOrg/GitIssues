var express = require('express'),
	app = express();

app.get('/',function(req,res){
	res.sendFile(__dirname+'/client/index.html');
});

app.use('/js', express.static(__dirname+'/client/js'));
app.use('/html', express.static(__dirname+'/client/views'));


app.listen(3000, function(){
	console.log("Server listening...");
});