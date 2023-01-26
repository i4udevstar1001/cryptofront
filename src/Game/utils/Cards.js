export function generateCards(){
    const types = ['♣', '♦ ', '♥', '♠']
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

    const cards = []
    for(let x = 0; x < types.length; x++){
        for(let y = 0; y < values.length; y++){
            cards.push({name: types[x], value: values[y]})
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
