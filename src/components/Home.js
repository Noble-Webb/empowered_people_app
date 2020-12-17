import React from "react";
// import NoteList from "./NoteList";



class Home extends React.Component {
    state = {
        display: false
    }    

    handleClick = () => {
        let newBoolean = !this.state.display
        this.setState({display: newBoolean})
    }
    
    render(){
    return ( 
        <div>
            
        { this.state.display
            ?
            // <NoteList />
            <message> <a href='file:///C:/Users/webb.justin15/Final-Project/Game%20Engine/index.html'>"Ready To Explore?"</a> </message>
            :
            <img className="whole" src='https://thumbs.dreamstime.com/b/set-extinct-birds-animals-names-list-mammals-sea-creatures-ceased-to-exist-isolated-vector-images-species-can-131490030.jpg'></img> 
        }
        <button onClick={this.handleClick}> Ready to Explore?  </button>
        <h1>Welcome to Empowered People!</h1>
        
        <h3>I have a Dream?</h3>

        <h4>Our users ALL dream big and our mission it to help make those dreams come true. How do we do that? Well, here at Quality Content, we allow our users to post project ideas of any nature. The user community, along with our staff of HIGHLY TRAINED project managers, weigh in on the good and bad aspects of the idea. This process enables our users to create Quality Content.</h4> 
        <br/>
        
        <h3>Thick Skin for the Win</h3>

        <h4> While hate speech is not allowed, people are entitled/encouraged to share their honest feelings on a topic; be ready for any critisim you may face. Remeber that broken bones heal to be even stronger & that together we can make QUALITY Content! </h4>
        </div>
    )}
}
  
  export default Home