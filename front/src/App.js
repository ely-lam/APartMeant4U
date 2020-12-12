import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navigation from "./components/Navigation.js";

import LoginPage from "./pages/LoginPage.js";

import homePageIcon from "./images/home-128.png";

function LogoutPage() {
  return <div></div>;
}

function HomePage() {
  return <div><img src={homePageIcon} alt="Home Page" width="64"/></div>;
}

function App() {
  return (
    <Router>
      <div className="App container">
        <header>
          <h1>APartMeant4U</h1>
        </header>
        
        <Navigation></Navigation>

        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/logout">
            <LogoutPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>

        <br/>
        <footer>
          <p>Favicon made by <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
