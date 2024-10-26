import { useState, useEffect } from "react";
import logo from "./logo.png";
import Input from "./Input.js";
import API from "./API.js";
import Loading from "./Loading.js";
import Main from "./Main.js";
import { Game } from "./Game.js";
import "./App.css";

function App() {
  const [ID, setID] = useState("");
  const [key, setKey] = useState("");
  const [games, setGames] = useState([]);
  const [filtPlatforms, setFiltPlatforms] = useState([]);
  const [filtGenres, setFiltGenres] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (ID && key) {
      setLoad(true);
      getCollection();
    }
  }, [ID, key]);

  function handleID(id) {
    setID(id);
  }

  function handleKey(key) {
    setKey(key);
  }

  async function getCollection() {
    const idArray = [];
    let cursor = "";
    do {
      const response = await fetch(
        `https://www.pricecharting.com/api/offers?t=${key}&seller=${ID}&status=collection&sort=name&cursor=${cursor}`
      );
      if (!response.ok) {
        throw new Error(`PriceCharting API call failed.`);
      }
      const jsonResponse = await response.json();
      cursor = jsonResponse["cursor"];

      idArray.push(
        ...jsonResponse["offers"].map((offerData) => {
          return { id: offerData["id"], url: offerData["image-url"] };
        })
      );
    } while (cursor);

    const gameArray = await Promise.all(
      idArray.map(async (game) => {
        const response = await fetch(
          `https://www.pricecharting.com/api/product?t=${key}&id=${game.id}`
        );
        if (!response.ok) {
          throw new Error(`PriceCharting API call failed.`);
        }
        const jsonResponse = await response.json();
        return new Game(
          game.id,
          game.url,
          jsonResponse["product-name"],
          jsonResponse["console-name"],
          jsonResponse["release-date"],
          jsonResponse["genre"]
        );
      })
    );
    const filterOut = ["Systems", "Accessories", "Magazine", "Controllers"];
    const filtArray = gameArray.filter((game) => {
      if (filterOut.includes(game.genre) || game.platform == "Strategy Guide") {
        return false;
      }
      return true;
    });

    const platformsArray = filtArray.map((game) => {
      return game.platform;
    });
    const filtPlatArray = [...new Set(platformsArray)];

    const genreArray = filtArray.map((game) => {
      return game.genre;
    });
    const filtGenreArray = [...new Set(genreArray)];

    setFiltPlatforms(filtPlatArray.sort());
    setFiltGenres(filtGenreArray.sort());
    setGames(filtArray);
    setLoad(false);
  }

  return (
    <>
      <header className="Header">
        <img
          className="Header-image"
          src={logo}
          alt="What Game Should I Play Next?"
        />
        <br />A sort & filter tool for your game collection.
      </header>
      {!ID && !key && load == false && <Input onID={handleID} />}
      {ID && !key && load == false && <API onKey={handleKey} />}
      {ID && key && load == true && <Loading />}
      {ID && key && load == false && (
        <Main
          gamesArray={games}
          platformsArray={filtPlatforms}
          genresArray={filtGenres}
        />
      )}
      <footer className="Footer">
        Inspired by{" "}
        <a href="https://www.lorenzostanco.com/lab/steam/" target="_blank">
          Steam Filters
        </a>{" "}
        by Lorenzo Stanco. Powered by{" "}
        <a href="https://www.pricecharting.com/" target="_blank">
          PriceCharting
        </a>{" "}
        API by JJ Hendricks. All game titles referenced herein are TM and
        copyright their respective owners. All rights reserved.
      </footer>
    </>
  );
}

export default App;
