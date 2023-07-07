import Card from "./card.js";

export default class Deck {
  constructor() {
    this.cards = [];
    this.suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    this.ranks = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];
    this.initialize();
  }

  initialize() {
    for (let suit of this.suits) {
      for (let value of this.ranks) {
        this.cards.push(new Card(suit, value));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw() {
    if (this.cards.length === 0) {
      throw new Error("Deck is empty");
    }
    return this.cards.pop();
  }
}
