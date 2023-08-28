import React from 'react';
import './App.css';

import Home from './pages/home';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { defautlTheme } from './theme'

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={defautlTheme}>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Home />
          <h1>test</h1>
        </QueryClientProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
