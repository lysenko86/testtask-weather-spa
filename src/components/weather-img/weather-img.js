import React from 'react';

import Slider from '../slider';
import { tempMinValue, tempMaxValue, tempBgColors } from '../../consts';

const WeatherImg = ({ weatherObj, setTemperature }) => {
	let bgColor = '';
	if (weatherObj.temp < tempMinValue) {
		bgColor = tempBgColors[0];
	} else if (weatherObj.temp > tempMaxValue) {
		bgColor = tempBgColors[tempBgColors.length - 1];
	} else {
		bgColor = tempBgColors[weatherObj.temp + Math.abs(tempMinValue)];
	}

	return weatherObj && (
		<div className="img-container" style={{ backgroundColor: bgColor }}>
			<div className="title-block">{weatherObj.city}, {weatherObj.temp}℃</div>
			<div><img src={weatherObj.imgUrl} alt={weatherObj.descr} /></div>
			<div className="title-block">{weatherObj.descr}</div>
			<Slider temp={weatherObj.temp} setTemperature={setTemperature}/>
		</div>
	)
};

export default WeatherImg;
