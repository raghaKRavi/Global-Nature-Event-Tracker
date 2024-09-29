import React from 'react';
import './App.css';
import Map from './features/Map/Map';


const App = () => {
  return(
    <div className="grid grid-cols-1 md:grid-cols-5 h-screen">
      <div className="md:col-span-2 p-4 bg-gray-100">
        Main component
      </div>

      <div className="md:col-span-3 p-0 w-full h-full overflow-hidden">
        <Map />
      </div>
    </div>
  );

};

export default App;
