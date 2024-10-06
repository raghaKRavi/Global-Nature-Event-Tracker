import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HomeContent } from './features/main/HomeContent';
import LeafletMap from './features/map/LeafletMap';
import { Box, Grid2 } from '@mui/material';


const App = () => {
  return(
    <>
    <Provider store = {store}>
      {/* <Box sx={{ width: '100%', height: '100vh' }} className="">
        <div className="">
          <HomeContent />
        </div>

        <div className="">
          <LeafletMap />
        </div>
      </Box> */}

      <Box sx={{ width: '100%' }}>
      <Grid2 container rowSpacing={1} columnSpacing={1}>
        <Grid2
        sx={{
          display: { xs: "none", md: "flex" }
        }}
        size={{xs: 0, sm: 0, md: 5}}>
          <HomeContent />
        </Grid2>

        <Grid2 size={{xs: 12, sm: 12, md: 7}}>
        <LeafletMap />
        </Grid2>
      </Grid2>
    </Box>
      </Provider>
    </>
  );

};

export default App;
