import React from "react";
import Footer from "../ui/Footer";
import EventOverview from "../ui/EventOverview";
import pizza from "/Users/paolotyyko/Desktop/WeVent/client/src/components/pictures/pizza1.jpeg";

const Event = () => {
  return (
    <dev>
      <img classname="event-picture1" src={pizza} />
      <EventOverview />
      <Footer />
    </dev>
  );
};

export default Event;
