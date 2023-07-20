import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LocationOptionsItem = styled.div`
  height: 70px;
  background-color: ${props => props.theme.dropdownMenuColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #d8d8d8;
  cursor: pointer;
  color: ${props => props.theme.defaultLabelColor};
`

export const LocationOptionsWrapper = styled.div`
  position: absolute;
  top: 59px;
  width: 100%;
  background-color: ${props => props.theme.dropdownMenuColor};
  max-height: 300px;
  overflow-y: auto;
  border-radius: 25px;
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