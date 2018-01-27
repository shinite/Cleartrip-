import React from 'react';
import DisplayProjectItem from './DisplayProjectItem';

const DisplayProject = (props) => (
  <div>
    {props.projects.map((project,index)=>(
      <DisplayProjectItem  project={project} key = {index}/>)
    )}
</div>
  )

export default DisplayProject;
