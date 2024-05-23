import React from 'react';

import { tempMinValue, tempMaxValue } from '../../consts';

const Slider = ({ temp, setTemperature }) => (
	<div className="slider">
		<label htmlFor="customRange" className="title-block">Temperature adjusting</label>
		<input
			type="range"
			className="custom-range"
			min={tempMinValue}
			max={tempMaxValue}
			id="customRange"
			value={temp}
			onChange={e => setTemperature(e.target.value)}
		/>
	</div>
);

export default Slider;
