import React from 'react';
import * as S from './Header.styles';

export interface ISearchInput {
    secondaryTitle?: string
}

const Header: React.FC<ISearchInput> = ({ secondaryTitle}) => {
    return(
        <S.HeaderContainer>
            <S.Title>Weather Application</S.Title>
            <h4>{secondaryTitle}</h4>
        </S.HeaderContainer>
    )
}

export default Header;