import React from "react";
import classNames from 'classnames';
import "components/Button.scss";

export default function Button(props) {
   const buttonClass = classNames('button', {' button--confirm': props.confirm, ' button--danger': props.danger});
      //button class is the default css class 
      //if the received props = confirm / danger, we apply the relative class

   return (
   <button 
      onClick={props.onClick} 
      disabled={props.disabled} 
      className={buttonClass}
   >
      {props.children}
   </button>
   );
}
