const express = require("express");
const routes = express.Router();
const { v4: uuidv4 } = require("uuid");

//Função para gerar o player inicial
function getInitialPlayer() {
  var caracteres = ["X", "O"];
  return caracteres[Math.floor(Math.random() * caracteres.length)];
}

//Função para determinar o vencedor
function winner(position) {
  if (
    position[0][2] == position[1][2] &&
    position[1][2] == position[2][2] &&
    position[0][2] != ""
  )
    return 1;
  else if (
    position[0][1] == position[1][1] &&
    position[1][1] == position[2][1] &&
    position[0][1] != ""
  )
    return 1;
  else if (
    position[0][0] == position[1][0] &&
    position[1][0] == position[2][0] &&
    position[0][0] != ""
  )
    return 1;
  else if (
    position[0][2] == position[0][1] &&
    position[0][1] == position[0][0] &&
    position[0][2] != ""
  )
    return 1;
  else if (
    position[1][2] == position[1][1] &&
    position[1][1] == position[1][0] &&
    position[1][2] != ""
  )
    return 1;
  else if (
    position[2][2] == position[2][1] &&
    position[2][1] == position[2][0] &&
    position[2][2] != ""
  )
    return 1;
  else if (
    position[0][2] == position[1][1] &&
    position[1][1] == position[2][0] &&
    position[0][2] != ""
  )
    return 1;
  else if (
    position[2][2] == position[1][1] &&
    position[1][1] == position[0][0] &&
    position[2][2] != ""
  )
    return 1;
  else return 0;
}

//Classe do jogo
function Game(id, player) {
  this.id = id;
  this.player = player;
  this.position = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  this.remainingMovements = 9;
}

var games = [];

//Criar uma nova partida e retornar o id da partida criada e o jogador inicial dela.
routes.post("/game", (req, res) => {
  newGame = new Game(uuidv4(), getInitialPlayer());
  games.push(newGame);
  return res.json({
    id: newGame.id,
    firstPlayer: newGame.player,
  });
});

//Realiza o movimento de cada jogador.
routes.post("/game/:id/movement", (req, res) => {
  for (i = 0; i < games.length; i++) {
    //Verifica se o ID inserido existe
    if (games[i].id == req.params.id) {
      //Verifica se é o turno do player inserido
      if (games[i].player == req.body.player) {
        //Verifica se a posição inserida existe
        if (games[i].position[req.body.position.x] == undefined || games[i].position[req.body.position.y] === undefined)
          return res.json({ msg: "Posição inválida" });
        //Verifica se a posição inserida está ocupada
        if (games[i].position[req.body.position.x][req.body.position.y] == "") {
          //Realiza o movimento do player
          games[i].position[req.body.position.x][req.body.position.y] =
            games[i].player;
          //Verifica se, após a jogada realizada, o jogo possui um vencedor
          if (winner(games[i].position) == 1) {
            if (games[i].player == "X") {
              games.splice(i, 1);
              return res.json({
                msg: "Partida finalizada",
                winner: "X",
              });
            } else {
              games.splice(i, 1);
              return res.json({
                msg: "Partida finalizada",
                winner: "O",
              });
            }
          }

          //Verifica se houve empate
          if (--games[i].remainingMovements == 0) {
            games.splice(i, 1);
            return res.json({
              status: "Partida finalizada",
              winner: "Draw",
            });
          }

          //Muda o turno do player
          games[i].player = games[i].player == "X" ? "O" : "X";
          return res.status(200).send();
        }
        return res.json({ msg: "Posição ocupada" });
      }
      return res.json({ msg: "Não é turno do jogador" });
    }
  }
  return res.json({ msg: "Partida não encontrada" });
});

module.exports = routes;
