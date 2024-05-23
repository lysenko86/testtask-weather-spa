import React, { Component } from 'react';

import NavBar from '../nav-bar';
import ErrorContent from '../error-content';
import Alert from '../alert';
import Spinner from '../spinner';
import WeatherImg from '../weather-img';
import geoService from '../../services/geo-service';
import weatherService from '../../services/weather-service';
import '../../scss/index.scss';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: true,
			isError: false,
			alert: '',
			weatherObj: null,    // окремий store треба для цього - обов'язково виносити з компонентів самі дані, легше переробить в PWA
			btnSearchIsBlocked: false
		};
	}

	showError(text) {
		this.setState({
			isLoading: false,
			btnSearchIsBlocked: false,
			isError: true,
			alert: text
		});
	}

	componentDidMount() {
		if (!geoService.isGeoSuppoted()) {
			this.showError('Your browser doesn\'t support geolocation');
		} else {
			geoService.getData().then(res => {
				weatherService.getWeatherObj(res.coords).then(obj => {
					this.setState({
						isLoading: false,
						isError: false,
						weatherObj: { ...obj }
					});
				}).catch(err => this.showError(`Error with weather service (${err.message}).`));
			}).catch(err => this.showError('You have blocked access to your geo data for our website. Please unblock it.'));
		}
	}

	getWeatherForCity = value => {
		this.setState({
			btnSearchIsBlocked: true,
			isLoading: true
		});
		weatherService.getWeatherByCityName(value).then(obj => {
			this.setState({
				isLoading: false,
				btnSearchIsBlocked: false,
				isError: false,
				weatherObj: { ...obj }
			});
		}).catch(err => this.showError(`Error with weather service (${err.message}), maybe you entered wrong city name.`));
	}

	setTemperature = value => {
		const temp = Number(value);
		if (!isNaN(temp)) {
			this.setState({
				weatherObj: { ...this.state.weatherObj, temp }
			});
		}
	}

	render() {
		const { alert, isError, isLoading, weatherObj, btnSearchIsBlocked } = this.state;

		const weather = <WeatherImg weatherObj={weatherObj} setTemperature={this.setTemperature} />;
		const content = isLoading ? <Spinner /> : weather;

		return (
			<div className="App">
				<NavBar
					getWeatherForCity={this.getWeatherForCity}
					btnSearchIsBlocked={btnSearchIsBlocked}
				/>
				<Alert text={alert} />
				{ isError ? <ErrorContent /> : content }
			</div>
		);
	}
};
