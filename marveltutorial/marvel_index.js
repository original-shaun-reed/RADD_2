var express = require('express');

const https = require("https");

let body = "";


var app = express();

let nameArr = new Array();
let copyrights;
let subRight;
let sel_pop_colour;
let four_zero_four_img;


app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});


//View Engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.use(require('body-parser').urlencoded({extended: true}));

var credentials = require('./credentials.js');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));

const URL = credentials.api;

/*Retrieving Data from the Marvel Website*/
https.get(URL,  res => {
  res.setEncoding("utf8");
  
  res.on("data", data => {
    body += data;
  });
  
  res.on("end", () => {
    body = JSON.parse(body);  
  });   
}).on('error', function(e) {
    console.log("Got error: " + e.message);
}); 
/*End of Retrieving Data from the Marvel Website*/


/*Rendering the Home Page*/
app.get('/', function(req, res){
  copyrights = body.copyright;
  subRight = body.attributionText;
  subRef = body.attributionHTML;
  visibility = "hidden";
  
   res.render('home', {
                copyright: copyrights, subText: subRight, 
                visStatus: visibility, pop_col: sel_pop_colour
			});
});
/*End of Rendering the Home Page*/

/*Rendering the Marvel Character Names*/
app.get('/marvelcharacters', function(req, res){
  visibility = "hidden";
  for(var i = 0; i < body.data.results.length; i++){
    nameArr[i] = body.data.results[i].name;
  }
  
  res.render('home', 
             {marvelnames: nameArr, copyright: copyrights, 
			 subText: subRight, visStatus: visibility
			 }
			);  
});
/*End of Rendering the Marvel Character Names*/


/*Rendering the Marvel Character Details (Image, Name, Comics, Stories)*/
app.use(function(req, res){
  visibility = "visible";
  var name = req.url.substring(1);
  while(name.includes('%20')){
      name = name.replace('%20', ' ');
  } 

  
  var charTitle;
  var charImg;
  var storiesArr = new Array();
  var comicsArr = new Array();


  for(var i = 0; i < body.data.results.length; i++){
      if(name === body.data.results[i].name){

          charTitle = body.data.results[i].name;
      
          charImg = body.data.results[i].thumbnail.path + '/standard_medium.' + body.data.results[i].thumbnail.extension;
          if(body.data.results[i].stories.items.length === 0){
            storiesArr[0] = "No Stories Available..." 
          }else{
            for(var j = 0; j < body.data.results[i].stories.items.length; j++){
              storiesArr[j] = body.data.results[i].stories.items[j].name;
            }
          }
          
          if(body.data.results[i].comics.items.length === 0){
              comicsArr[0] = "No Comics Available..." 
            }else{
               for(var k = 0; k < body.data.results[i].comics.items.length; k++){
            	 comicsArr[k] = body.data.results[i].comics.items[k].name;	 
               }
            }       	  
      }
  }

  res.render('home', {
               marvelnames: nameArr, charactername: charTitle, marvelimage: charImg,
               storytitle: "STORIES:", storynames: storiesArr, 
               comictitle: "COMICS:", comics: comicsArr,
               copyright: copyrights, subText: subRight, visStatus: visibility
            });
   
});
 /*End of Rendering the Marvel Character Details (Image, Name, Comics, Stories)*/




//Will use the port that is assigned or by default use 8080.
const port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log(`Listening on port ${port}....`);
});