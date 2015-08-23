var Label = Sprite.extend({

	_viewstr : null,
	_font : null,
	_fontSize : 12,
	_spacing : 10,
	_length : 9,
	_ismono : false,
	_color : null,
	_fontSet : null,

	init : function (str) {
        this._super();
        this._viewstr = str;

        this._font = "sans-serif";
        this._color = "black";

        this._length = str.length;
        this._resize();
        this._fontreset();
	},
	setString : function(str) {
		this._viewstr = str;
		this._length = str.length;
		this._resize();
	},
	getString : function() {
		return this._viewstr;
	},
	setFontSize : function(s) {
		this._fontSize = s;
		this._resize();
		this._fontreset();
	},
	setSpacing : function(s) {
		this._spacing = s;
		this._resize();
	},
	setFont : function(f) {
		this._font = f;
		this._fontreset();
	},
	_resize : function() {
        this.width = this._spacing * this._length;
        this.height = this._fontSize;
	},
	_fontreset : function() {
		this._fontSet = this._fontSize + "px " +  this._font;
	},
	draw : function (ctx, dt) {
		if (this._viewstr) {
			var ctxSave = false;
			ctx.save();
			ctxSave = true;

			if (Nebula.Camera.isEnable) {
				ctx.translate(this.x + Nebula.Camera.x, this.y + Nebula.Camera.y);
			} else {
				ctx.translate(this.x, this.y);
			}

			var x = 0 - this.width * this.anchorX;
			var y = 0 - this.height * this.anchorY;

			if (this.flipX || this.flipY) {
				var flipX = this.flipX ? -1 : 1;
				var flipY = this.flipY ? -1 : 1;
				ctx.scale(flipX, flipY);
			}

			if (this.rotate != 0) {
				ctx.rotate(this.rotate * Math.PI/180);
			} 

			if (this.alpha != 1) {
				ctx.globalAlpha *= this.alpha;
			}

			ctx.font = this._fontSet;
			ctx.fillStyle = this._color;
			var i;
			for (i = 0; i < this._length; ++i) {
				var tx = i * this._spacing + x;
				ctx.fillText(this._viewstr[i], tx, y + this.height);
			}

			if (Nebula.Director._debug) {
				ctx.fillStyle = "black";
				ctx.strokeRect(x, y, this.width, this.height);
				ctx.fillStyle = "red";
				ctx.fillRect(-2.5, -2.5, 5, 5);
			}

			if (ctxSave) ctx.restore();
		}
	}
});