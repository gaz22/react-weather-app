import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import CurrentWeather from './CurrentWeather';

import styled from 'styled-components';

export default {
  title: 'Current Weather',
  component: CurrentWeather,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CurrentWeather>;

const WeatherResultWrapper = styled.div`
    background-color: green;
    padding: 20px;
    height: 100vh;

    div {
        background-color: white;
    }
`

const Template: ComponentStory<typeof CurrentWeather> = (args: any) => {
  return <WeatherResultWrapper><CurrentWeather {...args} /></WeatherResultWrapper>;
};

export const Default = Template.bind({});
Default.args = {
    currentWeatherData: {
        name: 'Wollongong',
        main: { 
            temp: '7.64',
            feels_like: '5.95',
            humidity: '77',
            pressure: '1023',
            temp_max: '10.7',
            temp_min: '5.09'
        },
        weather: [
            {
                description: "clear sky",
                icon: "01d"
            }
        ],
        wind: { 
            speed: '2.6'
        }
    }
};
