const app = require("express")();
const body = require("connect-multiparty")();
const cors = require("cors");
const NodeGeocoder = require('node-geocoder');

app.use(cors());

const options = {
 provider: 'google',
 httpAdapter: 'https',
 apiKey: 'AIzaSyBj9eHpHrAz0-qQ2X8RdCemYu7Z-66HNY8',
 formatter: null
};

const geocoder = NodeGeocoder(options);

app.get("/",body,(req,res) => {
    res.status(200).json({hello:"World!"});
})

app.post("/geo",body,(req,res) => {
    geocoder.geocode(req.body.address)
    .then(function(response) {
      res.status(200).json(response);
    })
    .catch(function(err) {
        res.status(500).json(err);
    });
});


app.listen(process.env.PORT || 5000,(err) => {
    if(err){
        console.log(err);
    } else {
        console.log("listen port 5000");
    }
})