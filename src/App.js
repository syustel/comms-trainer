import React from 'react';

import './App.css';
//import { CubeLayout } from './components/CubeLayout';
import { AppRouter } from './routers/AppRouter';


export const App = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}
