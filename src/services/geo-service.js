class GeoClass {
	isGeoSuppoted() {
		return !!navigator.geolocation;
	}

	getData() {
		const geoOptions = {
			maximumAge: 5 * 60 * 1000,
			timeout: 10 * 1000
		}

		const getDataPromise = new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				position => resolve(position),
				error => reject(error),
				geoOptions
			);
		});

		return getDataPromise;
	}

};

const geoService = new GeoClass();

export default geoService;
