import React, { Component } from 'react';
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';

export default class Create extends Component {
  constructor(props) {
    super(props)
    const token=localStorage.getItem("token")
    console.log(token);
    let loggedIn = true
    if(token ==  null)
    {
        loggedIn = false
    }

    this.onChangeFname = this.onChangeFname.bind(this);
    this.onChangeSubjectname = this.onChangeSubjectname.bind(this);
    this.onChangeMarks= this.onChangeMarks.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      fname: '',
      subjectname: '',
      marks:'',
      loggedIn
    }
  }
  onChangeFname(e) {
    this.setState({
      fname: e.target.value
    });
  }
  onChangeSubjectname(e) {
    this.setState({
      subjectname: e.target.value
    })  
  }
  onChangeMarks(e) {
    this.setState({
    marks: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      fname: this.state.fname,
     subjectname: this.state.subjectname,
      marks: this.state.marks
    };
    axios.post('http://localhost:4000/business/add', obj)
        .then(res => {
        console.log(res.data)
        alert("Added Successfully");
        });
    
    this.setState({
      fname: '',
     subjectname: '',
      marks: ''
    })
  }
 
  render() {
    console.log(this.state.loggedIn)
    if(this.state.loggedIn === false)
    {
      alert("Please Login First")
       return <Redirect to="/" />
      
    }
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Add New Student Details</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>First Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.fname}
                      onChange={this.onChangeFname}
                      required
                      /> 
                </div>
                <div className="form-group">
                    <label>Subject : </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.subjectname}
                      onChange={this.onChangeSubjectname}
                      required
                      />
                </div>
                <div className="form-group">
                    <label>Marks</label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.marks}
                      onChange={this.onChangeMarks}
                      required
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Add Student" 
                      className="btn btn-primary"/>
                </div>
                <div className="form-group">
                <Link to="/logout">
                    logout
                </Link>
                </div>
            </form>
        </div>
    )
  }
}