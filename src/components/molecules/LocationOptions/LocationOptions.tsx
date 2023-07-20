import React from 'react';
import * as S from './LocationOptions.styles';

import { useClickOutside } from '../../../utils/useClickOutside';

export interface ILocationOptions {
    data: any
    loading: boolean
    error?: boolean
    handleClickItem: (e: any) => void
    handleOutsideClick: () => void
}

const LocationOptions: React.FC<ILocationOptions> = ({ 
    handleClickItem, 
    handleOutsideClick,
    loading, 
    data, 
}) => {
    const elementRef = useClickOutside(()=> handleOutsideClick());

    return(
        <S.LocationOptionsWrapper ref={elementRef} role="list">
            {loading ? 
                <S.LocationOptionsItem role="listitem"> <S.Loader /> </S.LocationOptionsItem> : 
                data && data?.slice(0,6).map((e: any, index: number)=>{
                    return(
                        <S.LocationOptionsItem
                            key={index}
                            role="listitem"
                            onClick={async () => {
                                handleClickItem(e)
                            }}
                        >
                            {e.name ? e.name : ''}
                            {e.state ? `, ${e.state}` : ''}
                            {e.country ? `, ${e.country}` : ''}
                        </S.LocationOptionsItem>
                
                )
            })}
        </S.LocationOptionsWrapper>
    )
}

export default LocationOptions;