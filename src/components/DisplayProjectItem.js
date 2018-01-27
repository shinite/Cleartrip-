import React from 'react';

const DisplayProjectItem = (props) => (
  <div>
      <p>{props.project['title']}</p>
      <p>{props.project['end.time']}</p>
      <p>{props.project['percentage.funded']}</p>
      <p>{props.project['location']}</p>
      <br/>
</div>
  )

export default DisplayProjectItem;
