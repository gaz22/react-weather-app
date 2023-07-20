import React, { useState } from 'react';
import { QueryClient, useQuery } from 'react-query';

import * as S from './home.styles';
import Header from '../../components/molecules/Header/Header';
import SearchInput from '../../components/molecules/SearchInput/SearchInput';

import useDebounce from '../../utils/useDebounce';
import axios from 'axios';
import LocationOptions from '../../components/molecules/LocationOptions/LocationOptions';
import CurrentWeather from '../../components/molecules/CurrentWeather/CurrentWeather';
import ForecastWeather from '../../components/molecules/ForecastWeather/ ForecastWeather';

const Home = () => {
    const queryClient = new QueryClient();

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
                return axios.get(`${process.env.REACT_APP_CURRENT_WEATHER_API_URL}geo/1.0/direct?q=${debouncedSearchTerm}&limit=5&appid=${process.env.REACT_APP_CURRENT_WEATHER_API_KEY}`).then((res: any) => res.data)
            }
        }
    })
    
    const onFetchData = async(queryKey: string, endpoint: string) => {
        return await queryClient.fetchQuery(
            [queryKey],
            {
                queryFn: () =>
                axios
                    .get(endpoint)
                    .then((res) => res.data)
            }
        );
    }

    const onSelectLocation = async(e: any) => {
        setShowResult(false);
        try {          
            const currentWeather = await onFetchData('queryCurrentWeatherData',`${process.env.REACT_APP_CURRENT_WEATHER_API_URL}/data/2.5/weather?lat=${e.lat}&lon=${e.lon}&units=metric&appid=${process.env.REACT_APP_CURRENT_WEATHER_API_KEY}`);
            const forecasts = await onFetchData('queryForecastWeatherData', `${process.env.REACT_APP_FORECAST_WEATHER_API_URL}daily?lat=${e.lat}&lon=${e.lon}&key=${process.env.REACT_APP_FORECAST_WEATHER_API_KEY}`);
            setForecastData(forecasts);
            setCurrentWeather(currentWeather);
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
            <S.WeatherResultWrapper>
                <CurrentWeather currentWeatherData={currentWeather} />
            </S.WeatherResultWrapper>
            <ForecastWeather forecastWeatherData={forecastData} />
        </S.Container>
    );
};
 
export default Home;