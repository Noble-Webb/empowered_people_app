import { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Learn from "./Learn";
import {fetchTheDeadWorks, strollCementary} from '../actions/thedead';


class ExtinctAnimals extends Component {
  constructor(){
    super()
    this.state = {
      search: '',
    //   showDetails: false,
    //   display: false,
    }
}
handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }


  query = (e) => {
    if (e.key === 'Enter'){
        this.props.strollCementary(e.target.value, this.props.mammal)
    }
  }

  componentDidMount(){
      fetch('http://localhost:3002/mammals')
      .then(resp => resp.json())
      .then(mammals =>{ 
        this.props.fetchTheDeadWorks(mammals)})
  }
  
    render(){ 
    return (
      <Switch>
        <Route path='/learn' render={() => {
          return <div>
            <div style = {{textAlign: 'center', paddingTop: '30vh'}}>
          <input name='search' value={this.state.search} onChange={this.handleChange} onKeyDown={this.query} placeholder = 'Search by Family or Common Name!'/>
          <br></br>
          </div>
          <div>
          {
            this.props.thedead.map(mammal => {
              return <Learn key={mammal.id} mammal={mammal} history={this.props.history}/>
            })
          }
          </div>
          </div>
        }} />
    </Switch>
  )
}}

const mapStateToProps = (state) => {
    return {
      thedead: state.thedead
    }
  }

const mapDispatchToProps = {
    fetchTheDeadWorks,
    strollCementary
}

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ExtinctAnimals));

