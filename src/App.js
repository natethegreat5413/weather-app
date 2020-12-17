import React, { useState } from 'react';
import video1 from './videos/main-cold.mp4';
import video2 from './videos/warm.mp4';
import './App.css';

const api = {
	key: '6058be314a2f14b693d529aca2d08577',
	base: 'https://api.openweathermap.org/data/2.5/'
};

function App() {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});

	const search = (evt) => {
		if (evt.key === 'Enter') {
			fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setQuery('');
					console.log(result);
				});
		}
	};

	const dateBuilder = (d) => {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${month} ${date},  ${year}`;
	};

	// let locationIcon = document.querySelector('.weather-icon');
	// const { icon } = weather.weather[0];

	return (
		<div className={typeof weather.main != 'undefined' ? (weather.main.temp >= 65 ? 'app warm' : 'app') : 'app'}>
			{/* <video
				className={typeof weather.main != 'undefined' ? (weather.main.temp > 65 ? 'app warm' : 'app') : 'app'}
				autoPlay
				loop
				muted
				src={video1}
			/> */}
			<main>
				<div className="search-box">
					<input
						type="text"
						className="search-bar"
						placeholder="Search..."
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					/>
				</div>
				{typeof weather.main != 'undefined' ? (
					<div>
						<div className="location-box">
							<div className="location">
								{weather.name}, {weather.sys.country}
							</div>
							<div className="date">{dateBuilder(new Date())}</div>
						</div>
						<div className="weather-box">
							<div className="temp">{Math.round(weather.main.temp)}°f</div>
							<div className="weather">
								{weather.weather[0].description}
								<br />
								{
									<img
										className="weather-image"
										src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
									/>
								}
							</div>
						</div>
					</div>
				) : (
					''
				)}
			</main>
		</div>
	);
}

export default App;
