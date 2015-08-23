var Sprite = Class.extend({

	_tag : null,
	_texture : null,
	_ract : null,
    animate : null,

    schedule : false,
    hide : false,
	zIndex : 0,
	x : 0,
	y : 0,
	width : 0,
	height : 0,
    scale : 1,
    rotate : 0,
    anchorX : 0.5,
    anchorY : 0.5,
    flipX : false,
    flipY : false,
    alpha : 1,

    allowThrough : false,

	init : function (img, ract) {

		if (typeof(img) === "undefined") {
			return ;
		}

        this._texture = Texture.getTexture(img);
        if (typeof(ract) === "undefined" || !ract) {
            this._ract = Nebula.Ract(0, 0, this._texture.width, this._texture.height);
        } else {
            this._ract = ract;
        }
        this.width = this._ract.w;
        this.height = this._ract.h;
	},
    setScale : function (s) {
        this.scale = s;
        this.width = this._ract.w * s;
        this.height = this._ract.h * s;
    },
    setAnimateFrame : function (frame) {
    	this._texture = frame.imgdata;
    	this._ract = frame.ract;
    	this.width = frame.ract.w * this.scale;
    	this.height = frame.ract.h * this.scale;
    },
    getBindingBox : function () {

    	var tmpx1 = this.width * (1 - this.anchorX);
    	var tmpx2 = 0 - this.width * this.anchorX;
    	var tmpy1 = this.height * (1 - this.anchorY);
    	var tmpy2 =  0 - this.height * this.anchorY;

    	if (this.rotate === 0) {
    		var maxX = (tmpx1 > tmpx2 ? tmpx1 : tmpx2) + this.x;
			var maxY = (tmpy1 > tmpy2 ? tmpy1 : tmpy2) + this.y;
			var minX = (tmpx1 < tmpx2 ? tmpx1 : tmpx2) + this.x;
			var minY = (tmpy1 < tmpy2 ? tmpy1 : tmpy2) + this.y;

    		var box = {
    			maxX : maxX,
    			maxY : maxY,
    			minX : minX,
    			minY : minY
    		}
    		return box;
    	}

    	var xlist = [tmpx1, tmpx2, tmpx1, tmpx2];
    	var ylist = [tmpy1, tmpy1, tmpy2, tmpy2];

    	var sin0 = Math.sin(this.rotate*DEGREE);
    	var cos0 = Math.cos(this.rotate*DEGREE);
    	var cx,cy;
    	for (var i = 0; i < 4; ++i) {
    		cx = xlist[i];
    		cy = ylist[i];
    		xlist[i] = cx*cos0 - cy*sin0;
    		ylist[i] = cx*sin0 + cy*cos0;
    	}

    	xlist.sort(function(a, b){ return a - b;});
    	ylist.sort(function(a, b){ return a - b;});

		var box = {
			maxX : xlist[3] + this.x,
			maxY : ylist[3] + this.y,
			minX : xlist[0] + this.x,
			minY : ylist[0] + this.y
		};
		return box;
    },
    setTexture : function(img, ract) {
		this._texture = Texture.getTexture(img);
        if (typeof(ract) === "undefined") {
            this._ract = Nebula.Ract(0, 0, this._texture.width, this._texture.height);
        } else {
            this._ract = ract;
        }
        this.width = this._ract.w * this.scale;
        this.height = this._ract.h * this.scale;
    },

    updateAnimate : function (dt) {
    	this.animate._delay -= dt;
    	if (this.animate._delay <= 0) {
    		this.animate._delay = this.animate.delay;
    		this.setAnimateFrame(this.animate.frames[this.animate.curframe]);
    		this.animate.curframe += 1;

    		if (this.animate.curframe >= this.animate.frames.length) {
    			if (this.animate.loop == 0) {
    				this.animate.curframe = 0;
    			} else if (this.animate.curloop < this.animate.loop) {
    				this.animate.curframe = 0;
    				this.animate.curloop += 1;
    			}

    			(this.animate.callback != null) && this.animate.callback();

    			if (this.animate.loop != 0 && this.animate.curloop >= this.animate.loop) {
    				delete this.animate ;
    				this.animate = null;
    			}
    		}
    	}
    },
	draw : function (ctx, dt) {
		if (this._ract) {
			var ctxSave = false;
			ctx.save();
			ctxSave = true;

			if (Nebula.Camera.isEnable) {
				ctx.translate(this.x + Nebula.Camera.x, this.y + Nebula.Camera.y);
			} else {
				ctx.translate(this.x, this.y);
			}

			var x = 0 - this.width * this.anchorX;
			var y = 0 - this.height * (1 - this.anchorY);

			if (this.flipX || this.flipY) {
				var flipX = this.flipX ? -1 : 1;
				var flipY = this.flipY ? -1 : 1;
				ctx.scale(flipX, flipY);
			}

			if (this.rotate != 0) {
				ctx.rotate(this.rotate * DEGREE);
			} 

			if (this.alpha != 1) {
				ctx.globalAlpha *= this.alpha;
			}

			ctx.drawImage(
				this._texture, 
				this._ract.x, 
				this._ract.y, 
				this._ract.w, 
				this._ract.h, 
				x, 
				y,
				this.width,
				this.height);

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
