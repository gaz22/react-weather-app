import React from 'react';
import './App.css';

import Home from './pages/home';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { defautlTheme } from './theme'

function App() {
  const queryClient = new QueryClient();

  console.log('process', process.env)

  return (
    <ThemeProvider theme={defautlTheme}>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Home />
          <h1>test 1</h1>
        </QueryClientProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
