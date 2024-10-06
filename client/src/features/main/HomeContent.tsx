import { SearchFilters } from "./filters/components/SearchFilters";
import BarChartVisual from "./visuals/components/BarChartVisual";
import { Box, Container } from "@mui/material";
import ResponseCategoriesSelect from "./visuals/components/ResponseCategorySelect";
import LineChartVisual from "./visuals/components/LineChartVisual";

export const HomeContent = () => {
  return (
    // <Box
    //   className=""
    //   sx={{
    //     p: 2,
    //     height: "100%",
    //     display: "flex",
    //     flexDirection: "row",
    //     position: "relative",
    //     bgcolor: "yellow",
    //   }}
    // >
    //   {/* <p>Nature Event Tracker</p>
    //         <SearchFilters /> */}

    //   <Box sx={{ height: "100%", position: "relative" }}>
    //     <Box component="section" sx={{ p: 2, height: 350, width: "100%" }}>
    //       <BarChartVisual />
    //     </Box>
    //   </Box>

    //   <Box sx={{ height: "100%", position: "relative" }}>
    //     {/* <ResponseCategoriesSelect /> */}
    //     <Box
    //       component="section"
    //       sx={{ border: "1px dashed grey", height: "100%", width: "100%" }}
    //     >
    //       <LineChartVisual />
    //     </Box>
    //   </Box>
    // </Box>

    <Box
  sx={{
    // p: 2,
    height: "100%", 
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'start',
  }}
>

{/* <SearchFilters /> */}

  <Box sx={{height: "40%",  width: '100%' }}>
      <BarChartVisual />
  </Box>

  <Box sx={{  display: "flex", flexDirection: "column", justifyContent: 'space-between',
    alignItems: 'start', height: '50%', width: '100%', }}>
    <ResponseCategoriesSelect />
    <Box
    className="linechart-section"
      component="section"
      sx={{flex: 1, width: "100%", mt: 2 }}
    >
    {/* <ResponseCategoriesSelect /> */}
      <LineChartVisual />
    </Box>
  </Box>
</Box>
  );
};
