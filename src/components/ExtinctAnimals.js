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
      display: false
    }
}
handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
}

handleClick = () => {
  let newBoolean = !this.state.display
  this.setState({display: newBoolean})
}

urlTab = (url) => {
  console.log(url)
  window.open(url)
}
  query = (e) => {
    if (e.key === 'Enter'){
        this.props.strollCementary(e.target.value, this.props.mammals)
    }
  }

  componentDidMount(){
      fetch('http://localhost:3003/mammals')
      .then(resp => resp.json())
      .then(mammals =>{   
        this.props.fetchTheDeadWorks(mammals)})
  }
  
    render(){ 
    return (
      <div>
      { this.state.display ?
      <Switch>
        <Route path='/learn' render={() => {
          return <div>
           
          <div>
            { localStorage.getItem("my_app_token") ?
          <div>
             <h3><span id="Hey"> There's so much to explore. {this.props.thedead.length} to be exact!</span></h3>
                    
              <h4 ><span id="Hey">You can search the database by Scientific Class or Common Name. Press Enter to initiate search.</span></h4>
              <div  style = {{textAlign: 'center'}}>
              <input id="animal-searchbar" name='search' value={this.state.search} onChange={this.handleChange} onKeyDown={this.query} placeholder = 'Search'/>
              </div>
          {
            this.props.thedead.map(mammal => {
              return <Learn key={mammal.id} mammal={mammal} history={this.props.history} search={this.state.search}/>
            })
            
          }
          </div>
        :
        <div id="Hey">
          <h1>Welcome to Library!</h1>
           
           <h4>Earth is punctuated by five major extinction events. The end-Permian extinction event is thought of as the most dramatic example, taking nearly 95% of all life at the time. [Vijda, Mcloughlin 2005] Only 50 Mya after the end-Permian extinction began the Triassic - Jurassic extinction. This extinction saw the end of 70% of vertebrates and nearly 100% of shallow marine life. Strangely enough, a large number of terrestrial plants were vastly unaffected. During the end-Triassic extinction, close to half of all the life that existed at the time went extinct. These types of events are important to study because they give insight into CO2 change, oxygen levels, climate, and fauna/flora growth. These extinctions have fundamentally changed the planet inside and out. [Kunin, W.E.; Gaston, Kevin, eds. (31 December 1996)]</h4> <br/>

           <h4>Empowered People host a database of extinct animals dating back to the Ordovician-Silurian era, 440 million years ago. Data is initially retrieved from Wikipedia using ParceHub, then painstakingly analyzed for quality assurance. Therefore, the information you're looking for may not be available today, but very well maybe tomorrow! Visit frequently to stay up to date! Notice Empowered People does not own any of the information seen on this and like pages. All imformation was expressly given and royality free. Links are available.</h4> <br/>

              <h1>Please Login to start exploring</h1>
        </div>
        }
          </div>
          </div>
        }} />
    </Switch>
       :
       <div id="Hey">
       <h1>Before we begin let's learn a bit.</h1><br/>
           <h2>What is an Animal Classification?</h2>
               <p>Animal kingdom classification is an important system for understanding how all living organisms are related. Animals are arranged into groupings based upon shared characteristics. The most common grouping method, created by Carolus Linnaeus, has 9 sections:</p>
               <ul>
                   <li>Species (most specific)</li>
                   <li>Genus</li>
                   <li>Family</li>
                   <li>Suborder</li>
                   <li>Order</li>
                   <li>Class</li>
                   <li>Phylum</li>
                   <li>Kingdom</li>
                   <li>Domain (least specific)</li>
               </ul> <br/>

               <h2>Animmalia (Animal) Kingdom and Chordata Phylum.</h2><br/>
               
               <p>You are about to learn about extinct animals from the Animmalia Kingdom. A kingdom of complex multi-celled organisms that do not produce their own food. This kingdom contains all living and extinct animals. Examples include Mammoths, whales, humans, and most importantly rats?!?!</p> <br/>

               <p> These animals, as well as most common animals, are of the Chordata or Vertebrates Phylum. Chordata/Vertebrates are animals that develop a notochord, a cartilaginous skeletal rod that supports the body in embryo and can often become a spine. Most animals we are familiar with, including dogs, horses, birds, and humans fall in to this category. </p>
                       <h1>Reel it in! etc</h1> <br/>
                   <p>If you would like to learn more about Scientific classifications, click the 'Let's Get Classy' button below'</p> <br/>
                   <button name="science" onClick={()=>this.urlTab('https://a-z-animals.com/reference/animal-classification/')}> Let's Get Classy </button>
       </div>
       }
       <button onClick={this.handleClick}> Click me to start exploring the database </button>

    </div>   
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

