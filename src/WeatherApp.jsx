import { useState } from 'react';
import './App.css';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const apiKey = '537bec8923742cad59b7b485f1879e3c';

    const fetchWeather = async () => {
        if (!city) {
            setError('Напишите город');
            return;
        }
        setError(null);
        setWeather(null);
        setLoading(true);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`
            );
            if (!response.ok) {
                throw new Error('Неизвестный город');
            }
            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <h1><span onClick={() => fetchWeather()}>Узнать</span> погоду в городе</h1>
            <label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Введите город"
                    style={{ padding: '10px', fontSize: '16px', marginBottom: '10px' }}
                />
            </label>
            <br />

            {loading && <p>Загрузка...</p>}
            {error && <p className='error'>{error}</p>}
            {weather && (
                <div className='content'>
                    <h2>Погода в {weather.name}</h2>
                    <p><strong>Температура:</strong> {weather.main.temp}°C</p>
                    <p><strong>Состояние:</strong> {weather.weather[0].description}</p>
                    <p><strong>Влажность:</strong> {weather.main.humidity}%</p>
                    <p><strong>Скорость ветра:</strong> {weather.wind.speed} м/с</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
