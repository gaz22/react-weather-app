import React from 'react';
import * as S from './Header.styles';

export interface ISearchInput {}

const Header: React.FC<ISearchInput> = () => {
    return(
        <S.HeaderContainer>
            <S.Title>Weather Application</S.Title>
        </S.HeaderContainer>
    )
}

export default Header;