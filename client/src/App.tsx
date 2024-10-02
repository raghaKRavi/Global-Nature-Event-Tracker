import React from 'react';
import './App.css';
import LeafletMapIntegration  from './features/map/DeviceMap';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { DataParent } from './features/main/DataParent';


const App = () => {
  return(
    <>
    <Provider store = {store}>
      <div className="grid grid-cols-1 md:grid-cols-[45%,55%] h-screen">
        <div className="p-4 bg-gray-100">
          <DataParent />
        </div>

        <div className="w-full h-full overflow-hidden">
          <LeafletMapIntegration />
        </div>
      </div>
      </Provider>
    </>
  );

};

export default App;
