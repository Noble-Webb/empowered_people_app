import React from 'react'

class Usercard extends React.Component{
    handleDeleteUser = () => {
        const { id } = this.props
        fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' })
        .then(resp => resp.json())
        .then(data => {
          this.props.handleDelete(id)
        })
    }

    render(){
        return(
            ''
        )
    }
}
export default Usercard