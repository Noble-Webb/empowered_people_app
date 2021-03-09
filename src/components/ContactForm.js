import React, {Component} from 'react'
import * as emailjs from "emailjs-com"
import{ init } from 'emailjs-com';

import { Button, FormFeedback, Form, FormGroup, Label, Input } from 'reactstrap'

class ContactForm extends React.Component{
    state = {
        name: '',
        email: '',
        subject: '',
        message: '',
      }
    
      handleSubmit(e) {
        e.preventDefault()
        
        console.log("hey")
        const { name, email, subject, message } = this.state
        
        let templateParams = {
          from_name: email,
          subject: subject,
          message: message,
         }

         emailjs.send(
            'service_yywmouh',
          'contact_form',
           templateParams,
          'user_LrixglvP0gA3gJDy4vBQD'
         )
        
         this.resetForm()
     }
    
    resetForm() {
    this.setState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    }

    handleChange = (param, e) => {
        this.setState({ [param]: e.target.value })
      }

    render() {
        return (
          <div >
              <h1 className="p-heading1">Get in Touch</h1>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    value={this.state.email}
                    className="text-primary"
                    onChange={this.handleChange.bind(this, 'email')}
                    placeholder="Enter email"
                  />
                </FormGroup>
    <FormGroup >
                  <Input
                    type="text"
                    name="name"
                    value={this.state.name}
                    className="text-primary"
                    onChange={this.handleChange.bind(this, 'name')}
                    placeholder="Name"
                  />
                </FormGroup>
    <FormGroup >
                  <Input
                    type="text"
                    name="subject"
                    className="text-primary"
                    value={this.state.subject}
                    onChange={this.handleChange.bind(this, 'subject')}
                    placeholder="Subject"
                  />
                </FormGroup>
    <FormGroup >
                  <Input
                    type="textarea"
                    name="message"
                    className="text-primary"
                    value={this.state.message}
                    onChange={this.handleChange.bind(this, 'message')}
                    placeholder="Enter your message here."
                  />
                </FormGroup>
    <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
             
          </div>
        )
      }
}

export default ContactForm