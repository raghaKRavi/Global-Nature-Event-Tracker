import { EventModalProps } from "./EventModal";

export const EventDetailsModalContainer = (props: EventModalProps) => {
  const { show, setShow } = props;
  console.log(show)
  return (<div >
    {show ? <div className="event-detail-modal container mx-auto bg-black">
    container
  </div> : null}</div>);
};
