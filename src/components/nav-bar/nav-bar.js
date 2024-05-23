import React, { useState } from 'react';

const NavBar = ({ getWeatherForCity, btnSearchIsBlocked }) => {
	const [ value, setValue ] = useState('');

	const searchHandler = () => {
		if (!value.trim()) {
			return false;
		}
		getWeatherForCity(value.trim());
	};

	return (
		<nav className="navbar navbar-dark navbar-expand-lg bg-primary">
			<div className="menu-container">
				<div className="navbar-brand"><a href="/">WeatherSPA</a></div>
			</div>
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					placeholder="Enter city name"
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
				<div className="input-group-append">
					<button
						className="btn btn btn-dark"
						type="button"
						onClick={searchHandler}
						disabled={btnSearchIsBlocked}
					>Search</button>
				</div>
			</div>
		</nav>
	)
};

export default NavBar;
