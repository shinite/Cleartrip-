import React from 'react';
import axios from 'axios';
import DisplayProject from './DisplayProject';


class ProjectDashboard extends React.Component{

state = {
		projects:[{	}],
		sortBy:'end.time',
		filteredProjects:[{}]
	}

componentWillMount(){
	console.log("Hello from on Click");
		axios({
		  method: 'get',
		  url: 'http://starlord.hackerearth.com/kickstarter',
		}).then((response)=>{
		    	console.log(response.data, 'first response')
					this.setState(()=>({projects:response.data, filteredProjects:response.data}))
		    })
		    .catch((err)=>{
		      console.log(err,'error!! try again');
		    });

}

handleSortBy = (e) => {
	var sortBy=e.target.value

		this.setState(()=>({sortBy}))
		this.state.filteredProjects.sort(function(a, b) {
		console.log(a,"aaaaaa",b,"bbbbb")
		var x = a[sortBy]; var y = b[sortBy];
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    	});
}

filterTitle = (e) => {
	var searchTitle=e.target.value;
	var filteredArray = this.state.projects.filter(function(itm){
  return itm["title"].toLowerCase().includes(searchTitle.toLowerCase())
	});

	this.setState(()=>({filteredProjects:filteredArray}));
}

render(){
	console.log(this.state.filteredProjects);
	return(
		<div>
			<input type="text"  onChange={this.filterTitle}/>
			<select value={this.state.sortBy} onChange={this.handleSortBy}>
				<option value="end.time">End Time</option>
				<option value="percentage.funded">Percentage Funded</option>
			</select>

		<DisplayProject projects={this.state.filteredProjects}/>
		</div>
	);}
}

export default ProjectDashboard;
