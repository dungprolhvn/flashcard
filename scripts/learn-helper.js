export function reviewCard(card, rating) {
    console.log(`review card called with rating ${rating}`);
    // rating will be from 0 to 3
    switch (rating) {
        case 3: // Easy
            console.log('Case 3: Easy');
            if (card.repetitions === 0) {
                card.interval = 1;
            } else if (card.repetitions === 1) {
                card.interval = 6;
            } else {
                card.interval *= card.ease;
            }
            card.repetitions += 1;
            card.ease += 0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02);
            if (card.ease < 1.3) {
                card.ease = 1.3;
            }
            break;
        case 2: // Good
            console.log('Case 2: Good');
            if (card.repetitions === 0) {
                card.interval = 1;
            } else if (card.repetitions === 1) {
                card.interval = 6;
            } else {
                card.interval *= card.ease * 0.9;
            }
            card.repetitions += 1;
            card.ease += 0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02);
            if (card.ease < 1.3) {
                card.ease = 1.3;
            }
            break;
        case 1: // Hard
            console.log('Case 1: Hard');
            card.repetitions = 0;
            card.interval = 1;
            card.ease -= 0.2;
            if (card.ease < 1.3) {
                card.ease = 1.3;
            }
            break;
        case 0: // Again
            console.log('Case 0: Again')
            card.repetitions = 0;
            card.interval = 0;
    }   
    // Update due date based on interval
    card.dueDate = new Date();
    card.dueDate.setDate(card.dueDate.getDate() + card.interval);
    card.dueDate = card.dueDate.toISOString();
}


export function getDueCards(cards) {
    console.log('get due card called');
    const today = new Date();
    return cards.filter(card => {
        const dueDate = new Date(card.dueDate);
        return dueDate <= today;
    });
}


