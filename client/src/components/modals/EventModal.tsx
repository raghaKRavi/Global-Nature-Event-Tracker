interface EventModalProps {
  show: boolean;
  setShow?: (value: boolean) => void;
}

const EventModal = (props: EventModalProps) => {
    const {show, setShow} = props;

    return(
        <>
        {show ? 
        <div className="event-modal absolute bottom-4 m-4 p-3 max-h-70 max-w-70 -translate-y-4 rounded-lg 
        bg-white shadow-xl grid grid-cols-1 md:grid-cols-[70%,30%] gap-1">
          <div className="bg-gray-100 p-4">
            <div className="mb-4">Row 1</div>
            <div className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde aut
              vero tempora magnam quam quis aliquid placeat. Veritatis, ipsum quis!
            </div>
            <div>Row 3</div>
          </div>
    
          {/* <!-- Right Column (30%) --> */}
          <div className="bg-gray-200 p-4">
            <div className="mb-4">Row 1</div>
            <div className="mb-4">Row 2</div>
            <div>Row 3</div>
          </div>
        </div>
 : null}
        </>
    );
}

export default EventModal;
