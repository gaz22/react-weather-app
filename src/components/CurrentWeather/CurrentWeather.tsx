import React from 'react';
import * as S from './CurrentWeather.styles';

export interface ICurrentWeather {
    currentWeatherData: {
        name: string
        main: { 
            temp: string, 
            feels_like: string, 
            temp_min: string, 
            temp_max: string,  
            humidity: string, 
            pressure: string
        }
        weather: { icon: string, description: string }[]
        wind: { speed: string }
    }
}

const CurrentWeather: React.FC<ICurrentWeather> = ({ currentWeatherData }) => {
    return(
        <>
         {currentWeatherData.name && 
            <S.CurrentWeatherWrapper>
                <S.SectionTitle>Current Weather</S.SectionTitle>
                <S.CurrentWeatherContainer>
                    <S.CurrentWeatherStatus>
                        <S.CurrentWeatherName>{currentWeatherData.name}</S.CurrentWeatherName>
                        <S.CurrentWeatherMainSection>
                            <img src={`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`} alt={currentWeatherData.weather[0].description}/>
                            <h6>{currentWeatherData.main.temp}<span>&#8451;</span></h6>
                        </S.CurrentWeatherMainSection>
                        <S.CurrentWeatherMinDescription>{currentWeatherData.weather[0].description}</S.CurrentWeatherMinDescription>
                    </S.CurrentWeatherStatus>
                </S.CurrentWeatherContainer>
                <S.CurrentWeatherDescription>
                    <S.CurrentWeatherDescriptionSection>
                        <S.CurrentWeatherDescriptionLabel>Feels like </S.CurrentWeatherDescriptionLabel>
                        <S.CurrentWeatherDescriptionValue>{currentWeatherData.main.feels_like}<span>&#8451;</span></S.CurrentWeatherDescriptionValue>
                    </S.CurrentWeatherDescriptionSection>
                    <S.CurrentWeatherDescriptionSection>
                        <S.CurrentWeatherDescriptionLabel> Min / Max </S.CurrentWeatherDescriptionLabel>
                        <S.CurrentWeatherDescriptionValue>
                            {currentWeatherData.main.temp_min}<span>&#8451;</span> / {currentWeatherData.main.temp_max}
                            <span>&#8451;</span>
                        </S.CurrentWeatherDescriptionValue>
                    </S.CurrentWeatherDescriptionSection>
                    <S.CurrentWeatherDescriptionSection>
                        <S.CurrentWeatherDescriptionLabel>Humidity </S.CurrentWeatherDescriptionLabel>
                        <S.CurrentWeatherDescriptionValue>{currentWeatherData.main.humidity}%</S.CurrentWeatherDescriptionValue>
                    </S.CurrentWeatherDescriptionSection>
                    <S.CurrentWeatherDescriptionSection>
                        <S.CurrentWeatherDescriptionLabel>Pressure </S.CurrentWeatherDescriptionLabel>
                        <S.CurrentWeatherDescriptionValue>{currentWeatherData.main.pressure}hPa</S.CurrentWeatherDescriptionValue>
                    </S.CurrentWeatherDescriptionSection>
                    <S.CurrentWeatherDescriptionSection>
                        <S.CurrentWeatherDescriptionLabel>Wind </S.CurrentWeatherDescriptionLabel>
                        <S.CurrentWeatherDescriptionValue>{currentWeatherData.wind.speed}m/s</S.CurrentWeatherDescriptionValue>
                    </S.CurrentWeatherDescriptionSection>
                </S.CurrentWeatherDescription>
            </S.CurrentWeatherWrapper>
         }   
        </>
    )
}

export default CurrentWeather;