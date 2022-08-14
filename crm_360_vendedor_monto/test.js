(function(H) {
		H.Legend.prototype.setItemEvents = function(item, legendItem, useHTML) {
    		var legend = this,
        boxWrapper = legend.chart.renderer.boxWrapper,
        activeClass = 'highcharts-legend-' + (item.series ? 'point' : 'series') + '-active',
        hasLinkedSeries = function(item) {
        		 return ((item.linkedSeries && item.linkedSeries.length) ? true : false);
        },
        setLinkedSeriesState = function(item, state) {
        		item.linkedSeries.forEach(function(elem) {
            		elem.setState(state)
            })
        };

    // Set the events on the item group, or in case of useHTML, the item itself (#1249)
    (useHTML ? legendItem : item.legendGroup).on('mouseover', function () {
        if (item.visible) {
            item.setState('hover');

            // Add hover state to linked series
            if (hasLinkedSeries(item)) {
                setLinkedSeriesState(item, 'hover')
            }
            // A CSS class to dim or hide other than the hovered series
            boxWrapper.addClass(activeClass);

            /*= if (build.classic) { =*/
            legendItem.css(legend.options.itemHoverStyle);
            /*= } =*/
        }
    })
    .on('mouseout', function () {
        /*= if (build.classic) { =*/
        legendItem.css(H.merge(item.visible ? legend.itemStyle : legend.itemHiddenStyle));
        /*= } =*/

        // A CSS class to dim or hide other than the hovered series
        boxWrapper.removeClass(activeClass);
        
        
       	// Remove hover state from linked series
        if(hasLinkedSeries(item)) {
        		setLinkedSeriesState(item)
        }
        
        item.setState();
        
        
    })
    .on('click', function (event) {
        var strLegendItemClick = 'legendItemClick',
            fnLegendItemClick = function () {
                if (item.setVisible) {
                    item.setVisible();
                }
            };

        // Pass over the click/touch event. #4.
        event = {
            browserEvent: event
        };

        // click the name or symbol
        if (item.firePointEvent) { // point
            item.firePointEvent(strLegendItemClick, event, fnLegendItemClick);
        } else {
            H.fireEvent(item, strLegendItemClick, event, fnLegendItemClick);
        }
    });
    };
})(Highcharts)

var chart = Highcharts.chart('container', {

  title: {
    text: 'Legend hover only selects the first series of the two linked series'
  },

  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr']
  },

  series: [{
    id: 's1',
    name: 'Series 1 and 2 linked',
    color: '#ff0000',
    data: [1, 4, 3, 2, 5]
  }, {
    linkedTo: 's1',
    color: '#ff0000',
    data: [5, 2, 3, 4, 1]
  }, {
    data: [6, 1, 5, 6, 3]
  }]
});