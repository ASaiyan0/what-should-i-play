export class Game {
  constructor(
    gameID,
    gameImage,
    gameTitle,
    gamePlatform,
    gameReleaseDate,
    gameGenre
  ) {
    this.ID = gameID;
    this.image = gameImage;
    this.title = gameTitle;
    this.platform =
      gamePlatform.slice(0, 2) == "JP" ? gamePlatform.slice(3) : gamePlatform;
    this.year = gameReleaseDate ? gameReleaseDate.substring(0, 4) : "";
    this.genre = gameGenre;
    this.rating = "No Rating";
  }
}
