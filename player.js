import { CardHelper } from "./cardHelper.js";
import { getRandomNumber } from './utils.js';

// Player class
export default class Player {
  /**
   * 
   * @param {string} name 
   * @param {boolean} isUser 
   * @property {Array<Card>} Player.cards
   */
  constructor(name, isUser) {
    this.name = name;
    this.cards = [];
    this.isUser = isUser;
    this.gotHit = false;
  }

  releaseCard(release) {
    this.cards = this.cards.filter(card => !card.equals(release));
  }

  setGotHit(value) {
    this.gotHit = value;
  }

  groupCards() {
    return [...this.cards].sort((a, b) => {
      return b.actualValue - a.actualValue;
    });
  }

  collectCard(card) {
    this.cards.push(card);
  }

  collectCards(cards) {
    this.cards.push(...cards);
  }

  hasCard(card) {
    return this.cards.some((c) => c.equals(card));
  }

  makeMove(currentSuit) {
    const cardsInCurrentSuite = this.cards.filter(
      (card) => card.suit === currentSuit
    );

    if (cardsInCurrentSuite.length > 0) {
      const cardWithLargestNumber = CardHelper.getCardWithLargestNumber(cardsInCurrentSuite);
      this.releaseCard(cardWithLargestNumber);
      return cardWithLargestNumber;
    }

    const randomCard = this.cards[getRandomNumber(0, this.cards.length)];
    this.releaseCard(randomCard);

    return randomCard;
  }
}
