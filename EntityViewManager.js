function EntityViewManager(canvas, config) {
	var me = this;
	me.canvas = canvas;
	me.config = config; // The configuration used to initialize the manager
	me.entityViews = []; // The entity views this manager is managing
	me.fieldViewConnectors = []; // The connectors this manager is managing

	me.canvas.on('mousedown', function(event) {
		var mousePos = me.getMousePosition(event);
		
		me.findByLocation(mousePos)
			.forEach(function(entityView) {
				entityView.onBeginDrag(mousePos);
			});
	});

	me.canvas.on('mouseup', function(event) {
		var mousePos = me.getMousePosition(event);
		
		me.findByLocation(mousePos)
			.forEach(function(entityView) {
				entityView.onEndDrag(mousePos);
			});
	});

	me.canvas.on('click', function(event) {
		var mousePos = me.getMousePosition(event);
		
		me.findByLocation(mousePos)
			.forEach(function(entityView) {
				entityView.onClick(mousePos);
			});

	});
}

EntityViewManager.prototype.createEntityView = function(name, fields, config) {
	var entityViewConfig = Object.assign({
				name: name,
				fields: fields
			}, 
			this.config.entity,
			config),
		entityView = new EntityView(this.canvas, entityViewConfig);

		entityView.manager = this;

		this.entityViews.push(entityView);

		return entityView;
};

EntityViewManager.prototype.draw = function() {
	this.canvas.clear();

	this.entityViews.forEach(function(entityView) {
		entityView.draw();
	});

	this.fieldViewConnectors.forEach(function(fieldViewConnector) {
		fieldViewConnector.draw();
	});
};

EntityViewManager.prototype.findByLocation = function(point) {
	return this.entityViews.filter(function(entityView) {
		return entityView.containsPoint(point.x, point.y);
	});
};

EntityViewManager.prototype.getMousePosition = function(event) {
	var canvasPos = this.canvas.getPosition();

	return {
		x: event.clientX - canvasPos.left + window.pageXOffset,
		y: event.clientY - canvasPos.top + window.pageYOffset
	};
};

EntityViewManager.prototype.createFieldViewConnector = function(field1, field2) {
	var fieldViewConnector = new FieldViewConnector(field1, field2, this.config.connector);

	this.fieldViewConnectors.push(fieldViewConnector);

	return fieldViewConnector;
};