import { fetchData } from './index';
import { locationData } from '../mocks/locationData';
import { currentWeatherData } from '../mocks/weatherData';

const locationSearchQuery =  'Jakarta';

const API_ENDPOINT_LOCATION = `${process.env.REACT_APP_CURRENT_WEATHER_API_URL}geo/1.0/direct`;
const API_ENDPOINT_WEATHER_FORECAST = `${process.env.REACT_APP_CURRENT_WEATHER_API_URL}/data/2.5/weather`;

describe("fetchLocation", () => {
  it("should successfully fetch location", async () => {
    const result = await fetchData(API_ENDPOINT_LOCATION, { params: {
        q: locationSearchQuery,
        limit: 5,
        appid: process.env.REACT_APP_CURRENT_WEATHER_API_KEY
    }});
    expect(result).toEqual(locationData);
  });
  // TODO: add fail scenario
});

describe("fetchWeatherData", () => {
  it("should successfully fetch weather", async () => {
    const result = await fetchData(API_ENDPOINT_WEATHER_FORECAST, {
        params: {
            lat: -6.1753942,
            lon: 106.827183,
            units: 'metric',
            appid: process.env.REACT_APP_CURRENT_WEATHER_API_KEY
        }
    });
    expect(result).not.toStrictEqual(currentWeatherData);
  });
  // TODO: add fail scenario
});


