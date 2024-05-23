import axios from 'axios';

class WeatherClass {
	apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
	ImgUrl = 'http://openweathermap.org/img/wn';
	apiId = '07e4c897b3f76311a9f93a70c8ecd57e';

	getApiUrl = params => `${this.apiUrl}?${params}&units=metric&appid=${this.apiId}`
	getImgUrl = icon => `${this.ImgUrl}/${icon}@2x.png`

	getWeatherObj = async ({ latitude, longitude }) => {
		const url = this.getApiUrl(`lat=${latitude}&lon=${longitude}`);
		const res = await axios.get(url);
		return {
			imgUrl: this.getImgUrl(res.data.weather[0].icon),
			descr: res.data.weather[0].description,
			city: res.data.name,
			temp: Math.round(res.data.main.temp)
		}
	};

	getWeatherByCityName = async city => {
		const url = this.getApiUrl(`q=${city}`);
		const res = await axios.get(url);
		return {
			imgUrl: this.getImgUrl(res.data.weather[0].icon),
			descr: res.data.weather[0].description,
			city: res.data.name,
			temp: Math.round(res.data.main.temp)
		}
	}

};

const weatherService = new WeatherClass();

export default weatherService;
