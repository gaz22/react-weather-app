import styled from 'styled-components';

export const CurrentWeatherContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

export const CurrentWeatherHighlight = styled.div`
  padding: 25px;
  width: 100%;
`

export const CurrentWeatherDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  
  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

export const CurrentWeatherStatus = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 1.5rem;
  width: 25rem;

  @media (max-width: 800px) {
    margin: 2rem 0rem;
  }

  h6, span {
    font-size: 3.2rem;
    color: ${props => props.theme.defaultLabelColor};
    font-weight: 400;
    margin: 0;
  }
 span {
    margin-left: .5rem;
    line-height: 1;
    sup {
      line-height: 0;
    }
  }
`;

export const SectionTitle = styled.h4`
  font-weight: 400;
  font-size: 1.5rem;
  color: ${props => props.theme.defaultLabelColor};
  display: flex;
  margin: 0;
`

export const CurrentWeatherWrapper = styled.div`
  border-radius: 26px;
  padding: 25px;
  background-color: ${props => props.theme.containerColor};
  color: ${props => props.theme.defaultLabelColor};
`

export const CurrentWeatherDescriptionHeader = styled.div`
  display: flex;
  font-size: 1.25rem;
`

export const CurrentMinMaxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CurrentWeatherDescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0px;

  @media (max-width: 992px) {
    margin-top: 20px;
  }
`

export const CurrentWeatherDescriptionLabel = styled.div`
  display: flex;
  font-size: 1.25rem;
  margin-bottom: 10px;
`

export const CurrentWeatherDescriptionValue = styled.div`
  display: flex;
  color: ${props => props.theme.weatherValueColour};
`

export const CurrentWeatherName = styled.h5`
  font-size: 2rem;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 1.2rem;
`

export const CurrentWeatherMainSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const CurrentWeatherMinDescription = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 1.2rem;
`