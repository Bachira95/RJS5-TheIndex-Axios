import React, { Component } from "react";
import axios from 'axios';

import authors from "./data.js";

// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./Loading";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [], 
    loading: true
  };

  selectAuthor = async author => {
    try{
      //3.3
      this.setState({loading: true});
      const response = await axios.get(`https://the-index-api.herokuapp.com/api/authors/${author.id}/`);
      this.setState({currentAuthor: response.data, loading: false});
    }
    catch (error){
      console.log(error);
    }

  }

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return(
        //note: I don't neeed a curly praces because I' not in JSX
        this.state.loading ? (<Loading />) : 
          (<AuthorList authors={this.state.authors} selectAuthor={this.selectAuthor} />)
        
      );
    }
  };

  // 1.5
  async componentDidMount () {
    try{
      const response = await axios.get("https://the-index-api.herokuapp.com/api/authors/");
      //1.6 set the state to the data from response
      //2.3 this code here indeicates that we got an author, so here will be no Loading, "Loading = false"
      this.setState({authors: response.data, loading: false});
    }
    catch(error){
      console.log(error);
    }
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
