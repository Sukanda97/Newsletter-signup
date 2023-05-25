const express=require("express");
// const request = require('request');
const bodyParser=require("body-parser");
const https=require("https");

const app=express();

app.use(express.static("public")); //to get local styles and images rendered into nodejs by creating static folder called public and making references wrt to public

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
})


app.post("/",function(req,res){
  const fName=req.body.fName;
  const lName=req.body.lName;
  const email=req.body.email;
  const data = {
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
      FNAME:fName,
      LNAME:lName}
    }]
  };
const jsonData=JSON.stringify(data);
const url="https://us8.api.mailchimp.com/3.0/lists/c7a95b6efd";
const options={
  method:"POST",
  auth:"KSMS:9fe29f105bc20ebc32da032d54d95b51-us8"
}

const request=https.request(url, options, function(response)
{

  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
      res.sendFile(__dirname+"/failure.html");
  }

response.on("data",function(data){
  console.log(JSON.parse(data));

})});

request.write(jsonData);//part of https module
request.end();

});

app.listen(3000, function(){
  console.log("Server up and running");
})


//API Key: 9fe29f105bc20ebc32da032d54d95b51-us8
//List ID: c7a95b6efd
