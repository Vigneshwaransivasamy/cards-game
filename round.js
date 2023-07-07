import Player from "./player.js";
import Card from './card.js';
import readline from 'readline-sync';

export default class RoundController {
  constructor() {
    this.largest = {
      player: null,
      card: null,
    };
    this.suit = null;
    this.cards = [];
    this.currentCard = null;
    this.currentPlayer = null;
  }

  /**
   * 
   * @param {Card} card 
   */
  addToRound(card) {
    this.cards.push(card);
  }

  /**
   * 
   * @returns {Array<Card>}
   */
  getCardsInPlay() {
    return this.cards;
  }

  /**
   * 
   * @param {{player: Player, card: Card}} param0 
   */
  setLargest({ player, card }) {
    this.largest = { player, card };
  }

  getPlayerWithLargestCard() {
    return this.largest.player;
  }

  getLargestCard() {
    return this.largest.card;
  }

  setSuit(suit) {
    this.suit = suit;
  }

  getSuit() {
    return this.suit;
  }

  /**
   *
   * @param {Player} player
   * @param {Card} card
   * @returns
   */
  handleMove(player, card) {
    // console.log(`${player.name} played ${card.suit} ${card.value}`, this.suitInPlay);
    // Perform actions or logic based on the player's move and the card played

    this.currentPlayer = player;
    this.currentCard = card;

    const cardsInPlay = this.getCardsInPlay();
    // No card in play
    if (cardsInPlay.length === 0) {
      this.handFirstMove();
      return false;
    }

    // Check is not a hit
    if (this.suit === card.suit) {
      this.addToRound(card);
      this.checkForLargestAndUpdate(card, player);
      return false;
    }

    this.handleHit(player, card);
    return true;
  }

  /**
   * 
   * @param {Player} players 
   */
  startRound(players) {
    // Play the game round by round until one player is havind cards in hand
    players.some((player) => {
      // Get a card from the player
      
      let card;

      if (player.isUser) {
        const group = player.groupCards();
        const filterdBySuitCards = group.filter(
          (card) => card.suit === this.suit
        );
        const groupCards =
          filterdBySuitCards.length > 0 ? filterdBySuitCards : group;
        console.log("Cards in Hand ===>");
        console.log(
          player.groupCards().map((card) => `${card.suit} ${card.value}`)
        );
        console.log("Cards in Play ===>");
        console.log(
          this.cards.map((card) => `${card.suit} ${card.value}`)
        );
        console.log("Cards to Select ===>");
        const index = readline.keyInSelect(
          groupCards.map((card) => `${card.suit} ${card.value}`),
          `Enter a card to play: `
        );
        card = groupCards[index];
        player.releaseCard(card);
      } else {
        card = player.makeMove(this.suit);
      }

      console.log(`Round for player: ${player.name} => ${card.suit} ${card.value}`);

      // Handle the player's move or action based on the card
      // (You can define your specific game rules here)
      const isHit = this.handleMove(player, card);

      if (!isHit) {
        return false;
      }


      this.roundReset();
      return true;
    });

    console.log("cycle over", this.largest?.player?.name);
    this.roundReset();
  }

  handFirstMove() {
    this.addToRound(this.currentCard);
    this.setSuit(this.currentCard.suit);
    this.setLargest({ player: this.currentPlayer, card: this.currentCard });
  }

  handleHit() {
    const player = this.getPlayerWithLargestCard();
    this.addToRound(this.currentCard);
    player.collectCards([...this.getCardsInPlay()]);
    console.log(
      `player ${this.largest.player.name} got hit by ${this.currentPlayer.name} with ${this.currentCard.suit} ${this.currentCard.value}`
    );
  }

  checkForLargestAndUpdate(card, player) {
    const largestCard = this.getLargestCard();

    if (!card.isGreaterThan(largestCard)) {
      return;
    }

    this.setLargest({ player, card });
  }

  roundReset() {
    this.cards = [];
    this.suit = null;
    this.currentCard = null;
    this.currentPlayer = null;
  }
}
