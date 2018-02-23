const request = require('request');

var geocodeAddress = (address,callback)=>{
    var encodedAddress = encodeURIComponent(address);//encodes the address for the user to write any address.

    request({//options object where we can configure(things we need to specify our request)
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true //confirms the data coming back is json data and converts strings into objects.
    },(error,response,body)=>{
        if(error){
            callback("Unable to connect");
        }
        else if(body.status === "ZERO_RESULTS"){
            callback("Unable to find the address");
        }
        else if(body.status === "OK"){
            callback(undefined,{
                address     : body.results[0].formatted_address,
                latitude    : body.results[0].geometry.location.lat,
                longitude   : body.results[0].geometry.location.lng
            });//undefined is used here to say that there is no error.
        }
    });
};
module.exports.geocodeAddress = geocodeAddress;//module.exports is an object
