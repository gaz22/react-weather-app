import React, { useState } from 'react';
import { useQuery } from 'react-query';

import * as S from './home.styles';
import Header from '../../components/Header/Header';
import SearchInput from '../../components/SearchInput/SearchInput';

import useDebounce from '../../utils/useDebounce';
import LocationOptions from '../../components/LocationOptions/LocationOptions';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import ForecastWeather from '../../components/ForecastWeather/ ForecastWeather';
import { fetchLocation, fetchWeatherData} from '../../api';

const Home = () => {
    const [error, setError] = useState({ current: false, forecast: false});
    const [loading, setLoading] = useState(false);

    const [showResult, setShowResult] = useState<boolean>(false);
    const [currentWeather, setCurrentWeather] = useState({ name: '', main: {temp:'', feels_like: '', temp_min: '', temp_max: '', humidity: '', pressure: '' }, weather: [{ icon: '', description: ''}],wind: {speed: ''}});
    const [forecastData, setForecastData] = useState<{ data: []}>({ data:[] });
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchTerm = useDebounce(searchQuery, 200);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowResult(true);
        setSearchQuery(e.target.value);
    }

    const {data: locationData, isLoading: isLocationFinderLoading} = useQuery({
        queryKey: ['search', debouncedSearchTerm],
        queryFn: 
        () => {
            if (debouncedSearchTerm) {
                return fetchLocation(`${process.env.REACT_APP_CURRENT_WEATHER_API_URL}geo/1.0/direct`, { 
                    params: {
                        q: debouncedSearchTerm,
                        limit: 5,
                        appid: process.env.REACT_APP_CURRENT_WEATHER_API_KEY
                    }
                })
            }
        }
    })

    const onSelectLocation = async(e: any) => {
        setShowResult(false);
        setLoading(true)
        try {     
            const currentWeather = await fetchWeatherData('queryCurrentWeatherData',`${process.env.REACT_APP_CURRENT_WEATHER_API_URL}/data/2.5/weather`, {
                params: {
                    lat: e.lat,
                    lon: e.lon,
                    units: 'metric',
                    appid: process.env.REACT_APP_CURRENT_WEATHER_API_KEY
                }
            }).catch (()=>  setError({ ...error, current: true }));  

            const forecasts = await fetchWeatherData('queryForecastWeatherData', `${process.env.REACT_APP_FORECAST_WEATHER_API_URL}daily`, {
                params: {
                    lat: e.lat,
                    lon: e.lon,
                    key: process.env.REACT_APP_FORECAST_WEATHER_API_KEY
                }
            }).catch (()=> setError({ ...error, forecast: true }));
            
            setForecastData(forecasts);
            setCurrentWeather(currentWeather);
            setLoading(false)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <S.Container>
            <Header />
            <S.SearchInputWrapper>
                <SearchInput 
                    searchQuery={searchQuery} 
                    handleInputChange={(e: React.ChangeEvent<HTMLInputElement>)=> onInputChange(e)}
                    placeholder="Find a location"
                />
                { showResult && 
                <LocationOptions
                    data={locationData} 
                    loading={isLocationFinderLoading} 
                    handleClickItem={(e)=> onSelectLocation(e)}
                    handleOutsideClick={() => setShowResult(false)}
                />
            }
            </S.SearchInputWrapper>

            {loading ? <S.LoaderContainer><S.Loader data-testid="loader"/></S.LoaderContainer>: 
                <>
                    <S.WeatherResultWrapper>
                        {currentWeather &&
                            <CurrentWeather currentWeatherData={currentWeather} />
                        }
                    </S.WeatherResultWrapper>
                    {forecastData && 
                        <ForecastWeather forecastWeatherData={forecastData} />
                    }
                </>
            }

            { (error.current || error.forecast) &&
                <h1>failed to fetch</h1>
            }
        </S.Container>
    );
};
 
export default Home;