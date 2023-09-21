const formatGame = (game) => {
  game.name = Array.isArray(game.name)
    ? game.name.filter((n) => n.primary)[0]._text
    : game.name;
  if (!Array.isArray(game.boardgamemechanic)) {
    game.boardgamemechanic = [{ _text: game.boardgamemechanic }];
  }
  if (!Array.isArray(game.boardgamecategory)) {
    game.boardgamecategory = [{ _text: game.boardgamecategory }];
  }

  game.publishers = Array.isArray(game.boardgamepublisher)
    ? game.boardgamepublisher.map((p) => p._text)
    : [game.boardgamepublisher];

  game.boardgameartist
    ? (game.artists = Array.isArray(game.boardgameartist)
        ? game.boardgameartist.map((a) => a._text)
        : [game.boardgameartist])
    : -1;

  delete game.boardgamepublisher;
  delete game.boardgameartist;
};

module.exports = formatGame;
