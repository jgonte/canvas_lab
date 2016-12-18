function EntityView(canvas, config) {
	var me = this;
	me.canvas = canvas;
	me.config = config;
	me.fieldViews = []; // The collection of field views that belong to this entity view

	if (config.fields) {

		config.fields.forEach(function(fieldConfig) {
			me.createFieldView(fieldConfig);
		});
	}
}

EntityView.prototype.draw = function() {
	var conf = this.config,
		canvas = this.canvas,
		header = conf.header,
		fields = conf.fields,
		top = conf.top || 20,
		left = conf.left || 20,
		width = conf.width;

	// Draw the container
	canvas.drawRect({
		top: top,
		left: left,
		width: width,
		height: conf.height,
		color: conf.color
	});

	// Draw the header
	canvas.drawRect({
		top: top,
		left: left,
		width: width,
		height: header.height,
		color: header.color
	});

	// Draw the text in the header
	canvas.drawText({
		x : left,
		y: top,
		text: conf.name,
		font: header.font,
		textColor: header.textColor,
		maxWidth: width
	});

	this.setBoundary(left, top, width, conf.height);

	// Draw the fields
	this.fieldViews.forEach(function(fieldView) {
		fieldView.draw();
	});
};

EntityView.prototype.createFieldView = function(fieldConfig) {
	var fieldView = new FieldView(this,
		Object.assign({}, fieldConfig), 
		this.fieldViews.length);

	this.fieldViews.push(fieldView);

	return fieldView;
};

EntityView.prototype.setBoundary = function(left, top, width, height) {
	this.left = left;
	this.top = top;
	this.width = width;
	this.height = height;
};

EntityView.prototype.containsPoint = function(x, y) {
	return x >= this.left &&
		x <= this.left + this.width &&
		y >= this.top &&
		y <= this.top + this.height;
};

EntityView.prototype.onBeginDrag = function(point) {
	var fieldViews = this.findByLocation(point),
		manager = this.manager;

	if (fieldViews.length > 0) { // The drag started from a field

		manager.fieldViewToConnect = fieldViews[0];
	}
};

EntityView.prototype.onEndDrag = function(point) {
	var fieldViews = this.findByLocation(point),
		manager = this.manager;

	if (manager.fieldViewToConnect && fieldViews.length > 0 && manager.fieldViewToConnect != fieldViews[0]) {

		manager.createFieldViewConnector(manager.fieldViewToConnect, fieldViews[0]);

		manager.draw(); // Redraw the connector

		alert(manager.fieldViewToConnect.entityView.config.name + '.' + manager.fieldViewToConnect.config.name 
			+ ' <-> '
			+ fieldViews[0].entityView.config.name + '.' + fieldViews[0].config.name
		);

		manager.fieldViewToConnect = null;
	}
};

EntityView.prototype.onClick = function(point) {
	var fieldViews = this.findByLocation(point);

	if (fieldViews.length > 0) {
		fieldViews[0].select();
	}
};

EntityView.prototype.findByLocation = function(point) {
	return this.fieldViews.filter(function(fieldView) {
		return EntityView.prototype.containsPoint.call(fieldView, point.x, point.y);
	});
};