import React from "react";
import { Route, Switch } from "react-router-dom";

import dogAPI from "../../api/dogAPI";

import DogBreedList from "./DogBreedList";
import RandomDogWithBreed from "./RandomDogWithBreed";

class DogBreeds extends React.Component {
  constructor() {
    super();
    this.state = {
      breeds: []
    };
  }

  getDogBreeds = () => {
    dogAPI.getMasterBreeds().then(response => {
      this.setState({ breeds: response.data.message });
    });
  };

  componentDidMount() {
    this.getDogBreeds();
  }

  //create a function inside a functional component that
  //ultimately changes the state to whatever is entered
  //in input
  //


  renderBreeds = () => {
    const { breeds } = this.state;

    return (
      <div>
        <h2> Master Breeds </h2>
        
        <DogBreedList breeds={breeds} />
        
      </div>
    );
  };

  renderDogWithBreed = props => {
    const { breed } = props.match.params;
    return <RandomDogWithBreed breed={breed} />;
  };

  render() {
    return (
      <Switch>
        <Route exact path="/dogs/breeds" render={this.renderBreeds} />
        <Route path="/dogs/breeds/:breed" render={this.renderDogWithBreed} />
      </Switch>
    );
  }
}

export default DogBreeds;
