import React from 'react';
import './App.css';
import LeafletMapIntegration  from './features/Map/DeviceMap';


const App = () => {
  return(
    <div className="grid grid-cols-1 md:grid-cols-[45%,55%] h-screen">
      <div className="p-4 bg-gray-100">
        Main component
      </div>

      <div className="w-full h-full overflow-hidden">
        <LeafletMapIntegration />
      </div>
    </div>
  );

};

export default App;
