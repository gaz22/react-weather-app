import { render, screen, fireEvent } from '@testing-library/react';
import LocationOptions from './LocationOptions';

import {locationData} from '../../../mocks/locationData';

describe('Location options', () => {
    const handleClick = jest.fn()
    
    render(<LocationOptions data={locationData} loading={false} handleOutsideClick={handleClick}/>)
    
    it('tests data props to match the mocks', () => {
        expect(screen.getAllByRole("listitem")).toHaveLength(3);
    })
    it('tests loading icon is not appear', () => {
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    })
    it('tests handleOutsideClick is triggered when other component is clicked', () => {
        render(
            <div>
                <button>outside button</button>
                <LocationOptions data={locationData} loading={false} handleOutsideClick={handleClick}/>
            </div>
        )
        fireEvent.click(screen.getByText('outside button'))
        expect(handleClick).toHaveBeenCalledTimes(1);
    })
})