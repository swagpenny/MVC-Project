//api source: https://rapidapi.com/omgvamp/api/hearthstone?endpoint=5525c4a8e4b01d538895c588

/* testing purpose
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
		"x-rapidapi-key": "6495acf76amshac6bdaf8e37a619p10fdbcjsne8b097b601cf"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});
*/


var cards;
var dataPromise;

function getCardData() {
  if(!dataPromise){
    dataPromise = $.ajax({ // Store jQuery promise so that we can return it for subsequent calls ensuring only one AJAX request is made
      url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards',
      method: 'GET',
      dataType: 'json',
      "headers": {
		"x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
		"x-rapidapi-key": "6495acf76amshac6bdaf8e37a619p10fdbcjsne8b097b601cf"
	}
    });
  } 
  return dataPromise;
}

function showCardRandom(){
  var cardNo = Math.floor(Math.random() * cards.length); // Select a random card number
  showCard(cardNo);
}

function showCard(cardNo){
  var obj = cards[cardNo];
  $("#card-image").attr('src', obj.img);
  $("#card-name").html(obj.name);
  $("#card-type").text(obj.type);
  $("#card-faction").text(obj.faction);
  $("#card-rarity").text(obj.rarity);
  $("#player-class").text(obj.playerClass);
  $("#artist-name").text(obj.artist);
}

function flattenCards(data){
    // Flatten the object as cards are stored in sets
    var result = [];
    for (var set in data) {
      for (var i = 0; i < data[set].length; i++) {
        result.push(data[set][i]);
      }
    }
    return result;
}

getCardData(); // Start loading card data ASAP - subsequent calls will return the same promise anyway

$(document).ready(function() {
  getCardData()
    .done(function(data){
       $("#nextCard").text("Next");
       cards = flattenCards(data);
       showCardRandom();
    });
  $('#nextCard').click(showCardRandom);
});