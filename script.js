async function getDeal() {
  const response = await fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15");
  const deal = await response.json();
  console.log(deal[0]);
  

  // displayData(deal[0]);

  for (let item = 0; item < deal.length; item++) {
    const element = deal[item];
    displayData(element);
  }
  
}

function createCardElement() {
  const mainElement = document.querySelector("main");
  const dealCard = document.createElement("div");
  const image = document.createElement("img");
  const title = document.createElement("h2");
  const originalPrice = document.createElement("h3");
  const salePrice = document.createElement("h3");
  const steamRatingText = document.createElement("h3");
  const steamLink = document.createElement("a"); 

  return {mainElement, dealCard, image, title, originalPrice, salePrice, steamRatingText, steamLink}
}

function addClassesToElements(elements) {
  elements.dealCard.classList.add("deal-card");
  elements.image.classList.add("image");
  elements.title.classList.add("title");
  elements.originalPrice.classList.add("original-price");
  elements.salePrice.classList.add("sale-price");
  elements.steamRatingText.classList.add("steam-rating-text");
  elements.steamLink.classList.add("steam-link");
}

function setImageSrc(img, src) {
  img.src = src;
}

function setTextOfElements(elements, deal) {
  elements.title.textContent = deal.title;
  elements.originalPrice.textContent = `Original Price €${deal.normalPrice}`;
  elements.salePrice.textContent = `Sale Price €${deal.salePrice}`;
  elements.steamRatingText.textContent = `Rating : ${deal.steamRatingText}`;
  elements.steamLink.textContent = "Steam Store";
}

function setLinkhref(link, gameLinkText) {
  link.href = gameLinkText;
  link.target="_blank";
}

function pushElementsToDOM(elements) {
  elements.dealCard.append(elements.image, elements.title, elements.originalPrice, elements.salePrice, elements.steamRatingText, elements.steamLink)
  elements.mainElement.appendChild(elements.dealCard)
}

function displayData (deal) {

  const gameLinkText = createLinkForSteam(deal.steamAppID, deal.metacriticLink);
  
  const elements = createCardElement();


  addClassesToElements(elements);
  setImageSrc(elements.image, deal.thumb);
  setTextOfElements(elements, deal);
  setLinkhref(elements.steamLink, gameLinkText)

  
  checkIfDealUnder5Euro(deal.salePrice, elements.salePrice);
  checkRating(deal.steamRatingText, elements.steamRatingText, elements.dealCard);


  pushElementsToDOM(elements)
}

function checkIfDealUnder5Euro(price, element) {
  if (parseFloat(price) < 5)  element.classList.add("underFiveEuro");
};

function checkRating(rating, element, dealCard) {

  switch (rating.toLowerCase()) {
    case "mixed":
      dealCard.classList.add("rating-mixed")
      break;
    case "mostly positive":
      dealCard.classList.add("rating-mostly-positive")
      break;
    case "positive":
      dealCard.classList.add("rating-positive")
      break;
    case "very positive":
      dealCard.classList.add("rating-very-positive")
      break;
    case "overwhelmingly positive":
      dealCard.classList.add("rating-overwhelmingly-positive")
      break;
  
    default:
      break;
  }
};




function createLinkForSteam(steamAppID, metacriticLink) {

  let = gameNameLink = metacriticLink.replaceAll("-", "_");
  gameNameLink = gameNameLink.slice(6); // removes "/game/";

  let gameLink = `https://store.steampowered.com/app/${steamAppID}/${gameNameLink}`;

  return gameLink;
}

getDeal();

