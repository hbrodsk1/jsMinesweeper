$(document).ready(function() {
	
});

var gameboard = (function() {


	var initialize = function(rows, cols) {
			gamePlay.flagCount = rows
			for(var x = 0; x < rows; x++) {
        		for(var y = 0; y < cols; y++) {
            		var unit = $("<div class='unit'></div>");
            		unit.width(($('#gameboard').width() / cols) - 2).height(($('#gameboard').height() / rows) - 2).appendTo('#gameboard');
        		}
    		}
    	addId(rows, cols);
    	gatherMines(rows);
	};
	

	var addId = function(rows, cols) {
    		var id = 1;
			$('.unit').each(function() {
				$(this).attr('id', id);
				id++;
			});


			$('.unit').each(function() {

				if($(this).attr('id') === (rows / cols).toString()) {
					$(this).addClass("left-edge top-left-corner");
				}  
				if($(this).attr('id') === cols.toString()) {
					$(this).addClass("right-edge top-right-corner");
				} 

				if($(this).attr('id') === ((rows * cols) - (cols - 1)).toString()) {
					$(this).addClass("left-edge bottom-left-corner");
				}  
				if($(this).attr('id') === (rows * cols).toString()) {
					$(this).addClass("right-edge bottom-right-corner");
				} 
				
				if($(this).attr('id') % cols === 1) {
					$(this).addClass("left-edge");
				}  
				if($(this).attr('id') % cols === 0) {
					$(this).addClass("right-edge");
				}  
			 
				if($(this).attr('id') > 0 && $(this).attr('id') < (cols + 1)) {
					$(this).addClass("top");
				}  
				if($(this).attr('id') >= ((rows * cols) - cols) && $(this).attr('id') <= (rows * cols)) {
					$(this).addClass("bottom");
				}
			
			});
		}

	var gatherMines = function(rows) {
		var arr = [];
		while(arr.length < rows){
    		var mines = $('.unit');
    		arr.push(mines[Math.floor(Math.random()*mines.length)])
		}
		checkDuplicates(arr, rows);
	}

	var checkDuplicates = function(array, rows) {
		if($.unique(array).length < rows) {
			gatherMines(rows);
		} else {
			dropMines(array);
		}
	}

	var dropMines = function(array) {
  		$.each( array, function( arrayIndex, arrayValue ) {
  			$(this).addClass("mine");
  		});
	}
	

	return {
		initialize: initialize,
	};

}());

var gamePlay = (function() {


	var disarmedMines = 0;

	var go = function() {
		updateFlagCount();
		$('.unit').click(function() {
			if($(this).hasClass('mine')) {
				$(this).html("Mine");
         		gameOver("lose");
     		} else {
     			$(this).html(mineInfo($(this)));
     		}
    	})

    	$('.unit').contextmenu(function() {
    		if(gamePlay.flagCount > 0 && !$(this).hasClass('flagged')) {
    			$(this).addClass('flagged').html('flag');
    			gamePlay.flagCount--;
    			updateFlagCount();
    			correctGuess($(this));
    		}
    	});
	}

	var correctGuess = function(element) {
		if(element.hasClass('mine')) {
			disarmedMines++;
		}

		if(disarmedMines === 9) {
			gameOver("win");
		}
	}

	var updateFlagCount = function() {
		$('#flags').html("Flags Remaining: " + gamePlay.flagCount);
	}		
	
	var mineInfo = function(element) {
		$(element).addClass("clicked");
		var array = [];

		var elementId = Number(element.attr("id"));
		var top = elementId - 9;
		var bottom = elementId + 9;
		var before = elementId - 1;
		var after = elementId + 1;
		var topLeft = elementId - 10;
		var topRight = elementId - 8;
		var bottomLeft = elementId + 8;
		var bottomRight = elementId + 10;

		if(element.hasClass("top-left-corner")) {
			array.push($bottom = $('#' + (bottom).toString()));
			array.push($after = $('#' + (after).toString()));
			array.push($bottomRight = $('#' + (bottomRight).toString()));
		} else if(element.hasClass("top-right-corner")) {
			array.push($bottom = $('#' + (bottom).toString()));
			array.push($before = $('#' + (before).toString()));
			array.push($bottomLeft = $('#' + (bottomLeft).toString()));
		} else if(element.hasClass("bottom-left-corner")) {
			array.push($top = $('#' + (top).toString()));
			array.push($after = $('#' + (after).toString()));
			array.push($topRight = $('#' + (topRight).toString()));
		} else if(element.hasClass("bottom-right-corner")) {
			array.push($top = $('#' + (top).toString()));
			array.push($before = $('#' + (before).toString()));
			array.push($topLeft = $('#' + (topLeft).toString()));
		} else if(element.hasClass("top")) {
			array.push($bottom = $('#' + (bottom).toString()));
			array.push($before = $('#' + (before).toString()));
			array.push($after = $('#' + (after).toString()));
			array.push($bottomLeft = $('#' + (bottomLeft).toString()));
			array.push($bottomRight = $('#' + (bottomRight).toString()));
		} else if(element.hasClass("bottom")) {
			array.push($top = $('#' + (top).toString()));
			array.push($before = $('#' + (before).toString()));
			array.push($after = $('#' + (after).toString()));
			array.push($topLeft = $('#' + (topLeft).toString()));
			array.push($topRight = $('#' + (topRight).toString()));
		} else if(element.hasClass("left-edge")) {
			array.push($top = $('#' + (top).toString()));
			array.push($bottom = $('#' + (bottom).toString()));
			array.push($after = $('#' + (after).toString()));
			array.push($topRight = $('#' + (topRight).toString()));
			array.push($bottomRight = $('#' + (bottomRight).toString()));
		} else if(element.hasClass("right-edge")) {
			array.push($top = $('#' + (top).toString()));
			array.push($bottom = $('#' + (bottom).toString()));
			array.push($before = $('#' + (before).toString()));
			array.push($topLeft = $('#' + (topLeft).toString()));
			array.push($bottomLeft = $('#' + (bottomLeft).toString()));
		} else {
			array.push($top = $('#' + (top).toString()));
			array.push($bottom = $('#' + (bottom).toString()));
			array.push($before = $('#' + (before).toString()));
			array.push($after = $('#' + (after).toString()));
			array.push($topLeft = $('#' + (topLeft).toString()));
			array.push($topRight = $('#' + (topRight).toString()));
			array.push($bottomLeft = $('#' + (bottomLeft).toString()));
			array.push($bottomRight = $('#' + (bottomRight).toString()));
		}

		return mineCount(array, element);
	}
	
	var mineCount = function(array, element) {
		
		var counter = 0;
		var queue = [];

		$.each( array, function( index, value) {
			if(value.hasClass("mine")) {
				counter++;
			}
		});

		if(counter === 0) {
			$(element).html(counter);
			$.each( array, function( index, value) {
				if(!$(this).hasClass("clicked")) {
					mineInfo($(this));
				}
			});
		} else {
		$(element).html(counter);
		}
	}

	var gameOver = function(status) {
		$('.unit').off('click');
		if(status === "win") {
			$('.mine').html("mine").css("background-color", "green");
			alert("you successfully cleared all mines");
		} else if(status === "lose") {
			$('.mine').html("mine").css("background-color", "red");
		}

		$('.restart').show().click(function() {
			$('.unit').remove();
			$('.mine').remove();
			$('.restart').hide();
			gamePlay.flagCount = 0;
			disarmedMines = 0;

			gameboard.initialize(9, 9);
			go();
		});
		
	}

	return {
		go: go,
	};

}());
gameboard.initialize(15, 15);
gamePlay.go();