document.addEventListener("DOMContentLoaded", async function(){    
    const keyWeather = '632df3111f20a0f15688a0a00d055cdd'    
    const city = 'Bogota';    
    let currentWeatherDiv = document.getElementById('current-weather');
    let forecastDiv = document.getElementById('weather-forecast')

    let get_weather = () => {        
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keyWeather}&units=metric`

        fetch(url)
        .then((resp) => resp.json())
        .then(data => {   
            if(data.cod !== '200'){
                throw new Error(data.message);
            } 
            
                       

            let currentWeather = data.list[0];
            let sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString();
            let sunset = new Date(data.city.sunset * 1000).toLocaleTimeString();
            let iconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`

            currentWeatherDiv.innerHTML = `
                <h3>${data.city.name}</h3>
                <img src="${iconUrl}" class="weather-icon" alt="weather icon">
                <h1>${currentWeather.main.temp}°C</h1>
                <h4>${currentWeather.weather[0].description}</h4>
                <p>Sunrise: ${sunrise}</p>
                <p>Sunset: ${sunset}</p>`;

            forecastDiv.innerHTML += '';

            for(let i = 0; i < 3; i++){
                let forecast = data.list[i*8];                               
                let date = new Date(forecast.dt * 1000);
                let dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

                forecastDiv.innerHTML +=`
                    <div class"forecast-day">
                        <h3>${dayOfWeek}</h3>                                               
                        <h4>${forecast.main.temp}°C</h4>                        
                    </div>
                `;
            }
            
        }).catch(error => {
            console.error('Error fetching weather data:', error);
            currentWeatherDiv.innerHTML = `<p>Error fetching weather data. Plaese try again</p>`
            forecastDiv.innerHTML = ""
        });
    }
    get_weather();
});