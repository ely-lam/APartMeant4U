import "../styles/userPage.css";

export default function SignUpPage() {
  return (
    <div className="userPage" id="signup">
      <br/>
      <form action="/signup" method="post">
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
        <div>
          <label>
            Confirm Password: <input type="password" name="passwordConfirm" id="passwordConfirm"/>
          </label>
        </div>
        <button className="btn btn-primary" type="submit">Create User</button>
      </form>
    </div>
  );
}