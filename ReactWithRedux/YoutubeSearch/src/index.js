import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
//files in project need full paths to be imported
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail  from './components/video_detail';
const API_KEY = 'AIzaSyDnIZaxQWudrIRFrQPNH8WbpiSUb8-p7BY';



//Create a new component. This should produce some HTML
/*const App = () => {
	return (
		<div>
			<SearchBar />
		</div>
	);
}*/

//Data changing over time implies state should be used for the component.
//Implement using class based component instead.

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			videos : [],
			selectedVideo : null
		};

		//Binding the current scope to a function allows always passing the same scope irrespective of
		//where the function is called from
		this.updateVideos = this.updateVideos.bind(this);
		this.updateVideos('surfboards');

	}

	updateVideos(searchTerm){
		YTSearch({key : API_KEY, term : searchTerm}, (videos) =>{
			//console.log(videos);
			this.setState({
				videos : videos,
				selectedVideo : videos[0]
			});
			//this.setState({videos})
			//resolves to : this.setState({videos: videos });
		});
	}

	render(){
		//videos passed as props to VideoList
		return (
		<div>
			<SearchBar updateVideos={this.updateVideos}/>
			<VideoDetail video={this.state.selectedVideo} />
			<VideoList 
				onVideoSelect={selectedVideo => this.setState({selectedVideo})}
				videos={this.state.videos} />
		</div>
		);
	}
}


//()=>{...} is the same as fuction(){...}

//const is a an ES6 feature. Similar to const in C#
//HTML inside javascript is JSX. 

// App is a class
// <App></App> is an instance


ReactDOM.render(<App />, document.querySelector('.container'));