$(document).ready(function() {
	
});

var gameboard = (function() {

	var initialize = function(rows, cols) {
		for(var x = 0; x < rows; x++) {
        		for(var y = 0; y < cols; y++) {
            		var unit = $("<div class='unit'></div>");
            		unit.appendTo('#gameboard');
        		}
    		}
    	addId();
    	gatherMines();
	};

	var addId = function() {
    		var id = 1;
			$('.unit').each(function() {
				$(this).attr('id', id);
				id++;
			});
		}

	var gatherMines = function() {
		var arr = []
		while(arr.length < 9){
    		var mines = $('.unit');
    		arr.push(mines[Math.floor(Math.random()*mines.length)])
		}
		dropMines(arr);
	}

	var dropMines = function(array) {
  		$.each( array, function( arrayIndex, arrayValue ) {
  				$(this).addClass("mine");
  				 console.log($(this));	
  			});
	}
	

	return {
		initialize: initialize
	};

}());

var gamePlay = (function() {

	

}());

gameboard.initialize(9, 9);