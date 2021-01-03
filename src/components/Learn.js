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

    reload = () => {
        window.location.reload()
        console.log("hey")
    }

    render(){
        const { common_name, url, family, extinction_date, range,kingdom, phylum, scientific_class, order, genus, species, description } = this.props.mammal
        
    return (
        <div>
            { this.props.search 
              ?
        <div id='Hey'>
            <button class="buy--btn" onClick={()=>this.reload()}>Press the me to return to the full list. ᕦ(ò_óˇ)ᕤ </button>  
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
            <button onClick={()=>this.urlTab(url)}> Go this Data's Source? </button>
        </footer>       
        </div>
        :
        <div >
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

        }
     </div>   

    )}
}
export default Learn
