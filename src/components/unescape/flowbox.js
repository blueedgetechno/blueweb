import React, {useState} from 'react';
import './progress.css';

function FlowBox(props) {
  return (
    <div
      className="flowbox"
      data-isLast={props.isLast}
      data-isFirst={props.isFirst}
      data-isSide={props.isLast||props.isFirst}
      data-ornt={(props.isFirst==true)*1 + (props.isLast==true)*3 + ((props.isFirst || props.isLast)&props.isOdd==true)}
      data-isNull={props.isNull}
      data-isEnd={props.isEnd}
      data-isOdd={props.isOdd}
      >
        {props.data || props.isStart ? (
          <div className="proContent">
            <span className="proSpan">{props.isStart?"Go":props.data.idx}</span>
            <div className="proDetail">
              <div className="prodesc">{props.isStart?"Journey starts":props.data.content}</div>
              <div className="prodate">{props.isStart?"":props.data.date}</div>
            </div>
          </div>
        ):null}
    </div>
  )
}

export default FlowBox;
