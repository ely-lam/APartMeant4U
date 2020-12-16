import "../styles/userPage.css";
import Navigation from "../components/Navigation.js";

export default function LoginPage(props) {
  return (
    <div className="userPage" id="login">
      <Navigation />
      <br/>
      <form action="/login" method="post">
        <div>
          <label>
            Username: <input type="text" name="username" id="username"/>
          </label>
        </div>
        <div>
          <label>
            Password: <input type="password" name="password" id="password"/>
          </label>
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
}