import React from 'react';
import DayListItem from './DayListItem';

export default function DayList (props) {
  const NewArr = props.days.map((item) => {
    return (
    <DayListItem 
      key={item.id}
      name={item.name} 
      spots={item.spots} 
      selected={item.name === props.day}
      setDay={props.setDay}  
    />
    );
  });

  return (
    <ul>{NewArr}</ul>
  );
}
/* the below variable is passed to DayList as props
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

note that the DayList component accepts 3 props:
1. days = an array of days
2. day = the name of the currently selected day
3. setDay = a function that can be used to set the current day.
*/