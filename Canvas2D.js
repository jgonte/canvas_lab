function Canvas2D(id) {

	this.dom = document.getElementById(id);

	if (!this.dom.getContext) {

		throw 'Canvas are not supported in this browser';
	}

	this.context = this.dom.getContext('2d');
}

Canvas2D.prototype.drawRect = function(config) {
	var ctx = this.context;

	if (config.color) {
		ctx.fillStyle = config.color;
	}

	ctx.fillRect(config.left, config.top, config.width, config.height);
};

Canvas2D.prototype.drawLine = function(config) {
	var ctx = this.context;

	ctx.beginPath();
    ctx.moveTo(config.fromX, config.fromY);
    ctx.lineTo(config.toX, config.toY);

    if (config.lineWidth) {
    	ctx.lineWidth = config.lineWidth;
    }
    
    if (config.color) {
    	ctx.strokeStyle = config.color;
    }
    
    ctx.stroke();
};

Canvas2D.prototype.drawText = function(config) {
	var ctx = this.context;

	if (config.font) {
		ctx.font = config.font;
	}

	//ctx.textAlign = config.textAlign || 'center';
	ctx.textBaseline = config.textBaseline || 'top';

	if (config.textColor) {
		ctx.fillStyle = config.textColor;
	}

	ctx.fillText(config.text, config.x, config.y, config.maxWidth);
};

Canvas2D.prototype.clear = function() {
	this.context.clearRect(0, 0, this.dom.width, this.dom.height);
};

Canvas2D.prototype.getPosition = function() {
	var dom = this.dom,
		top = 0,
		left = 0;

	while (dom.tagName != 'BODY') {
		top += dom.offsetTop;
       	left += dom.offsetLeft;
       	dom = dom.offsetParent;
	}

	return {
        top: top,
        left: left
    };
};

Canvas2D.prototype.on = function(event, handler) {
	this.dom.addEventListener(event, handler, false);
};