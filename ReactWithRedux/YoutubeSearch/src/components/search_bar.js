import React, {Component} from 'react';


//Funtional Component
// - Directly returns JSX to render
// - prefer to use this over class to reduce complexity unless absolutely needed
// - functional components don't have state

/*
const SearchBar = ()=>{
	return <input />
};
*/


//Class based component
// - can hold more information about itself after being rendered
// - normally extends React.Component
// - must have a defined render menthod


//-----------------------------------
//State : each class based component has a plain JS object called state.
//if this is changed the component re-renders and does the same for its children

class SearchBar extends Component {

	constructor(props){
		//call to the parent constructor. Parent here is Component.
		//missing super throws an error.
		super(props);
		this.onInputChange = this.onInputChange.bind(this);
		//state should only be accessed via setState outside of the constructor
		this.state = {term: 'Enter search term'};

	}


	//when a class based component is instantiated the render function is always called
	//should always return JSX else will throw an error
	//Controlled component : The value is determined by state
	//example : <input value={this.state.term} />
	render(){
		//Event listenrs

		//Fat arrow notation does not need scope binding
		//onChange={(event) => this.setState({term : event.target.value})

		//Fat arrow notation to point to existing function inside JSX is considered bad
		//passing a new closure everytime causes the `div` to re-render every time
		//onChange={(event) => this.onInputChange(event)}
		
		return (
			<div className="search-bar">				
				<input
					value={this.state.term} 
					onChange={this.onInputChange} />
			</div>
		);
		

	}


	//event handling methods/functions
	//naming convention 1: handle<componentName><eventName>
	//naming convention 2 : on<componentName><eventName>
	//to access component with this it has to be bound in the constructor
	//or when adding the listener
	
	onInputChange(event){
		this.setState({term : event.target.value});
		this.props.updateVideos(event.target.value);		
	}
}



//only export the required component and not everything
export default SearchBar;
