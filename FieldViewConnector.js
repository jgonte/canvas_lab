function FieldViewConnector(field1, field2, config) {
	this.field1 = field1;
	this.field2 = field2;
	this.config = config;
}

FieldViewConnector.prototype.draw = function() {
	//TODO: Find the shortest distance between the two fields
	var f1 = this.field1,
		f2 = this.field2,
		canvas = f1.entityView.canvas,
		x1 = f1.left + f1.width / 2,
		y1 = f1.top + f1.height / 2,
		x2 = f2.left + f2.width / 2,
		y2 = f2.top + f2.height / 2;

	canvas.drawLine({
		fromX : x1,
		fromY: y1,
		toX: x2,
		toY: y2,
		color: this.config.color
	});
};
