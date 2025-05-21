Weather Forecast Application
Overview
This is a simple weather forecast web application that allows users to:

Search for current weather by city name.

Get weather details based on the user’s current location.

View a 5-day weather forecast.

Keep track of recently searched cities for quick access.

The application fetches data from the OpenWeatherMap API and displays weather information including temperature, humidity, wind speed, and weather conditions.

Features
City Search: Enter a city name to get current weather and 5-day forecast.

Current Location: Use your device’s geolocation to fetch weather data for your current position.

5-Day Forecast: View a daily summary of the weather for the next 5 days.

Recent Searches: Automatically stores the last 5 searched cities in local storage with easy access.

Dark/Light Theme Toggle (if implemented).

Responsive design compatible with desktop and mobile devices.

Setup and Usage
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/weather-forecast-app.git
cd weather-forecast-app
Obtain an OpenWeatherMap API key:

Sign up at OpenWeatherMap.

Get your free API key.

Configure the API key:

Open script.js.

Replace the placeholder API key with your own:

js
Copy
Edit
const apiKey = "YOUR_API_KEY_HERE";
Run the application:

Open index.html in your web browser.

No server setup is required unless you want to use one.

Dependencies
The app uses only vanilla JavaScript and standard web technologies (HTML, CSS).

No external libraries or frameworks are required.

Project Structure
bash
Copy
Edit
/weather-forecast-app
│
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── style.css           # Stylesheet (if included)
├── README.md           # This documentation
├── package.json        # Optional (if using Node/npm)
├── package-lock.json   # Optional
Notes
The app uses the OpenWeatherMap’s free API tier, which has rate limits.

Make sure to keep your API key secure and do not expose it publicly in production.

The app relies on browser geolocation; make sure to allow location permissions.

License
This project is open source and available under the MIT License.

Made by-[Anushka Mitra]
