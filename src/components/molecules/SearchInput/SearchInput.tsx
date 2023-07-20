import React from 'react';
import * as S from './SearchInput.styles';

export interface ISearchInput {
    searchQuery: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const SearchInput: React.FC<ISearchInput> = ({ searchQuery, handleInputChange, placeholder }) => {

    return(
        <S.SearchElement>
            <S.SearchInput
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                    handleInputChange(e);
                }} 
                placeholder={placeholder}
            />
        </S.SearchElement>
    )
}

export default SearchInput;