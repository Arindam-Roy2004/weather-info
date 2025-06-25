document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.querySelector('#city-input');
    const searchBtn = document.querySelector('#search-button');
    const weatherDisplay = document.querySelector('#weather-info');
    const cityName = document.querySelector('#city-name');
    const temperature = document.querySelector('#temperature');
    const description = document.querySelector('#description');
    const errorMessage = document.querySelector('#error-message');
    const icon = document.querySelector('.icon');
    const apiKey = 'your_api_key';

    searchBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (city === '') return;
        try {
            const data = await getWeatherData(city);
            displayWeatherdata(data);
        } catch (error) {
            showError('City not found. Please enter a valid city name.');
        }

    })

    async function getWeatherData(city) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    }

    function displayWeatherdata(data) {
        console.log(data);
        const { name, main, weather } = data;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="Weather Icon">`;
        cityName.textContent = name;
        temperature.textContent = `Temperature: ${main.temp} °C`;
        description.textContent = `Weather: ${weather[0].description}`;

        weatherDisplay.classList.remove('hidden');
        errorMessage.classList.add('hidden');

    }

    function showError(message) {
        errorMessage.textContent = message;
        weatherDisplay.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
})
