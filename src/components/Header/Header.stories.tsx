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
  return <Header {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  secondaryTitle: 'test'
};
