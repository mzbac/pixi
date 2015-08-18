function Map(width, height, cavasWidth, canvasHeight, imageUrl) {
    var bunnyTexture = PIXI.Texture.fromImage(imageUrl);
    PIXI.Sprite.call(this, bunnyTexture);
    this.position.x = 0;
    this.position.y = 0;
    this.width = width;
    this.height = height;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = cavasWidth;
    this.interactive = true;
    if (addWheelListener != undefined) {
        addWheelListener(document.body, function() {
            var that = this;
            return function(e) {
                that.originalScale = that.originalScale ? that.originalScale : that.scale.x;
                that.zoom(e.clientX, e.clientY, e.deltaY < 0);
            }
        }.call(this));
    }
    this.mousePressPoint = [0, 0];
}

Map.prototype = Object.create(PIXI.Sprite.prototype);

Map.prototype.constructor = Map;

Map.prototype.mousedown = Map.prototype.touchstart = function(data) {

    this.dragging = true;
    this.mousePressPoint[0] = data.data.getLocalPosition(this.parent).x - this.position.x;
    this.mousePressPoint[1] = data.data.getLocalPosition(this.parent).y - this.position.y;
};
Map.prototype.mouseup = Map.prototype.mouseupoutside =
    this.touchend = this.touchendoutside = function(data) {
        this.dragging = false;
    };
Map.prototype.mousemove = Map.prototype.touchmove = function(data) {
    if (this.dragging) {
        var position = data.data.getLocalPosition(this.parent);
        if (position.x - this.mousePressPoint[0] + (this.width - this.canvasWidth) > 0 && (position.x - this.mousePressPoint[0] < 0))
            this.position.x = position.x - this.mousePressPoint[0];
        if (position.y - this.mousePressPoint[1] + (this.height - this.canvasHeight) > 0 && (position.y - this.mousePressPoint[1] < 0))
            this.position.y = position.y - this.mousePressPoint[1];
    }
    else {

    }
};

Map.prototype.zoom = function(x, y, isZoomIn) {
    var direction = isZoomIn ? 1 : -1;
    var factor = this.scale.x * (1 + direction * 0.1);
    var previousScale = this.scale.x;
    if (factor >= this.originalScale)
        this.scale.x = this.scale.y = factor;
    if ((this.position.x + this.width) < this.canvasWidth)
        this.scale.x = this.scale.y = previousScale;
    if ((this.position.y + this.height) < this.canvasHeight)
        this.scale.x = this.scale.y = previousScale;
}