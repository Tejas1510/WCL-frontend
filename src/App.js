// Import Required dependecies
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Import required pages
import AdminLogin from './pages/Admin/adminLogin';
import AdminDashboard from './pages/Admin/adminDashboard';
import AdminViewSubmission from './pages/Admin/adminViewSubmission';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path ="/">
          <AdminLogin/>
        </Route>
        <Route exact path ="/adminDashboard">
          <AdminDashboard/>
        </Route>

        {/* Part Added - Yash */}

        <Route exact path ="/adminViewSubmission">
          <AdminViewSubmission/>
        </Route>

      </Switch>
    </Router>
  );
}


export default App;
