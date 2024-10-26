import { useState, useEffect } from "react";
import "./GameRow.css";

import heart_u from "./heart_u.png";
import heart_s from "./heart_s.png";
import like_u from "./like_u.png";
import like_s from "./like_s.png";
import meh_u from "./meh_u.png";
import meh_s from "./meh_s.png";

function GameRow(props) {
  let storedIcon = JSON.parse(localStorage.getItem("icon" + props.game.id));
  const [icon, setIcon] = useState(storedIcon ? storedIcon : "none");

  console.log(storedIcon);

  useEffect(() => {
    localStorage.setItem("icon" + props.game.id, JSON.stringify(icon));
  }, [icon]);

  function handleHeart() {
    if (icon == "heart") {
      setIcon("none");
      props.game.rating = "No Rating";
    } else {
      setIcon("heart");
      props.game.rating = "Love It";
    }
  }

  function handleLike() {
    if (icon == "like") {
      setIcon("none");
      props.game.rating = "No Rating";
    } else {
      setIcon("like");
      props.game.rating = "Like It";
    }
  }

  function handleMeh() {
    if (icon == "meh") {
      setIcon("none");
      props.game.rating = "No Rating";
    } else {
      setIcon("meh");
      props.game.rating = "Meh";
    }
  }

  return (
    <>
      <div>
        <img src={props.game.image}></img>
      </div>
      <div>{props.game.title}</div>
      <div>{props.game.platform}</div>
      <div>{props.game.year}</div>
      <div>{props.game.genre}</div>
      <div>
        <button onClick={handleHeart}>
          <img
            src={props.game.rating == "Love It" ? heart_s : heart_u}
            height="25rem"
          />
        </button>
        <button onClick={handleLike}>
          <img
            src={props.game.rating == "Like It" ? like_s : like_u}
            height="25rem"
          />
        </button>
        <button onClick={handleMeh}>
          <img
            src={props.game.rating == "Meh" ? meh_s : meh_u}
            height="25rem"
          />
        </button>
        <br />
        {props.game.rating}
      </div>
    </>
  );
}

export default GameRow;
