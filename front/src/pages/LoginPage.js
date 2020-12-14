import "../styles/userPage.css";

export default function LoginPage() {
  return (
    <div className="userPage" id="login">
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