import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from'axios'

class App extends Component {
    
  constructor(props){
    super(props);
    this.state = {repoData:[]}
    this.search = this.search.bind(this)
    this.clear = this.clear.bind(this)
    this.repoSearch = this.repoSearch.bind(this)
    this.clearRepo = this.clearRepo.bind(this)

  }
  clear(){
    this.refs.username.value = ""
    this.setState({repoData:[],saveData:[]})
  }
  search(){
    var uname = this.refs.username.value

    var setState = this.setState.bind(this)
    var url = "https://api.github.com/users/"+uname+"/repos"
    axios.get(url)
    .then(function (response) {
      setState({repoData:response.data,saveData:response.data})
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  repoSearch(){
    var reponame = this.refs.reponame.value.toUpperCase();
    var {repoData} = this.state;
    var setState = this.setState.bind(this)
     if(reponame == ""){
       repoData.forEach( function(e,i){ document.getElementById(i).innerHTML = e.name;})
     }
     else{
    
    repoData.forEach(function(element,index) {
      
      if(element.name.toUpperCase().includes(reponame)){
        
       var x = document.getElementById(index);
       var index = element.name.toUpperCase().indexOf(reponame)
       var text = element.name.slice(0,index)+`<span id="select">${element.name.slice(index,index+reponame.length)}</span>`+element.name.slice(index+reponame.length)
       x.innerHTML = text;
      }
      else{
        document.getElementById(index).innerHTML = element.name;
      }
      
    });
  }
  }
  clearRepo(){
    this.refs.reponame.value=""
    this.repoSearch();
  }
  render() {
    var {repoData} = this.state;
    
   
    return (
      <div className="App">
        <form>
        <input type="text" name="name" ref="username"/> 
        <button type="button" onClick={this.search}>Go</button>
        <button type="button" onClick={this.clear}>Clear</button>
        <br/>
        <br/>
        <input type="text" name="reponame" placeholder="reponame" ref = "reponame" onChange={this.repoSearch}/>
        <button type="button" onClick={this.clearRepo}>Clear</button>
        </form>

        <br/>
        <br/>

        {repoData.length > 0?<ul>{repoData.map((e,index) => <li id={index}>{e.name}</li>)}</ul>:<div></div>}
      </div>
    );
  }
}

export default App;
