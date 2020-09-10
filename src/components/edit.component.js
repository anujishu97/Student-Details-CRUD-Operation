import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangefname = this.onChangefname.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangemarks = this.onChangemarks.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
          fname: '',
          subjectname: '',
          marks:''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:4000/business/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                fname: response.data.fname, 
                subjectname: response.data.subjectname,
                marks: response.data.marks});
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangefname(e) {
    this.setState({
     fname: e.target.value
    });
  }
  onChangeSubject(e) {
    this.setState({
      subject: e.target.value
    })  
  }
  onChangemarks(e) {
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
    axios.post('http://localhost:4000/business/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Details</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Student Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.fname}
                      onChange={this.onChangefname}
                      />
                </div>
                <div className="form-group">
                    <label>subject: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.subjectname}
                      onChange={this.onChangeSubject}
                      />
                </div>
                <div className="form-group">
                    <label>Marks: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.marks}
                      onChange={this.onChangemarks}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Details" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}