import homePageIcon from "../images/home-512.png";
import "../styles/homePage.css";

export default function HomePage() {
  return (
    <div className="center">
      <br/>
      <div>Search our listings and find your dream apartment!</div>
      <img src={homePageIcon} alt="Home Page" width="400px"/>
    </div>
  );
}