function FieldView(entityView, config, index) {
	this.entityView = entityView;
	this.config = config;
	this.index = index; // The index of this field inside the entity
}

FieldView.prototype.draw = function() {
	var entityView = this.entityView,
		canvas = entityView.canvas,
		config = entityView.config,
		fieldConfig = config.field,
		left = config.left,
		top = config.top + (this.index + 1) * fieldConfig.height,
		color = this.selected ? fieldConfig.selected.color : fieldConfig.color,
		textColor = this.selected ? fieldConfig.selected.textColor : fieldConfig.textColor;

	// Draw the box of the field
	canvas.drawRect({
		top: top,
		left: left,
		width: config.width,
		height: fieldConfig.height,
		color: color
	});

	canvas.drawText({
		x : left,
		y: top,
		text: this.config.name, // The configuration of this specific field
		font: fieldConfig.font,
		textColor: textColor,
		maxWidth: config.width
	});

	canvas.drawLine({
		fromX : left,
		fromY: top + fieldConfig.height,
		toX: left + config.width,
		toY: top + fieldConfig.height,
		color: textColor
	});

	EntityView.prototype.setBoundary.call(this, left, top, config.width, fieldConfig.height);
};

FieldView.prototype.select = function() {
	var manager = this.entityView.manager;

	if (manager.selectedFieldView) {
		manager.selectedFieldView.selected = false; // Deselect previously selected field
	}

	this.selected = true;
	manager.selectedFieldView = this;

	manager.draw(); // Redraw
};