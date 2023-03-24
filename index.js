const express=require("express");

const bodyParser=require("body-parser");
const { STATUS_CODES } = require("http");

const app=express();
//make https req in Nodejs

const https=require("https");
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");


});
app.post("/",function(req,res){
    // console.log("okk1");
    //city name is from text ip from form ip
   // console.log(req.body.cityName);

    //from here just api ka backchodi
    const CityQuery=req.body.cityName;
  const ApiKey="5419edf0f3707a1c3ec3013949eb5597";
  const Units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+CityQuery+"&appid="+ApiKey+"&units="+Units;

  //we are taking city name from user and fetcing data from there 

  
// const url="https://api.openweathermap.org/data/2.5/weather?q=London&appid=5419edf0f3707a1c3ec3013949eb5597";
    //it will fetch data form weather api or external server
    https.get(url,function(response){
        //console.log(response,STATUS_CODES);
        //"on" takes the response from the server in hexadecimal 
        response.on("data",function(data){
            //Parsing Through Weather Data JSON.parse converts a js script notation
        //into object
            const WeatherData=JSON.parse(data);
           // console.log(WeatherData);
            //parsing a specific data like temperatur
            const temp3=WeatherData.main.temp;
            const temp1= WeatherData.wind.speed;
 //taking the icon through the code
            const icon=WeatherData.weather[0].icon;
            const imgURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
           
           // console.log(temp1);
            res.write("<h1>the Temperature in "+ +""+CityQuery+"is"+temp3+"degree Celcius</h1><br>")
             
            res.write("the description of weather is"+temp1+" ")
           
           res.write("<img src="+imgURL+">")
           res.send();
          
          
           
            
        });

        
        
    });
    // then send to the root home of the client side 
    // only one send works at a time
    // multiple ke liye write method
   // res.send("hmmm");
    
});













app.listen(3000,function(){
    console.log("server is running on 3000");
})