import Player from './player.js';
import Deck from './deck.js';
import RoundController from './round.js';

export class Game {
  constructor(userPlayerName) {
    this.deck = new Deck();
    this.players = [];
    this.winners = [];
    this.roundController = new RoundController();

    // Create player instances
    const computerPlayers = ["Computer 1", "Computer 2", "Computer 3"];
    this.players.push(...computerPlayers.map(name => new Player(name, false)));
    this.userPlayer = new Player(userPlayerName, true);
    this.players.push(this.userPlayer);
    
  }

  findPlayerWithCard(card) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].hasCard(card)) {
        return this.players[i];
      }
    }
    return null;
  }

  getPlayersInOrder() {
    const currentPlayerIndex = this.players.indexOf(this.roundController.getPlayerWithLargestCard());
    const playersOrder = [...this.players.slice(currentPlayerIndex), ...this.players.slice(0, currentPlayerIndex)].filter(p => p !== null);
    return playersOrder;
  }

  play() {
    // Shuffle the deck
    this.deck.shuffle();

    // Distribute cards to players
    this.distribute();

    this.roundController.startRound(this.players);

    while(!this.isGameOver()) {
      const playersInOrder = this.getPlayersInOrder();
      console.log('newLoop', playersInOrder.map(p => p.name));
      this.roundController.startRound(playersInOrder);
      this.removeWinnersFromRound();
    }

    // The game ended because the deck is empty
    this.endGame();
  }

  removeWinnersFromRound() {
    const playersWithoutCards = this.players.filter(player => player.cards.length === 0);

    this.players = this.players.filter(player => player.cards.length !== 0);

    if(playersWithoutCards.length > 0) {
      this.winners.push(...playersWithoutCards);
      playersWithoutCards.forEach(player => {
        console.log(`Congratulations ${player.name} you won!!!`);
      })
    }
  }

  isGameOver() {
    // Check if the game is over based on specific conditions
    // (Implement your game-specific end game conditions here)

    const playersWithCards = this.players.filter(player => player.cards.length > 0);

    if(playersWithCards.length === 1) {
      console.log(`You are the Donkey ${this.players[0].name}! Better luck next time`);
      return true;
    }
    return false; // Modify this according to your game's rules
  }

  endGame() {
    // Perform any necessary actions to end the game
    // (Implement your game-specific end game actions here)
    console.log("Game over");
  }

  delay(duration) {
    new Promise((resolve, reject) => setTimeout(resolve, duration));
  }

  distribute() {
    const numCardsPerPlayer = Math.floor(this.deck.cards.length / this.players.length);
    let remainingCards = this.deck.cards.length;

    for (let player of this.players) {
      for (let i = 0; i < numCardsPerPlayer; i++) {
        const card = this.deck.draw();
        player.collectCard(card);
        remainingCards--;
      }
    }

    // Distribute remaining cards to players if any
    while (remainingCards > 0) {
      const player = this.players[Math.floor(Math.random() * this.players.length)];
      const card = this.deck.draw();
      player.collectCard(card);
      remainingCards--;
    }
  }
}