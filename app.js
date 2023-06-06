const express = require("express");
const https = require("https")
const bodyparser = require("body-parser")


const app = express();
app.use(bodyparser.urlencoded({ extended: true }));



app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const query = req.body.cityname;
    const apikey = "b4318ca79406f37004f937cc5bdd7680";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp
            const dis = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon

            const image = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1> the weather  is currently " + dis + " </h1>")
            res.write("<h1> the temprature in "+ query +" is " + temp + " degrees celcius </h1>")
            res.write("<img src=" + image + ">")
            res.send()
        })
        // res.send("server is up and running")  ekk time pe ek send req bhj skte h  send req mtlb ki the end . to humlog send ki write use krenge write kitna bhi us ekr skte h
    })

})




app.listen(3000, function () {
    console.log("server is running on port 3000");
})