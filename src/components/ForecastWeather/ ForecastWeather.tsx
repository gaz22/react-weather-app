import React from 'react';
import * as S from './ ForecastWeather.styles';
import { Weekdays } from '../../constants';

export interface IForecastWeather {
    forecastWeatherData: { data: [] }
}

const ForecastWeather: React.FC<IForecastWeather> = ({ forecastWeatherData }) => {
    return(
        <>
            {forecastWeatherData?.data.length > 0 && 
                <S.ForecastWeatherWrapper>
                    <S.SectionTitle>Forecast for the next 5 days</S.SectionTitle>
                    <S.ForecastWeatherContainer>
                        {forecastWeatherData && forecastWeatherData?.data?.slice(1,  forecastWeatherData?.data?.length -1).map((e: any, index: number)=>{
                            const date = new Date(e.valid_date);
                            
                            return(
                                <div key={index}>
                                    <S.ForecastWeatherDescriptionLabel>
                                        {Weekdays[date.getDay()]}, {date.getDate()} / {date.getMonth()}
                                    </S.ForecastWeatherDescriptionLabel>
                                    <img 
                                        src={`https://cdn.weatherbit.io/static/img/icons/${e.weather.icon}.png`} 
                                        alt={e.weather.description}
                                    />
                                    <S.ForecastWeatherValue>
                                        {e.app_min_temp}<span>&#8451;</span> / {e.app_max_temp} <span>&#8451;</span>
                                    </S.ForecastWeatherValue>
                                </div>
                            )
                        })
                        }
                    </S.ForecastWeatherContainer>
                </S.ForecastWeatherWrapper>
            }
        </>
    )
}

export default ForecastWeather;