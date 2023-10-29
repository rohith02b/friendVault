import Home from './Groups/Home'
import Landing from './Home'

const Redirector = () => {
  return <>{localStorage.getItem('user') ? <Home /> : <Landing />}</>
}

export default Redirector
