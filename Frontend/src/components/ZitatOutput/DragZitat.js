/* eslint-disable react/prop-types */
import React from 'react';
import './ZitatList.scss';
import Draggable from 'react-draggable'; // The default

export default function DragZitat({ number }) {
  return (
    <div key={number.id}>
      <Draggable raggableId="draggable-1" index={0}>
        <div>
          Zitatnummer: {number.id} Zitatlänge: {number.zitat.length}
          <div className="zitatBox"> {number.zitat}</div>
        </div>
      </Draggable>
    </div>
  );
}
