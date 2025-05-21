document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "6eeb8a9edd9ab6542814e1a86dc27a30";

  const searchBtn = document.getElementById("searchBtn");
  const currentBtn = document.getElementById("currentBtn");
  const cityInput = document.getElementById("cityInput");
  const weatherResult = document.getElementById("weatherResult");
  const forecastDiv = document.getElementById("forecast");
  const recentCities = document.getElementById("recentCities");

  const recentSection = document.getElementById("recentSection");
  const homeSection = document.getElementById("homeSection");
  const recentCitiesDropdown = document.getElementById("recentCitiesDropdown");
  const recentWeatherResult = document.getElementById("recentWeatherResult");
  const recentForecast = document.getElementById("recentForecast");

  const themeToggle = document.getElementById("themeToggle");
  const navHome = document.getElementById("navHome");
  const navRecent = document.getElementById("navRecent");
  const html = document.documentElement;

  // --------- NAVIGATION ---------
  navHome.addEventListener("click", (e) => {
    e.preventDefault();
    homeSection.classList.remove("hidden");
    recentSection.classList.add("hidden");
  });

  navRecent.addEventListener("click", (e) => {
    e.preventDefault();
    homeSection.classList.add("hidden");
    recentSection.classList.remove("hidden");
    renderRecentCitiesDropdown();
  });

  // --------- RECENT CITIES STORAGE & RENDERING ---------
  const saveRecentCity = (city) => {
    let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
    if (!cities.includes(city)) {
      cities.unshift(city);
      cities = cities.slice(0, 5);
      localStorage.setItem("recentCities", JSON.stringify(cities));
    }
  };

  const renderRecentCities = () => {
    const cities = JSON.parse(localStorage.getItem("recentCities")) || [];
    if (cities.length === 0) {
      recentCities.classList.add("hidden");
      return;
    }
    recentCities.classList.remove("hidden");
    recentCities.innerHTML = `<option disabled selected>Recently searched</option>`;
    cities.forEach((city) => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      recentCities.appendChild(opt);
    });
  };

  const renderRecentCitiesDropdown = () => {
    const cities = JSON.parse(localStorage.getItem("recentCities")) || [];
    if (cities.length === 0) {
      recentCitiesDropdown.classList.add("hidden");
      recentWeatherResult.classList.add("hidden");
      recentForecast.classList.add("hidden");
      return;
    }
    recentCitiesDropdown.classList.remove("hidden");
    recentCitiesDropdown.innerHTML = `<option disabled selected>Select a recent city</option>`;
    cities.forEach((city) => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      recentCitiesDropdown.appendChild(opt);
    });
  };

  recentCities.addEventListener("change", () => {
    getWeather(recentCities.value);
  });

  recentCitiesDropdown.addEventListener("change", () => {
    const city = recentCitiesDropdown.value;
    fetchWeatherForRecent(city);
  });

  // --------- WEATHER FETCH & DISPLAY ---------
  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) return alert("Please enter a city name.");
    getWeather(city);
  });

  currentBtn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => alert("Could not access your location.")
    );
  });

  const getWeather = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      displayWeather(data);
      saveRecentCity(city);
      renderRecentCities();
      getForecast(data.coord.lat, data.coord.lon);
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchWeatherForRecent = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      displayRecentWeather(data);
      getRecentForecast(data.coord.lat, data.coord.lon);
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      displayWeather(data);
      saveRecentCity(data.name);
      renderRecentCities();
      getForecast(lat, lon);
    } catch (err) {
      alert("Failed to fetch weather for your location.");
    }
  };

  // Display for HOME section
  const displayWeather = (data) => {
    weatherResult.innerHTML = `
      <h2 class="text-xl font-semibold mb-2">${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      <p>⛅ Weather: ${data.weather[0].description}</p>
    `;
    weatherResult.classList.remove("hidden");
    forecastDiv.classList.remove("hidden");
  };

  const displayRecentWeather = (data) => {
    recentWeatherResult.innerHTML = `
      <h2 class="text-xl font-semibold mb-2">${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      <p>⛅ Weather: ${data.weather[0].description}</p>
    `;
    recentWeatherResult.classList.remove("hidden");
    recentForecast.classList.remove("hidden");
  };

  // Forecast for HOME
  const getForecast = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      displayForecast(data.list, forecastDiv);
    } catch {
      forecastDiv.innerHTML = "<p>Forecast not available.</p>";
    }
  };

  // Forecast for RECENT
  const getRecentForecast = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      displayForecast(data.list, recentForecast);
    } catch {
      recentForecast.innerHTML = "<p>Forecast not available.</p>";
    }
  };

 
// Shared forecast display helper (5-day forecast with one entry per day)
const displayForecast = (list, container) => {
  // Filter for forecasts around noon to get a consistent daily summary
  const filtered = list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);
  
  container.innerHTML = "";

  filtered.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString(undefined, { weekday: "short" });
    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

    const card = document.createElement("div");
    card.className =
      "bg-blue-100 dark:bg-gray-700 rounded p-2 text-center shadow";

    card.innerHTML = `
      <p class="font-semibold">${day}</p>
      <img src="${iconUrl}" alt="${item.weather[0].description}" class="mx-auto" />
      <p>${item.main.temp.toFixed(1)}°C</p>
      <p class="capitalize">${item.weather[0].description}</p>
    `;

    container.appendChild(card);
  });
};


  // Initial render of recent cities on page load
  renderRecentCities();
});
