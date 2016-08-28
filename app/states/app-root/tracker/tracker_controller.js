'use strict';

/* global angular */

(function() {
	var tracker = angular.module('tracker');

	tracker.controller('TrackerController', function($scope) {
		$scope.subState = 'tracker';
	});

	function addTrade(){
		var trade = document.createElement('li');
		$(trade).addClass('trade');

		var tradeHeader = document.createElement('ul');
		$(tradeHeader).addClass('header').append('<li class="trade-total">0</li>');
		
		var tickerDiv = document.createElement('div');
		$(tickerDiv).addClass('ticker');

		var tickerLabel = document.createElement('span');
		$(tickerLabel).text('Ticker').addClass('label');

		var tickerInput = document.createElement('input');
		$(tickerInput).attr('type','text').attr('name','ticker').attr('placeholder','Ticker')
		.addClass('ticker-label');

		var tradeActionButton = document.createElement('button');
		$(tradeActionButton).attr('type','button').addClass('add-action').html('add action');

		var tradeActions = document.createElement('ul');
		$(tradeActions).addClass('actions');

		$(tickerDiv).append(tickerLabel).append(tickerInput);
		$(trade).append(tradeHeader).append(tradeActionButton).append(tickerDiv).append(tradeActions);

		$('.trades').append(trade);

		addAction( trade );
	}

	function addAction( trade ){
		var action = document.createElement('li');
		$(action).addClass('action');

		var buysell = document.createElement('div');
		$(buysell).addClass('buy-sell')
		.append('<span class="label">Action</span><select><option value="Buy">Buy</option><option value="Sell">Sell</option></select>')

		var quantity = document.createElement('div');
		$(quantity).addClass('quantity')
		.append('<span class="label">Quantity</span>')
		.append('<input type="text" name="quantity" placeholder="Lot Quantity">');

		var price = document.createElement('div'); 
		$(price).addClass('price')
		.append('<span class="label">Price</span>')
		.append('<input type="text" name="price" placeholder="Individual Price">');

		var value = document.createElement('div');
		$(value).addClass('value')
		.append('<span class="label">Value</span>')
		.append('<p></p>');

		$(action).append(buysell).append(quantity).append(price).append(value);
		$(trade).children('.actions').append(action);
	}

	function calculateAction( action ){
		var quantity = $(action).children('.quantity').children('input').val();
		var price = $(action).children('.price').children('input').val();
	
		if( quantity && price ){	
			var direction = -1;
			if( $(action).children('.buy-sell').children('select').val() == 'Sell' ){
				direction = 1;
			}
			var value = (quantity * price) * direction;
			$(action).children('.value').children('p').html(value);
			calculateTrade( action );
		}
	} 

	function calculateTrade( trade ){
		var trade = trade.parent();
		var tradeTotalValue = 0;
		$.each($(trade).children('.action'), function( index, value ) {
			var value = $(value).children('.value').children('p').html();
			tradeTotalValue = parseInt(tradeTotalValue) + parseInt(value);
		});
		$(trade).parent().children('.header').children('.trade-total').html(tradeTotalValue);

		calculateTotal();
	}

	function calculateTotal( ){ 
		var totals = $('.trade-total');
		var totalValue = 0;
		$.each(totals, function( index, value ) {
			totalValue = parseInt(totalValue) + parseInt($(value).html());
		});
		$('.account-total').html(totalValue);
	}

})();
