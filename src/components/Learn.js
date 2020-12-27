import React from 'react'

class Learn extends React.Component {
    constructor(){
        super()
        this.state = {
          search: '' 
        //   showDetails: false,
        //   display: false,
        }
    }
    // handleClick = () => {
    //     let newBoolean = !this.state.display
    //     this.setState({display: newBoolean})
    // }

    urlTab = (url) => {
        console.log(url)
        window.open(url)
    }

    // handleToggle = () => {
    // this.setState({
        
    //     showDetails: !this.state.showDetails
        
    // })
    // console.log(this.state.showDetails)
    // }

    render(){
        const { common_name, url, family, extinction_date, range,kingdom, phylum, scientific_class, order, genus, species, description } = this.props.mammal
        
    return (
        <div>
            {localStorage.getItem("my_app_token") 
              ?
        <div>
        <section class="product">
        	<div class="product__photo">
		    <div class="photo-container">
			<div class="photo-main">
				<div class="controls">
					<i class="material-icons">Game Sprite in Development</i>
					
				</div>
				    <img src="https://res.cloudinary.com/john-mantas/image/upload/v1537291846/codepen/delicious-apples/green-apple-with-slice.png" alt="green apple slice"/>
			</div>
			<div class="photo-album">
				<ul>
					<li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png" alt="green apple"/></li>
					<li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303532/codepen/delicious-apples/half-apple.png" alt="half apple"/></li>
					<li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303160/codepen/delicious-apples/green-apple-flipped.png" alt="green apple"/></li>
					<li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303708/codepen/delicious-apples/apple-top.png" alt="apple top"/></li>
				</ul>
			</div>
		    </div>
	        </div>
            <div class="product__info">
                <div class="title">
                    <h1>{common_name}</h1>
                    <span>{extinction_date}</span>
                </div>
                <div class="price">
                    Description: <span> {description}</span>
                </div>
                <div class="variant">
                    <h3>Select a sprite</h3>
                    <ul>
                        <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png" alt="green apple"/></li>
                        <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302752/codepen/delicious-apples/yellow-apple.png" alt="yellow apple"/></li>
                        <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302427/codepen/delicious-apples/orange-apple.png" alt="orange apple"/></li>
                        <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302285/codepen/delicious-apples/red-apple.png" alt="red apple"/></li>
                    </ul>
                </div>
                <div class="description">
                    <h3>Scientific Classification</h3>
                    <ul>
                        <li>Family {family}</li>
                        <li>Kingdom: {kingdom}</li>
                        <li>Phylum: {phylum}</li>
                        <li>Class: {scientific_class}</li>
                        <li>Order: {order}</li>
                        <li>Species: {species}</li>
                        <li>Genus: {genus}</li>
                        <li>Range: {range}</li>
                    </ul>
                </div>
		        <button class="buy--btn">Load {common_name} Sprite </button>
	        </div>
        </section>

        <footer>
            <button onClick={()=>this.urlTab(url)}> Drink from the Tap? </button>
        </footer>
        </div>
        :
        <div id='Hey' >
                                            <h1>Welcome to Library!</h1>
           
            <h3>Earth is punctuated by five major extinction events. The end-Permian extinction event is thought of as the most dramatic example, taking nearly 95% of all life at the time. [Vijda, Mcloughlin 2005] Only 50 Mya after the end-Permian extinction began the Triassic - Jurassic extinction. This extinction saw the end of 70% of vertebrates and nearly 100% of shallow marine life. Strangely enough, a large number of terrestrial plants were vastly unaffected. During the end-Triassic extinction, close to half of all the life that existed at the time went extinct. These types of events are important to study because they give insight into CO2 change, oxygen levels, climate, and fauna/flora growth. These extinctions have fundamentally changed the planet inside and out. [Kunin, W.E.; Gaston, Kevin, eds. (31 December 1996)]</h3> <br/>

            <h3>Empowered People host a database of extinct animals dating back to the Ordovician-Silurian era, 440 million years ago. Data is initially retrieved from Wikipedia using ParceHub, then painstakingly analyzed for quality assurance. Therefore, the information you're looking for may not be available today, but very well maybe tomorrow! Visit frequently to stay up to date! Notice Empowered People does not own any of the information seen on this and like pages. All imformation was expressly given and royality free. Links are available.</h3> <br/>

                                    <h1>Please Login to start exploring</h1>
     </div>   

        }
     </div>   

    )}
}
export default Learn