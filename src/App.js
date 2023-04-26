import React from "react";
import axios from "axios";

// console.log(process.env.REACT_APP_SERVER);

class App extends React.Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      pizzaData: {},
      pizzaType: "",
      showPizza: false,
    };
  }

  //helperfunctions to handle form submit

  handleInput = (event) => {
    this.setState({
      pizzaType: event.target.value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    //need a url to the server
    //go to server / route ? some data that we are requesting from the server
    let url = `${process.env.REACT_APP_SERVER}/pizza?pizzatype=${this.state.pizzaType}`;


    //use axios to make server request
    let pizzaData = await axios.get(url);
    console.log('from the server:',pizzaData);
    //get data back and set it to state.
    this.setState({
      pizzaData: pizzaData.data,
      showPizza: true
    });



  };

  render() {
    // console.log('Pizza type',this.state.pizzaType)
    console.log(this.state.pizzaData);
    return (
      <>
        <h1>Find Your Pizza</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search Pizza Type
            <input type="text" onChange={this.handleInput} />
          </label>
          <button type="submit">Display Pizza</button>
        </form>

        {
          this.state.showPizza && 
          <p>{this.state.pizzaData.pizzaType} can be found in {this.state.pizzaData.pizzaLocation}</p>
        }
      </>
    );
  }
}

export default App;
