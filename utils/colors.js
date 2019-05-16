// export const randomColor = () => '#'+Math.floor(Math.random()*16777215).toString(16);

export const randomColor = () => 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 150)) + ',' + (Math.floor(Math.random() * 150)) + '1 )';

export const randomLogo = () => ('../img/coverDeck' + Math.floor(Math.random() * 6) + '.png');

export const randomImage = () => {
    let number = Math.floor(Math.random() * 6)
    switch(number) {
        case 0:
            return require('../img/coverDeck0.png');
        case 1:
            return require('../img/coverDeck1.png');
        case 2:
            return require('../img/coverDeck2.png');
        case 3:
            return require('../img/coverDeck3.png');
        case 4:
            return require('../img/coverDeck4.png');
        case 5:
            return require('../img/coverDeck5.png');
        case 6:
            return require('../img/coverDeck6.png');
        default:
            return require('../img/coverDeck0.png');
    }
} 