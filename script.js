const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// const cardsData = [
// 	{
// 		question: 'What must a variable begin with?',
// 		answer: 'A letter, $ or _'
// 	},
// 	{
// 		question: 'What is a variable?',
// 		answer: 'A container for a piece of data'
// 	},
// 	{
// 		question: 'Example of Case Sensitive Variable',
// 		answer: 'thisIsAVariable'
// 	}
// ];

// Create all cards
function createCards() {
	cardsData.forEach((data,index) => createCard(data,index));
}

// Create a single card in the DOM
function createCard(data, index) {
	const card = document.createElement('div');
	card.classList.add('card');

	if(index === 0){
		card.classList.add('active');
	}

	card.innerHTML = `
			<div class="inner-card">
				<div class="inner-card-front">
					${data.question}
				</div>
				<div class="inner-card-back">
					${data.answer}
				</div>
			</div>	
	`;

	// Add event listener to add show-answer class on 'Flip' button, so that the card question shows the back view with the answer
	card.addEventListener('click', () => card.classList.toggle('show-answer'));

	// Add to DOM cards
	cardsEl.push(card);

	cardsContainer.appendChild(card);

	updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
	currentEl.innerText = `
		${currentActiveCard + 1}/${cardsEl.length}
	`;
}

// Get cards from local storage
function getCardsData() {
	const cards = JSON.parse(localStorage.getItem('cards'));
	return cards === null ? [] : cards;

}

createCards();

// Event listeners

// Next button
nextBtn.addEventListener('click', () => {
	cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard +1;

	if(currentActiveCard > cardsEl.length -1){
		currentActiveCard = cardsEl.length -1;
	}

	cardsEl[currentActiveCard].className = 'card active';

	updateCurrentText();
});

// Previous button
prevBtn.addEventListener('click', () => {
	cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard -1;

	if(currentActiveCard < 0){
		currentActiveCard = 0;
	}

	cardsEl[currentActiveCard].className = 'card active';

	updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', ()=> addContainer.classList.add('show'));

// Hide add container
hideBtn.addEventListener('click', ()=> addContainer.classList.remove('show'));