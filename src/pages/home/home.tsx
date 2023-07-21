import React, { useState, useReducer } from 'react';
import { useQuery } from 'react-query';

import * as S from './home.styles';
import Header from '../../components/Header/Header';
import SearchInput from '../../components/SearchInput/SearchInput';

import useDebounce from '../../utils/useDebounce';
import LocationOptions from '../../components/LocationOptions/LocationOptions';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import ForecastWeather from '../../components/ForecastWeather/ ForecastWeather';
import { fetchLocation, fetchWeatherData} from '../../api';

import { reducer, ActionTypes, initialState } from './home.helper';

const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [showResult, setShowResult] = useState<boolean>(false);
    const [currentWeather, setCurrentWeather] = useState({ name: '', main: {temp:'', feels_like: '', temp_min: '', temp_max: '', humidity: '', pressure: '' }, weather: [{ icon: '', description: ''}],wind: {speed: ''}});
    const [forecastData, setForecastData] = useState<{ data: []}>({ data:[] });
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchTerm = useDebounce(searchQuery, 200);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowResult(true);
        setSearchQuery(e.target.value);
    }

    const {data: locationData, isLoading: isLocationFinderLoading, status } = useQuery({
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
        dispatch({ type: ActionTypes.CURRENT_FETCHING});
        dispatch({type: ActionTypes.FORECAST_FETCHING});

        try {     
            await fetchWeatherData('queryCurrentWeatherData',`${process.env.REACT_APP_CURRENT_WEATHER_API_URL}/data/2.5/weather`, {
                params: {
                    lat: e.lat,
                    lon: e.lon,
                    units: 'metric',
                    appid: process.env.REACT_APP_CURRENT_WEATHER_API_KEY
                }
            })
            .then((e)=> {
                setCurrentWeather(e);
                dispatch({ type: ActionTypes.CURRENT_FETCHED })
            })
            .catch (()=>  dispatch({ type: ActionTypes.CURRENT_ERROR }));  

            await fetchWeatherData('queryForecastWeatherData', `${process.env.REACT_APP_FORECAST_WEATHER_API_URL}daily`, {
                params: {
                    lat: e.lat,
                    lon: e.lon,
                    key: process.env.REACT_APP_FORECAST_WEATHER_API_KEY
                }
            })
            .then((e)=>{
                setForecastData(e);
                dispatch({ type: ActionTypes.FORECAST_FETCHED })
            })
            .catch (()=> dispatch({ type: ActionTypes.FORECAST_ERROR }));
        } catch (e) {
            console.error(e);
            dispatch({ type: ActionTypes.CURRENT_ERROR });
            dispatch({ type: ActionTypes.FORECAST_ERROR });
        }
    }

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
                    handleClickItem={(e)=> onSelectLocation(e)}
                    handleOutsideClick={() => setShowResult(false)}
                    error={status === "error"}
                />
            }
            </S.SearchInputWrapper>

            <>
                {state.currentLoading ? renderLoader():
                    <S.WeatherResultWrapper>
                        <>
                            {state.currentError ? renderError('current weather') : 
                            <>
                                { currentWeather &&
                                    <CurrentWeather currentWeatherData={currentWeather} />
                                }
                            </>
                            }
                        </>
                    </S.WeatherResultWrapper>
                }
                { state.forecastLoading ? renderLoader() :
                    <>
                        { state.forecastError ? renderError('forecast weather') : 
                            <>
                                { forecastData && 
                                    <ForecastWeather forecastWeatherData={forecastData} /> 
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