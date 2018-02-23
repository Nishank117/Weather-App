const yargs   = require ('yargs');

const geocode = require ('./geocode/geocode');
const weather = require ('./weather/weather');
const argv = yargs
    .options({
        a:{
            demand  : true,
            alias   : 'address',
            describe: 'Adress to search for',
            string  : true //this tells yargs to always parse the address argument as an string.
        }
    })
    .help()
    .alias('help','h')
    .argv;
geocode.geocodeAddress(argv.address, (errorMessage,results)=>{
    if(errorMessage){
        console.log(errorMessage);
    }
    else{
        console.log(results.address);//undefined skips the filtering function
        weather.weatherInfo(results.latitude,results.longitude,(errorMessage,weatheresults)=>{
            if(errorMessage){
                console.log(errorMessage);
            }
            else{
                console.log(`It's currently${weatheresults.temperature} but it feels like${weatheresults.appparentTemperature}`);
            }
        });
    }
});
