import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Learn from "./Learn";
import {fetchTheDeadWorks} from '../actions/thedead';


class ExtinctAnimals extends Component {
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
          {
            this.props.thedead.map(mammal => {
              return <Learn key={mammal.id} mammal={mammal} history={this.props.history}/>
            })
          }
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
    fetchTheDeadWorks
}

  export default connect(mapStateToProps, mapDispatchToProps)(ExtinctAnimals);