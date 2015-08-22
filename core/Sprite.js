var Sprite = Class.extend({

	_tag : null,
	_texture : null,
	_ract : null,

    schedule : false,
    hide : false,
	zIndex : 0,
	x : 0,
	y : 0,
	width : 0,
	height : 0,
    scale : 1,

	init : function (img, ract) {
        this._texture = Texture.getTexture(img);
        if (typeof(rect) === "undefined") {
            this._ract = Ract(0, 0, this._texture.width, this._texture.height);
        } else {
            this._ract = ract;
        }
        this.width = this._ract.w;
        this.height = this._ract.h;
	},
    setScale : function (s) {
        this.scale = s;
        this.width *= s;
        this.height *= s;
    },

	draw : function (ctx, dt) {
		if (this._ract) {
			ctx.drawImage(
				this._texture, 
				this._ract.x, 
				this._ract.y, 
				this._ract.w, 
				this._ract.h, 
				this.x, 
				this.y,
				this.width,
				this.height);
		}
	}

});
