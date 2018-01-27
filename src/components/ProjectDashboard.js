import React from 'react';
import axios from 'axios';
import DisplayProject from './DisplayProject';


class ProjectDashboard extends React.Component{

state = {
		projects:[{	}],
		currentSortBy:'',
		filteredProjects:[{}],
		location:[],
		currentLocation:'',
	}


filterTitle = (e) => {
	var searchTitle=e.target.value;
	var filteredArray = this.state.projects.filter(function(itm){
  return itm["title"].toLowerCase().includes(searchTitle.toLowerCase())
	});

	this.setState(()=>({filteredProjects:filteredArray}));
}

filterLocation = (e)=>{
	const location=e.target.value;

	if(e.target.value==="all"){
		this.setState(()=>({filteredProjects:this.state.projects}))
	}
	else {
			const filteredArray = this.state.projects.filter(function(itm){
			return itm["location"].includes(location)
			});

			console.log(filteredArray);
			this.setState(()=>({filteredProjects:filteredArray, currentLocation:location}));
	}

}

sortByFilter = (e) => {
	if (e.target.value == 'asc percent') {
		this.setState(()=>({currentSortBy:'asc percent'}))
		this.state.filteredProjects.sort(function(a, b) {
		var x = a['percentage.funded']; var y = b['percentage.funded'];
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    	});
	}
	else if(e.target.value == 'desc percent'){
		this.setState(()=>({currentSortBy:'desc percent'}))
		this.state.filteredProjects.sort(function(a, b) {
		var x = a['percentage.funded']; var y = b['percentage.funded'];
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		this.state.filteredProjects.reverse();
	}
	else if (e.target.value == 'asc time') {
			this.setState(()=>({currentSortBy:'asc time'}))
			this.state.filteredProjects.sort(function(a, b) {
			var x = a['end.time']; var y = b['end.time'];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		  	});
		}
		else{
			this.setState(()=>({currentSortBy:'desc time'}))
			this.state.filteredProjects.sort(function(a, b) {
			var x = a['end.time']; var y = b['end.time'];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		  	});
			this.state.filteredProjects.reverse();
		}
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

render(){
	console.log(this.state.filteredProjects);
	const filteredLocation = [... new Set(this.state.projects.map(a => a.location))];
	const mapOption = filteredLocation.map((data,index) => (
		<option value={data} key={index}>{data}</option>
	))
	return(
		<div>
			<input type="text"  onChange={this.filterTitle}/>

			<select  onChange={this.sortByFilter}>
				<option value="asc time">End Time: Ascending</option>
				<option value="desc time" >End Time: Descending</option>
				<option value="asc percent">Percentage Funded: Ascending</option>
				<option value="desc percent">Percentage Funded: Descending</option>
		</select>

			<select value={this.state.currentLocation} onChange={this.filterLocation}>
				<option value="all">Select the location you wish to filter by</option>
				{mapOption}
			</select>
		<DisplayProject projects={this.state.filteredProjects}/>
		</div>
	);}
}

export default ProjectDashboard;
