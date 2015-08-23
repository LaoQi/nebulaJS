var Button = Sprite.extend({

	normal : null,
	normalract : null,
	onpress : null,
	onpressract : null,
	callback : null,

	init : function(normal, normalract, onpress, onpressract, callback) {
		this._super(normal, normalract);
		this.normal = this._texture;
		this.normalract = normalract;
		this.onpress = Texture.getTexture(onpress);
        if (typeof(onpressract) === "undefined" || !onpressract) {
            this.onpressract = Nebula.Ract(0, 0, this.onpress.width, this.onpress.height);
        } else {
            this.onpressract = onpressract;
        }
        
        this.callback = callback;

        Nebula.Director.addMouseListener(this, "down");
        Nebula.Director.addMouseListener(this, "up");
	},
	onmouseup : function() {
		this.setTextureData(this.normal, this.normalract);
		if (this.callback) {
			this.callback();
		}
	},
	onmousedown : function() {
		this.setTextureData(this.onpress, this.onpressract);
	}
});