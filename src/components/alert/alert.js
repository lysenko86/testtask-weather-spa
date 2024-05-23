import React from 'react';

const Alert = ({ text }) => {
	return !text ? null : (
		<div className="alert alert-danger">
			<strong>Attention!</strong>&nbsp; {text}
		</div>
	);
};

export default Alert;
