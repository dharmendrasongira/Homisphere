import { Link } from "react-router-dom";
import "./card.css";

function Card({ item }) {
  if (!item) return null;

  const { id, images = [], title = "", address = "", price = 0, bedroom = 0, bathroom = 0 } = item;
  console.log(item);
  return (
    <div className="card">
      <Link to={`/${id}`} className="imageContainer">
        <img src={images[0] || "/placeholder.png"} alt="property" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${id}`}>{title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="pin" />
          <span>{address}</span>
        </p>
        <p className="price">$ {price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="bed" />
              <span>{bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="bath" />
              <span>{bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="save" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="chat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
