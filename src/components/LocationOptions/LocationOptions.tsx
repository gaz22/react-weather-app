import React from 'react';
import * as S from './LocationOptions.styles';

import { ILocationProps } from './types';
import { useClickOutside } from '../../utils/useClickOutside';

export interface ILocationOptions {
    data: ILocationProps[]
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
    error
}) => {
    const elementRef = useClickOutside(()=> handleOutsideClick());

    return(
        <S.LocationOptionsWrapper ref={elementRef} role="list">
            {loading ? 
                <S.LocationOptionsItem role="listitem"> <S.Loader data-testid="loader"/> </S.LocationOptionsItem> : 
                <>
                    {error ?  <h1>failed to fetch location </h1> : 
                        data && data?.slice(0,6).map((e: ILocationProps, index: number)=>{
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
                        }
                    )}
                </>
            }
        </S.LocationOptionsWrapper>
    )
}

export default LocationOptions;