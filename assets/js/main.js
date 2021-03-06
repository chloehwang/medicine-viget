const inViewport = require('in-viewport');


//HELPER FUNCTIONS
const selectElements = function (selector) {
  let nodes = document.querySelectorAll(selector)
  return [].slice.call(nodes)
};

const triggerAnimation = function(bubble) {
  const delay = Number(bubble.dataset.delay);

  setTimeout(function(){
    bubble.className += " typing";
  }, delay)
}

const animateWhenVisible = function (card) {
  //get card's classes so it can be used as a querying string
  const cardSelector = card.className.split(" ").join(".");

  //find all chat bubbles inside card
  const chatList = selectElements(`.${cardSelector} .bubble`);

  //trigger animation for each bubble
  chatList.forEach(bubble => triggerAnimation(bubble))

  //find and animate the header icon associated with each card
  document.querySelector(`.${cardSelector} .conversation__icon`).className += " animate";
};


//FIND ALL CONVO CARDS
const convoCards = selectElements('.conversation');

//FOR EACH CARD, define inViewport callback function
convoCards.forEach(card => inViewport(card, { offset: -200 }, () => animateWhenVisible(card)))









/*
***BELOW IS MY EXPERIMENTATION WITH LODASH DEBOUNCE***

//Animating chat bubbles on conversation cards:

const getElementHeight = function (convo) {
  return (convo.offsetHeight + convo.offsetTop) / 1.03
};

//find all convo cards and map an array of their heights
const convoCards = document.getElementsByClassName('conversation');
const convoCardDimensions = [].slice.call(convoCards).map(convo => [convo, getElementHeight(convo)]);


//scroll listener w/ debounced function
window.addEventListener('scroll', _.debounce(function(){

  //find bottom of window
  const windowBottom = window.innerHeight + window.scrollY;

  //loop through convo cards and check if it has come into view
  [].slice.call(convoCardDimensions).forEach(convo => {
    const card = convo[0];
    const cardBottom = convo[1];

    if (windowBottom > cardBottom && !card.className.includes('finished')) {
      //add 'current' class to card to indicate that this is the convo card currently in motion. add 'finished' class to indicate that animation has been applied.
      card.className += " current finished";

      //find all chat bubbles inside the current convo card
      let chatList = document.querySelectorAll(`.current .bubble`);

      //for each bubble, apply animation delay as indicated by element's data-delay attribute
      [].slice.call(chatList).forEach(text => {
        text.style.animationDelay = `${text.dataset.delay}ms`;
        text.style.animationPlayState = 'running';

        //adding 'finished' class will cause bubble's spinner to hide and bubble's text to appear
        setTimeout(function(){
          text.className += " finished";
        }, `${1000 + Number(text.dataset.delay)}`)
      })

      //find and animate the header icon associated with each card
      document.querySelector(`.current .conversation__icon`).className += " animate";

      //remove 'current' class from convo card because animation was successfully triggered
      card.classList.remove("current");
    }
  })
}, 100))



 */
