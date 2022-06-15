import React from "react";
import DayListItem from "./DayListItem";
import classNames from "classnames";

function DayList(props) {
  const dayItems = props.days.map((item) => {
    return <DayListItem 
            key={item.id} 
            name={item.name} 
            spots={item.spots} 
            selected={item.name === props.day} 
            setDay={props.setDay} 
            />
  });
  return (
    <ul>
      {dayItems}
    </ul>
  );
};

export default DayList;