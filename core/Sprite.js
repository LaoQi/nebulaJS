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

	init : function (img, ract) {
        this._texture = Texture.getTexture(img);
        if (typeof(ract) === "undefined") {
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

    			this.animate.callback && this.animate.callback();

    			if (this.animate.loop != 0 && this.animate.curloop >= this.animate.loop) {
    				delete this.animate ;
    				this.animate = null;
    			}
    		}
    	}
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
