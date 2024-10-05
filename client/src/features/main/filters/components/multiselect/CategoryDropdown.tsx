import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { fetchCategories } from "../../../../../store/actions/Eonet.action";
import { updateCategoriesArray } from "../../../../../store/slice/Eonet.slice";
import { ICategory } from "../../../../../store/type";
function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

const CategoryDropDown = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.eonet.categories);

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        (async () => {
            setLoading(true);
            await sleep(1e3);
            setLoading(false);
        })();
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        if(open === true && categories.length <= 0){
            dispatch(fetchCategories());
        }
    }, [open]);

    const handleChange = (value: any) => {
        console.log(value);
        dispatch(updateCategoriesArray(value.map((c: ICategory) => c.id)));
    }


    return(
        <>
        <Autocomplete 
            multiple
            // limitTags={1}
            onOpen={handleOpen}
            onClose={handleClose}
            id="category-autocomplete-limit-tag"
            options={categories.length > 0 ? categories : []}
            getOptionLabel={(option) => option.title}
            onChange={(event, value) => handleChange(value)}
            renderInput={(params) => (
                <TextField {...params} label="Category" sx={{fontSize: '10px'}}/>
            )}
            size="small"
            sx={{ width: '200px' }}
        />
        </>
    );
}

export default CategoryDropDown;