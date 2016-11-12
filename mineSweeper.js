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

	var flagCount = 9;

	var go = function() {
		updateFlagCount();
		$('.unit').click(function() {
			if($(this).hasClass('mine')) {
				$(this).html("Mine");
         		gameOver();
     		} else {
     			$(this).html(mineInfo($(this)));
     		}
    	})

    	$('.unit').contextmenu(function() {
    		if(flagCount > 0 && !$(this).hasClass('flagged')) {
    			$(this).addClass('flagged').html('flag');
    			flagCount--;
    			updateFlagCount();
    		}
    	});
	}

	var updateFlagCount = function() {
		$('#flags').html("Flags Remaining: " + flagCount);
	}		
	
	var mineInfo = function(element) {

		var array = [];

		var elementId = Number(element.attr("id"));
		var top = elementId - 9;
		var bottom = elementId + 9;
		var before = elementId - 1;
		var after = elementId + 1;

		array.push($top = $('#' + (top).toString()));
		array.push($bottom = $('#' + (bottom).toString()));
		array.push($before = $('#' + (before).toString()));
		array.push($after = $('#' + (after).toString())); 

		return mineCount(array);
	}

	var mineCount = function(array) {
		var counter = 0;

		$.each( array, function( index, value) {
			if(value.hasClass("mine")) {
				counter++;
			}
		});
		return counter;
	}

	var gameOver = function() {
		$('.mine').html("mine").css("background-color", "red");
		$('.restart').show().click(function() {
			$('.unit').remove();
			$('.mine').remove();
			$('.restart').hide();

			gameboard.initialize(9, 9);
			go();
		});
		
	}

	return {
		go: go,
	};

}());

gameboard.initialize(9, 9);
gamePlay.go();