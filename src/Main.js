import { useState, useEffect } from "react";
import "./Main.css";
import GameRow from "./GameRow.js";

function Main(props) {
  const [sortParam, setSortParam] = useState("");
  const [sortDir, setSortDir] = useState("");
  const [filtTitle, setFiltTitle] = useState("");
  const [filtPlatform, setfiltPlatform] = useState("");
  const [filtReleaseYear, setfiltReleaseYear] = useState("");
  const [filtGenre, setfiltGenre] = useState("");
  const [filtRating, setfiltRating] = useState("");

  const filtArray = props.gamesArray.filter((game) => {
    if (
      filtTitle != "" &&
      !game.title.includes(filtTitle) &&
      !game.title.toLowerCase().includes(filtTitle.toLocaleLowerCase())
    ) {
      return false;
    }
    if (filtPlatform != "" && game.platform != filtPlatform) {
      return false;
    }
    if (filtReleaseYear != "") {
      if (filtReleaseYear == "1970s & earlier" && game.year > 1979) {
        return false;
      } else if (filtReleaseYear == "1980s" && game.year < 1980) {
        return false;
      } else if (filtReleaseYear == "1980s" && game.year > 1989) {
        return false;
      } else if (filtReleaseYear == "1990s" && game.year < 1990) {
        return false;
      } else if (filtReleaseYear == "1990s" && game.year > 1999) {
        return false;
      } else if (filtReleaseYear == "2000s" && game.year < 2000) {
        return false;
      } else if (filtReleaseYear == "2000s" && game.year > 2009) {
        return false;
      } else if (filtReleaseYear == "2010s" && game.year < 2010) {
        return false;
      } else if (filtReleaseYear == "2010s" && game.year > 2019) {
        return false;
      } else if (filtReleaseYear == "2020s" && game.year < 2020) {
        return false;
      }
    }
    if (filtGenre != "" && game.genre != filtGenre) {
      return false;
    }
    if (filtRating != "" && game.rating != filtRating) {
      return false;
    }
    return true;
  });

  filtArray.sort((gameA, gameB) => {
    let result = 0;
    if (sortParam == "title") {
      result = gameA.title.localeCompare(gameB.title);
    } else if (sortParam == "platform") {
      result = gameA.platform.localeCompare(gameB.platform);
    } else if (sortParam == "year") {
      result = gameA.year - gameB.year;
    } else if (sortParam == "genre") {
      result = gameA.genre.localeCompare(gameB.genre);
    } else if (sortParam == "rating") {
      result = gameA.rating.localeCompare(gameB.rating);
    }
    if (sortDir == "dsc") {
      return result * -1;
    } else {
      return result;
    }
  });

  return (
    <>
      <br />
      <br />
      <main className="Main">
        <section className="Main-filter">
          <span className="Main-filter-text">Filters:</span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return;
            }}
          >
            <input
              onChange={(e) => {
                setFiltTitle(e.target.value);
              }}
              defaultValue="Title"
              className="Main-filter-titles"
              id="titles"
              name="titles"
            />
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return;
            }}
          >
            <select
              onChange={(e) => {
                setfiltPlatform(e.target.value);
              }}
              className="Main-filter-platforms"
              id="platforms"
              name="platforms"
            >
              <option selected disabled hidden>
                Platform
              </option>
              <option></option>
              {props.platformsArray.map((platform) => (
                <option>{platform}</option>
              ))}
            </select>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return;
            }}
          >
            <select
              className="Main-filter-years"
              id="years"
              name="years"
              onChange={(e) => {
                setfiltReleaseYear(e.target.value);
              }}
            >
              <option selected disabled hidden>
                Release Year
              </option>
              <option></option>
              <option>2020s</option>
              <option>2010s</option>
              <option>2000s</option>
              <option>1990s</option>
              <option>1980s</option>
              <option>1970s & earlier</option>
            </select>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return;
            }}
          >
            <select
              className="Main-filter-genres"
              id="genres"
              name="genres"
              onChange={(e) => {
                setfiltGenre(e.target.value);
              }}
            >
              <option selected disabled hidden>
                Genre
              </option>
              <option></option>
              {props.genresArray.map((genre) => (
                <option>{genre}</option>
              ))}
            </select>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return;
            }}
          >
            <select
              className="Main-filter-ratings"
              id="ratings"
              name="ratings"
              onChange={(e) => {
                setfiltRating(e.target.value);
              }}
            >
              <option selected disabled hidden>
                My Rating
              </option>
              <option></option>
              <option>Love It</option>
              <option>Like It</option>
              <option>Meh</option>
              <option>No Rating</option>
            </select>
          </form>
        </section>
        <br />
        <br />
        <section className="Main-table">
          <section className="Main-table-header">
            <div className="Main-table-header-images"></div>
            <div
              className="Main-table-header-titles"
              onClick={() => {
                if (sortParam != "title") {
                  setSortDir("asc");
                } else if (sortParam == "title" && sortDir == "asc") {
                  setSortDir("dsc");
                } else if (sortParam == "title" && sortDir == "dsc") {
                  setSortDir("asc");
                }
                setSortParam("title");
              }}
            >
              Title{filtTitle != "" ? "⏚" : ""}{" "}
              {sortDir == "" || sortParam != "title"
                ? ""
                : sortDir == "asc"
                ? "▼"
                : "▲"}
            </div>
            <div
              className="Main-table-header-platforms"
              onClick={() => {
                if (sortParam != "platform") {
                  setSortDir("asc");
                } else if (sortParam == "platform" && sortDir == "asc") {
                  setSortDir("dsc");
                } else if (sortParam == "platform" && sortDir == "dsc") {
                  setSortDir("asc");
                }
                setSortParam("platform");
              }}
            >
              Platform {filtPlatform != "" ? "⏚" : ""}{" "}
              {sortDir == "" || sortParam != "platform"
                ? ""
                : sortDir == "asc"
                ? "▼"
                : "▲"}
            </div>
            <div
              className="Main-table-header-years"
              onClick={() => {
                if (sortParam != "year") {
                  setSortDir("asc");
                } else if (sortParam == "year" && sortDir == "asc") {
                  setSortDir("dsc");
                } else if (sortParam == "year" && sortDir == "dsc") {
                  setSortDir("asc");
                }
                setSortParam("year");
              }}
            >
              Release Year{filtReleaseYear != "" ? "⏚" : ""}
              {sortDir == "" || sortParam != "year"
                ? ""
                : sortDir == "asc"
                ? "▼"
                : "▲"}
            </div>
            <div
              className="Main-table-header-genres"
              onClick={() => {
                if (sortParam != "genre") {
                  setSortDir("asc");
                } else if (sortParam == "genre" && sortDir == "asc") {
                  setSortDir("dsc");
                } else if (sortParam == "genre" && sortDir == "dsc") {
                  setSortDir("asc");
                }
                setSortParam("genre");
              }}
            >
              Genre{filtGenre != "" ? "⏚" : ""}
              {sortDir == "" || sortParam != "genre"
                ? ""
                : sortDir == "asc"
                ? "▼"
                : "▲"}
            </div>
            <div
              className="Main-table-header-rating"
              onClick={() => {
                if (sortParam != "rating") {
                  setSortDir("asc");
                } else if (sortParam == "rating" && sortDir == "asc") {
                  setSortDir("dsc");
                } else if (sortParam == "rating" && sortDir == "dsc") {
                  setSortDir("asc");
                }
                setSortParam("rating");
              }}
            >
              My Rating{filtRating != "" ? "⏚" : ""}
              {sortDir == "" || sortParam != "rating"
                ? ""
                : sortDir == "asc"
                ? "▼"
                : "▲"}
            </div>
          </section>
          <section className="Main-table-body">
            {filtArray.map((game) => (
              <section className="Main-table-row">
                <GameRow key={game.id} game={game} />
              </section>
            ))}
          </section>
        </section>
      </main>
      <br />
      <br />
    </>
  );
}

export default Main;
