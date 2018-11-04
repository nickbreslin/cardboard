/* jshint unused:false */
let Plot = {};;

/* global Snap */

function newObj ( orig ) {
	'use strict';

	let obj = Object.assign( Object.create( Object.getPrototypeOf(orig)), orig);

	if(obj.init) {
		obj.init();
	}
	
	return obj;
}


Plot.Grid = {};
Plot.Grid.points = [];
Plot.Grid.axes = [];


let Point = {
	x : 0,
	y : 0,


	setCoord : function( _x, _y ) {
		'use strict';

		this.x = _x;
		this.y = _y;
	},

	setPoint : function ( point ) {
		'use strict';

		this.x = point.x;
		this.y = point.y;
	}
};

let Line = {
	p1: null,
	p2: null,
	label: '',
	color: '#000',
	style: 'solid', // dashed
	width: 3,
	delay: 0,
	dom: null,

	init : function () {
		'use strict';

		this.p1 = newObj(Point);
		this.p2 = newObj(Point);
	},

	setPoints: function( _p1, _p2 ) {
		'use strict';
		
		this.p1.setPoint(_p1);
		this.p2.setPoint(_p2);
	},

	render: function () {
		'use strict';

		if(this.dom) {
			return false;
		}

		const s = Snap('#plot');
		let line = s.line(
			this.p1.x,
			this.p1.y,
			this.p1.x,
			this.p1.y
		);

		line.attr({
		    stroke: this.color,
		    strokeWidth: this.width
		});

		if(this.dashed) {
			line.attr({
				'stroke-dasharray': '1px, 8px',
		  		'stroke-linecap' : 'round',
		  		strokeWidth: this.width
		  	});
		}

		line.animate({
			x2: this.p2.x,
			y2: this.p2.y
		}, this.delay);
		
		this.dom = line;
		return line;
	}
};


Plot.Grid.generatePoints = function () {
	'use strict';

	let params = Plot.Grid.params;

	let points = {};

	points.origin = newObj(Point);
	points.origin.setCoord(params.padding,params.padding);

	points.pAxisX = newObj(Point);
	points.pAxisX.setCoord(params.padding + params.size,params.padding);

	points.pAxisY = newObj(Point);
	points.pAxisY.setCoord(params.padding,params.padding + params.size);

	Plot.Grid.points = points;
};


Plot.Grid.createAxes = function () {
	'use strict';

	let params = Plot.Grid.params;
	let points = Plot.Grid.points;

	let axes = [];

	axes.x = newObj(Line);
	axes.x.setPoints(points.origin, points.pAxisX);
	axes.x.label = params.labels[0];

	axes.y = newObj(Line);
	axes.y.setPoints(points.origin, points.pAxisY);
	axes.y.label = params.labels[0];

	Plot.Grid.axes = axes;
};

Plot.Grid.render = function () {
	'use strict';

	/*
	for ( let i = 0; i < Plot.Grid.axes.length; i += 1 ) {
		let _axis = Plot.Grid.axes[i];
		_axis.render();
	}
	*/

	for (var key in Plot.Grid.axes) {
	    // skip loop if the property is from prototype
	    if (!Plot.Grid.axes.hasOwnProperty(key)) {
	    	continue;
	    }

	     let _axis = Plot.Grid.axes[key];
	     _axis.render();
	}
};


Plot.Grid.init = function ( params ) {
	'use strict';

	params.size    = params.size    ? params.size    : 50;
	params.padding = params.padding ? params.padding : 50;

	Plot.Grid.params = params;
	Plot.Grid.generatePoints();
	Plot.Grid.createAxes();
	Plot.Grid.render();
};
