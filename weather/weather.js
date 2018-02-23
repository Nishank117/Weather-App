const request = require ('request');

var weatherInfo = (lat,lng,callback)=>{
    request({//options object
    url: `https://api.darksky.net/forecast/f728e101008caa0bf382b0864486fdea/${lat},${lng}`,
    json : true
},(error,response,body)=>{

    if(!error && response.statusCode === 200){
        callback(undefined,{
            temperature        : body.currently.temperature,
            actualTemperature  : body.currently.appparentTemperature
        });
            }   else{
        callback('unable to fetch weather');
        }
    });
};
module.exports.weatherInfo = weatherInfo;
