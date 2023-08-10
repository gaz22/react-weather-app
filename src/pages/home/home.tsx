import React, { useState } from 'react';
import { useQuery } from 'react-query';

import * as S from './home.styles';
import Header from '../../components/Header/Header';
import SearchInput from '../../components/SearchInput/SearchInput';

import useDebounce from '../../utils/useDebounce';
import LocationOptions from '../../components/LocationOptions/LocationOptions';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import ForecastWeather from '../../components/ForecastWeather/ ForecastWeather';
import { fetchData } from '../../api';

import useLocation from '../../hooks/useLocation';

const Home = () => {
    const [location, setLocation] = useState<any>({ lat: undefined, lon: undefined })
    const [showResult, setShowResult] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchTerm = useDebounce(searchQuery, 200);
    const locatioNotFound = location.lat !== undefined || location.lon !==undefined;

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowResult(true);
        setSearchQuery(e.target.value);
    }

    const {data: locationData, isLoading: isLocationFinderLoading, status } = useLocation(debouncedSearchTerm);

    const {data: weatherData, isLoading: isLoadingWeatherData, error: isCurrentError } = useQuery({
        queryKey: ['weather-data', location],
        enabled: locatioNotFound,
        queryFn: 
            async() => {
                const currentWeatherData = await fetchData(`${process.env.REACT_APP_CURRENT_WEATHER_API_URL}/data/2.5/weather`, {
                    params: {
                        lat: location.lat,
                        lon: location.lon,
                        units: 'metric',
                        appid: process.env.REACT_APP_CURRENT_WEATHER_API_KEY
                    }
                })
                return {
                    current: currentWeatherData,
                }
            }
    })

    const {data: forecastWeatherData, isLoading: isForecastLoading, error: isForecastError } = useQuery({
        queryKey: ['forecast-data', location],
        enabled: locatioNotFound,
        queryFn: 
            async() => {
                
                const forecastData = await fetchData(`${process.env.REACT_APP_FORECAST_WEATHER_API_URL}daily`, {
                    params: {
                        lat: location.lat,
                        lon: location.lon,
                        key: process.env.REACT_APP_FORECAST_WEATHER_API_KEY
                    }
                })

                return {
                    forecast: forecastData,
                }
            }
    })

    const renderLoader = () => {
        return(
            <S.LoaderContainer> <S.Loader data-testid="loader"/></S.LoaderContainer>
        );
    }

    const renderError = (sectionName: string) => {
        return(
            <h1> failed to fetch {sectionName} </h1>
        );
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
                    handleClickItem={(e)=> {
                        setLocation(e);
                    }}
                    handleOutsideClick={() => setShowResult(false)}
                    error={status === "error"}
                />
            }
            </S.SearchInputWrapper>

            <>
                {isLoadingWeatherData ? renderLoader():
                    <S.WeatherResultWrapper>
                        <>
                            {isCurrentError ? renderError('current weather') : 
                            <>
                                { weatherData?.current &&
                                    <CurrentWeather currentWeatherData={weatherData?.current} />
                                }
                            </>
                            }
                        </>
                    </S.WeatherResultWrapper>
                }
                { isForecastLoading ? renderLoader() :
                    <>
                        { isForecastError ? renderError('forecast weather') : 
                            <>
                                { forecastWeatherData?.forecast && 
                                    <ForecastWeather forecastWeatherData={forecastWeatherData?.forecast} /> 
                                }
                            </>
                        }
                    </>
                }
            </>
        </S.Container>
    );
};
 
export default Home;