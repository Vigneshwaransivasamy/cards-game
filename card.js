// Card class
const ValueMap = {
  Ace: 14,
  Jack: 11,
  Queen: 12,
  King: 13,
};

export default class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get actualValue() {
    const number = parseInt(this.value);
    return number ? number : ValueMap[this.value];
  }

  equals(card) {
    return this.value === card.value && this.suit === card.suit;
  }

  isGreaterThan(card) {
    return this.actualValue > card.actualValue;
  }
}
