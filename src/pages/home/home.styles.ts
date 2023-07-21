import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;


export const Container = styled.div`
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
   
    @media (min-width: 768px) {
    
        width: 750px;
    
    }
    @media (min-width: 992px) {

        width: 970px;
    }
    
    @media (min-width: 1200px) {

        width: 1170px;
    
    }
`

export const SearchInputWrapper = styled.div`
  position: relative;
`

export const WeatherResultWrapper = styled.div`
  margin-bottom: 2.8rem;

  @media (min-width: 768px) {
    margin-bottom: 3.2rem;
  }
`

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const Loader = styled.div`
  height: 0;
  width: 0;
  padding: 15px;
  border: 6px solid #ccc;
  border-right-color:  ${props => props.theme.loaderColor};
  border-radius: 22px;
  animation: ${rotate360} 1s infinite linear;
`

