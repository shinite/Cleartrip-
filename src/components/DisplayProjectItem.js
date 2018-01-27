import React from 'react';
import {Link} from 'react-router'

const DisplayProjectItem = (props) => {
  const url="https://www.kickstarter.com/"+props.project['url']
  return(
  <div className = "projectDisplay">
      <p><strong>Title: </strong> {props.project['title']}</p>
      <p><strong>Location: </strong>{props.project['location']}</p>
      <p><strong>Percentage Funded: </strong>{props.project['percentage.funded']}</p>
    <p><strong>End Time: </strong>{props.project['end.time']}</p>
      <a href={url} target="_blank" className="myLink">To visit the project click here</a>
      <br/>

  </div>
  )}

export default DisplayProjectItem;
