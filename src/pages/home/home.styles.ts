import styled from 'styled-components';

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

