import styled from 'styled-components';

export const ForecastWeatherContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
`

export const ForecastWeatherWrapper = styled.div`
  border-radius: 26px;
  padding: 25px;
  background-color: ${props => props.theme.containerColor};
  color: ${props => props.theme.defaultLabelColor};
`

export const SectionTitle = styled.h4`
  font-weight: 400;
  font-size: 1.5rem;
  color: ${props => props.theme.defaultLabelColor};
  display: flex;
  margin: 0;
  margin-bottom: 4rem;
`

export const ForecastWeatherDescriptionLabel = styled.p`
  display: flex;
  font-size: 1.25rem;
  font-weight: 300;
  margin-top: 0;
  margin-bottom: 10px;
`

export const ForecastWeatherValue = styled.p`
  display: flex;
  font-size: 1.25rem;
  font-weight: 300;
  margin-top: 0;
  margin-bottom: 10px;
  color: ${props => props.theme.weatherValueColour};
`