
export const CoordinatesMapping = (data : any = []) => {
   data.forEach((event: any) => {
    console.log(event.geometry["coordinates"]);
   })
}