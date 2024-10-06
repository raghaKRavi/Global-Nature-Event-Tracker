export interface EventModalProps {
  show: boolean;
  setShow?: (value: boolean) => void;
}

const EventModal = (props: EventModalProps) => {
    const {show, setShow} = props;

    return(
        <>
        {show ? 
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
