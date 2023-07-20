import styled from 'styled-components';

export const SearchElement = styled.div`
  position: relative;
  height: 3.25rem;
  border-radius: 26px;
  background: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.4rem;
  display: flex;
  align-items: center;
  z-index: 1;
  flex-direction: column;
  padding: 2px 25px 5px 31px;
`;

export const SearchInput = styled.input`
  flex: 1;
  margin-left: 1rem;
  height: 3.25rem;
  border: none;
  background-color: transparent;
  font-size: 1.125rem;
  color: ${props => props.theme.defaultLabelColor};
  width: 100%;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.inputPlaceholder};
  }
`;