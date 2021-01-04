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
        this.props.strollCementary(e.target.value, this.props.mammals)
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
            <h3>There's so much to explore!</h3>

            <h4 ><span id="Hey">Enter a Family or Common Name into the bar below. Press enter to initiate search</span></h4>
            <div  style = {{textAlign: 'center'}}>
          <input id="animal-searchbar" name='search' value={this.state.search} onChange={this.handleChange} onKeyDown={this.query} placeholder = 'Search'/>
          </div>
          <div>
            { localStorage.getItem("my_app_token") ?
          <div>
          {
            this.props.thedead.map(mammal => {
              return <Learn key={mammal.id} mammal={mammal} history={this.props.history} search={this.state.search}/>
            })
            
          }
          </div>
        :
        <div>
          <h1>Welcome to Library!</h1>
           
           <h3>Earth is punctuated by five major extinction events. The end-Permian extinction event is thought of as the most dramatic example, taking nearly 95% of all life at the time. [Vijda, Mcloughlin 2005] Only 50 Mya after the end-Permian extinction began the Triassic - Jurassic extinction. This extinction saw the end of 70% of vertebrates and nearly 100% of shallow marine life. Strangely enough, a large number of terrestrial plants were vastly unaffected. During the end-Triassic extinction, close to half of all the life that existed at the time went extinct. These types of events are important to study because they give insight into CO2 change, oxygen levels, climate, and fauna/flora growth. These extinctions have fundamentally changed the planet inside and out. [Kunin, W.E.; Gaston, Kevin, eds. (31 December 1996)]</h3> <br/>

           <h3>Empowered People host a database of extinct animals dating back to the Ordovician-Silurian era, 440 million years ago. Data is initially retrieved from Wikipedia using ParceHub, then painstakingly analyzed for quality assurance. Therefore, the information you're looking for may not be available today, but very well maybe tomorrow! Visit frequently to stay up to date! Notice Empowered People does not own any of the information seen on this and like pages. All imformation was expressly given and royality free. Links are available.</h3> <br/>

              <h1>Please Login to start exploring</h1>
        </div>
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

