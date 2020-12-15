import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount(){
    const token = localStorage.getItem('my_app_token')

    if(!token) {
      this.props.history.push('/signup')
    } else {

      const reqObj = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      fetch('http://localhost:3001/current_user', reqObj)
      .then(resp => resp.json())
      .then(users =>{
        // console.log(users)
        this.props.currentUser(users)
      })
    }
  }

  
  
  
  render(){
    console.log(this.state)
    return (
      <div className="App">
        <Navbar icon="puzzle" title="Quality Content!!" description="Broken Bones Made Stronger" />
        <Switch>
          <Route path="/quality_content" component={Home}/>
          <Route exact path="/notes" component={Notes} />
          <Route path='/notes/new' component={NoteInput} />
          <Route path="/users" component={User} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    ); 
  }
}

const mapDispatchToProps = {
  fetchNotesWorks,
  currentUser
}

const mapStateToProps = (state) =>{
  // user: state.current_user.user.id  
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

