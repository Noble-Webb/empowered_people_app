import React from 'react'
import first from '../bgimages/0.jpg'
import second from '../bgimages/1.jpg'
import third from '../bgimages/2.jpg'
import fourth from '../bgimages/3.jpg'
import fifth from '../bgimages/4.jpg'
import sixth from '../bgimages/5.jpg'
import seventh from '../bgimages/6.jpg'
import eighth from '../bgimages/7.jpg'
import nineth from '../bgimages/8.jpg'
import tenth from '../bgimages/9.jpg'

class Learn extends React.Component {
    constructor(){
        super()
        this.state = {
          showDetails: false
        }
    }
    
    renderDetails = () => {
        
        const {kingdom, phylum, scientific_class, order, genus, species, description} = this.props.mammal
    return (
        <div>
        <p>kingdom: {kingdom}</p>
        <p>phylum: {phylum}</p>
        <p>scientific_class: {scientific_class}</p>
        <p>order: {order}</p>
        <p>species: {species}</p>
        <p>genus: {genus}</p>
        <p>description: {description}</p>
        </div>
    )
    }

    handleToggle = () => { 
    this.setState(prevState  => {
        return {
        showDetails: !prevState.showDetails
        }
    })
    }

    render(){
        const { common_name, url, family, extinction_date, range } = this.props.mammal

        let array = [first, second, third, fourth, fifth, sixth, seventh, eighth, nineth, tenth]
        
        let img = Math.floor( Math.random() * 10 )
        
    return (
        <div className='ui seven wide column pigTile'>
            <h4>{common_name}</h4>
            <h5>{family}</h5>
            <h5>{extinction_date}</h5>
            <a href={url}> Drink from the Tap? </a>
            <h5>{range}</h5>
            <div>
                <img src={'https://thumbs.dreamstime.com/z/dinosaurs-cartoon-collection-colorful-set-fantasy-cute-monsters-animals-prehistoric-character-diplodocus-dinosaurs-cartoon-129318957.jpg'} alt="placeholder drawn images from dreamstime"/>
                {/* <img src={`(${array[img]})`} alt="placeholder drawn images from dreamstime"/> */}
            </div>
            <button onClick={this.handleToggle}>Toggle Details</button>
            { this.state.showDetails ? this.renderDetails() : null }
        </div>
    )
    }
}

export default Learn