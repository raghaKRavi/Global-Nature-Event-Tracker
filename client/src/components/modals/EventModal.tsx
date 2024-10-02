export interface EventModalProps {
  show: boolean;
  setShow?: (value: boolean) => void;
}

const EventModal = (props: EventModalProps) => {
    const {show, setShow} = props;

    return(
        <>
        {show ? 
        // <div className="event-modal absolute bottom-4 m-2 p-3 max-h-70 max-w-70 -translate-y-4 rounded-lg 
        // bg-white shadow-xl grid grid-cols-1 md:grid-cols-[70%,30%] gap-1">
        //   <div className="bg-gray-100 p-4">
        //     <div className="mb-4">Row 1</div>
        //     <div className="mb-4">
        //       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde aut
        //       vero tempora magnam quam quis aliquid placeat. Veritatis, ipsum quis!
        //     </div>
        //     <div>Row 3</div>
        //   </div>
    
        //   {/* <!-- Right Column (30%) --> */}
        //   <div className="bg-gray-200 p-4">
        //     <div className="mb-4">Row 1</div>
        //     <div className="mb-4">Row 2</div>
        //     <div>Row 3</div>
        //   </div>
        // </div>
        <div className="event-modal absolute left-0 right-0 bottom-3 m-4 max-h-70 h-1/4 rounded-lg bg-white shadow-md
        grid grid-cols-12 p-2">
          <div className="col-span-12 md:col-span-12 xl:col-span-12 bg-purple-100 flex justify-between
          items-center px-3 h-1/2">
            <div>
            title
            </div>
            <div>
              icon
            </div>
          </div>

          <div className="col-span-12 md:col-span-12 xl:col-span-12 bg-red-200">
          <div className=" bg-purple-400 h-fit">description</div>

          <div className="bg-purple-600">location</div>
          </div>

          <div className="l-col col-span-12 md:col-span-4 xl:col-span-4 bg-green-400">
          <div className=" bg-purple-700 ">date</div>

          <div className="bg-purple-900 ">magnitue</div>  
          </div>
          
          
        </div>
 : null}
        </>
    );
}

export default EventModal;
