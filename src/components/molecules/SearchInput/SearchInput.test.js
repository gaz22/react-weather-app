import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from './SearchInput';

describe('Search input field', () => {
   it('tests the default props', () => {
        render(<SearchInput placeholder='Enter text here' searchQuery='a'/>)
        const input = screen.getByPlaceholderText('Enter text here')
        expect(input).toBeInTheDocument()
        expect(input).toHaveValue('a')
    })
    it('calls handleInputChange prop when user types', () => {
      const handleChange = jest.fn()
      render(<SearchInput placeholder='Enter text here' handleInputChange={handleChange}/>)
      fireEvent.change(screen.getByPlaceholderText('Enter text here'), {target: {value: 'a'}})
      expect(handleChange).toHaveBeenCalledTimes(1)
    })
})