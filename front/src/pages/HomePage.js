import homePageIcon from "../images/home-512.png";
import "../styles/homePage.css";
import Navigation from "../components/Navigation.js";

export default function HomePage() {
  return (
    <div className="center">
      <Navigation />
      <div>Search our listings and find your dream apartment!</div>
      <img src={homePageIcon} alt="Home Page" width="400px"/>
    </div>
  );
}