import React from 'react';
import 'components/InterviewerListItem.scss';
import classNames from 'classnames';

export default function InterviewerListItem (props){
  let styles = classNames('interviewers__item', {'interviewers__item--selected': props.selected});
  
  return (
    <li className={styles} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.selected && props.name}
      />
      {props.name}
    </li>
  );
}

/* props:
const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};
*/
