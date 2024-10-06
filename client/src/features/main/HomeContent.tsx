import { SearchFilters } from "./filters/components/SearchFilters";
import BarChartVisual from "./visuals/components/BarChartVisual";
import { Box, Container } from "@mui/material";
import ResponseCategoriesSelect from "./visuals/components/ResponseCategorySelect";
import LineChartVisual from "./visuals/components/LineChartVisual";

export const HomeContent = () => {
    return(
        <Box className="" sx={{ p: 2, height: '100vh', display:"flex", flexDirection: "column" }}>
            <p>Nature Event Tracker</p>
            <SearchFilters />
            

            <Box component="section" sx={{ p: 2, border: '1px dashed grey', height: 350, width: 500 }}>
                <BarChartVisual />
            </Box>
            <Box component="section" sx={{ p: 2, border: '1px dashed grey', height: 350, width: 500, mt: 5 }}>
                <ResponseCategoriesSelect />
                <LineChartVisual />
            </Box>
        </Box>
    );
}