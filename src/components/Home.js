import React from "react";



class Home extends React.Component {
    state = {
        display: false
    }    

    handleClick = () => {
        let newBoolean = !this.state.display
        this.setState({display: newBoolean})
    }
    urlTab = () => {
        let url = "https://empowered-explorers.herokuapp.com/games/play"
    
        // console.log(url)
        window.open(url)
    }
    
    render(){
    return ( 
        <div id="Hey">
            
        { this.state.display
            ?
            <img className="whole" src='https://thumbs.dreamstime.com/b/set-extinct-birds-animals-names-list-mammals-sea-creatures-ceased-to-exist-isolated-vector-images-species-can-131490030.jpg' alt="diverse group of animals"></img> 
            :
            <div id="Hey"> <h1>Welcome to Library!</h1>
           
            <h4>Earth is punctuated by five major extinction events. The end-Permian extinction event is thought of as the most dramatic example, taking nearly 95% of all life at the time. [Vijda, Mcloughlin 2005] Only 50 Mya after the end-Permian extinction began the Triassic - Jurassic extinction. This extinction saw the end of 70% of vertebrates and nearly 100% of shallow marine life. Strangely enough, a large number of terrestrial plants were vastly unaffected. During the end-Triassic extinction, close to half of all the life that existed at the time went extinct. These types of events are important to study because they give insight into CO2 change, oxygen levels, climate, and fauna/flora growth. These extinctions have fundamentally changed the planet inside and out. [Kunin, W.E.; Gaston, Kevin, eds. (31 December 1996)]</h4> <br/>
 
            <h4>Empowered People host a database of extinct animals dating back to the Ordovician-Silurian era, 440 million years ago. Data is initially retrieved from Wikipedia using ParceHub, then painstakingly analyzed for quality assurance. Therefore, the information you're looking for may not be available today, but very well maybe tomorrow! Visit frequently to stay up to date! Notice Empowered People does not own any of the information/images used to educated it's users. All imformation was expressly given and royality free. Links are available.</h4> <br/>
 
                </div>
            
        }
        <button onClick={this.handleClick}> Click Me!! </button>
        <h1>Welcome to Empowered People!</h1>
        
        <h3>Power of Empowered People </h3>
            <p>Humans have decied to take the road less traveled. As we begin to experience novel climates and other ecological shifts, it can be easy to become afraid. But change isn't inheriently bad.  </p>

            <p>The mission of Empowered People is to provide judgement and politic free information on the environment. I aim to cultivate a scholarly interest in the biome we collectively call home. Enjoy your visit! </p>

            <br/>
        <h4>The Current State of Affairs</h4>

        <p>Education, or the lack thereof, is considered by many the great divider of people. Where there is like education and assessment of facts a common understanding is possible. The same is true of education’s role in the realm of conservation and environmental stewardship. The very definition of the term environmental education, coined by the World Conservation Union in 1970, contains a significant premise of changing behaviors based upon newfound knowledge. As you explore this application, I hope that you are able to digest new information and evolve as well. While there exists little disagreement that environmental education cultivates environmental stewardship behaviors, another well known and lowly debated fact is that education does not equal action. Educated voting and activism display the changes we wish to see.</p> 
        <br/>
        
        {/* <p> Voting is the backbone of any democratic system. Voting not only allows for one to express personal thoughts and contend for change but allows for policymakers to gain valuable information about their constituents. Political researchers, Fournier, et al., in a 2005 study claims that, “The logic behind the link between issue importance and issue voting should translate to a link between issue importance and performance voting.” Meaning that if a person believes that an issue is important, they will vote in a way that reflects such, in a manner which is in accordance with their belief. But voting isn't always enough. </p><br/>

        <p>Actions such as Environmental Justice movement has brought about significant reforms. In 1982, a group of concerned U.S. citizens, championed by primarily African-Americans, Latinos, Asians, Pacific Islanders, and Native Americans, created the Environmental Justice movement. E.J.’s grassroots protest directly brought about the enactment of Executive Order 12898. This law was made to focus federal attention on the environmental and human health conditions of minority and low-income populations to achieve environmental protection for all communities. Their action gave rise to some national relief to those living in underprivileged environments. Environmental action is any voluntary physical/outspoken involvement (protest, picketing, getting signatures, etc.) working towards a pro-environmental change. The enactment of Executive Order 12898, along with several other examples, highlight the importance of action.</p> */}


        </div>
    )}
}
  
  export default Home