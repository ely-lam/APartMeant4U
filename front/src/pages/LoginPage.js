import "../styles/loginPage.css"

export default function LoginPage() {
  return (
    <div className="login">
      <form action="/login" method="POST">
        <div>
          <label>
            Username: <input type="text" name="" id="username"/>
          </label>
        </div>
        <div>
          <label>
            Password: <input type="password" name="" id="password"/>
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}