const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get("/", (req, res) => {
   //.send("/index.html");
   res.sendFile(__dirname + '/index.html');
});

app.post("/", (req, res) => {
   // console.log(req.body)
   // console.log(req.body.num1)
   // console.log(req.body.num2)
   var num1 = Number(req.body.num1);
   var num2 = Number(req.body.num2);
   var result = num1 + num2;
   res.send("The  calculation result is : " + result);
});

app.get('/bmiCalculator', (req, res) => {
   res.sendFile(__dirname + '/bmiCalculator.html');
});


app.post('/bmiCalculator', (req, res) => {
   console.log(req.body)
   var W = Number(req.body.weight);
   var H = Number(req.body.height);
   var x = Math.round(W / (H ** 2));
   let bmi = ("Calculate BMI is : " + x + "\n" + "น้ำหนักของคุณอยู่ในเกณฑ์");

   if (x <= 18) {
      bmi += "ผอมเกินไปสารอาหารไม่เพียงพอ"
   }
   else if (x >= 18.6 && x <= 22.9) {
      bmi += "น้ำหนักปกติเหมาะสม"
   }
   else if (x >= 23 && x <= 24.9) {
      bmi += "น้ำหนักเกิน"
   }
   else if (x >= 25.0 && x <= 29.9) {
      bmi += "อ้วน"
   }
   else if (x >= 30.0) {
      bmi += "อ้วนมาก"
   }
   else {
      bmi += "โปรดคำนวนใหม่จ้าาา"
   }
   res.send(bmi);
});

app.get('/kanye', async (req, res) => {
   try {
      const url = 'https://api.kanye.rest/'; // Replace with the URL you want to fetch data from
      const response = await axios.get(url);
      res.json(response.data); // Send the fetched data as a response
   } catch (error) {
      res.status(500).send('Error fetching data');
   }
});


app.listen(3000, () => {
   console.log("Server is running on port 3000");
});
