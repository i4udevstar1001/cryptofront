import _ from "lodash";

const suits = Object.freeze(['♦', '♣', '♠', '♥'])
const values = Object.freeze(['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'])

export function generateCards(){
    const cards = []
    for(let x = 0; x < suits.length; x++){
        for(let y = 0; y < values.length; y++){
            cards.push({name: suits[x], value: values[y]})
        }
    }
    return shuffle(cards)
}

export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// function deepFreeze(object) {
//     if (typeof object !== "object") {
//       return object;
//     }
//     Object.freeze(object);
  
//     Object.values(object).forEach(value => deepFreeze(value));
  
//     return object;
// }

const maxInARow = weights =>
  _.chain(weights)
    .sortBy()
    .uniq()
    .map((num, i) => num - i)
    .groupBy()
    .orderBy("length")
    .last()
    .value().length;

// const Cards = deepFreeze(
//     Object.entries(values).reduce(
//       (cards, [weight, rank]) => [
//         ...cards,
//         ...suits.map(suit => ({ rank, suit, weight }))
//       ],
//       []
//     )
// );

export class RateableCards {
    constructor(cards) {
      this.ranks = _.groupBy(cards, "rank");
      this.suits = _.groupBy(cards, "suit");
      this.rankTimes = _.groupBy(this.ranks, "length");
      this.suitTimes = _.groupBy(this.suits, "length");
      this.maxInARow = maxInARow(cards.map(({ weight }) => weight));
    }
  
    getOfSameRank(n) {
      return this.rankTimes[n] || [];
    }
  
    getOfSameSuit(n) {
      return this.suitTimes[n] || [];
    }
  
    hasAce() {
      return !!this.ranks["A"];
    }
  
    hasOfSameRank(n) {
      return this.getOfSameRank(n).length;
    }
  
    hasOfSameSuit(n) {
      return this.getOfSameSuit(n).length;
    }
  
    hasInARow(n) {
      return this.maxInARow >= n;
    }
  
    getWorstSingles() {
      return _.chain(this.getOfSameRank(1))
        .flatten()
        .sortBy("weight")
        .value();
    }
}

//
// Poker Ratings
//
const PokerRating = {
    RoyalFlush: hand =>
      hand.hasInARow(5) && hand.hasOfSameSuit(5) && hand.hasAce(),
    StraightFlush: hand => hand.hasInARow(5) && hand.hasOfSameSuit(5),
    FourOfAKind: hand => hand.hasOfSameRank(4),
    FullHouse: hand => hand.hasOfSameRank(3) && hand.hasOfSameRank(2),
    Flush: hand => hand.hasOfSameSuit(5),
    Straight: hand => hand.hasInARow(5),
    ThreeOfAKind: hand => hand.hasOfSameRank(3),
    TwoPair: hand => hand.hasOfSameRank(2) >= 2,
    OnePair: hand => hand.hasOfSameRank(2),
    HighCard: hand => hand.hasOfSameRank(1) >= 5
};
  
export const PokerHandRate = cards =>
    Object.entries(PokerRating).find(([, is]) => is(cards))[0];
  