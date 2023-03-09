import React from "react";
import 'components/DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected, 
    'day-list__item--full': props.spots ? false : true
  });

  const formatSpots = (spotsEnter) => {
    let spots = '';
    if (spotsEnter === 0) {
      spots = 'no spots remaining';
      return spots
    }

    if (spotsEnter === 1) {
      spots = '1 spot remaining';
      return spots
    }

    spots = `${spotsEnter} spots remaining`;
    return spots;
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
