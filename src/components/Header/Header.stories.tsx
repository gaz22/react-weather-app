import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Header from './Header';

export default {
  title: 'Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args: any) => {
  return <div style={{ background: 'orange' }}><Header {...args} /> now tst added</div>;
};

export const Default = Template.bind({});
Default.args = {
};
