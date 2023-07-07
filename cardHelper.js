export class CardHelper {
  /**
   *
   * @param {Array<Card>} cards
   * @returns
   */
  static getCardWithLargestNumber(cards) {
    return cards.reduce((prevCard, currCard) => {
      return currCard.isGreaterThan(prevCard) ? currCard : prevCard;
    });
  }
}
