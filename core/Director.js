var Nebula = {};
Nebula.Director = {

    width : 0,
    height : 0,

	_canvas : null,
	_context : null,

	_lastFrameTime : null,
	_DT : null,

	_debug : true,
	_displayFPS : true,
	_FPSsample : 10,

	_updateFunc : null,
	_delay : null,
	_scene : null,

	init : function(canvas, context) {
		this._canvas = canvas;
		this._context = context;

        this.width = canvas.width;
        this.height = canvas.height;

		this._lastFrameTime = (new Date()).getTime();
		this._DT = 1000/30;
		this._intervalID = setInterval("Nebula.Director.schedule()", this._DT);

		this._updateFunc = [];
		this._delay = [];

		if (this._displayFPS) {
			this._displayFPSNum = 0;
			this._dttimecount = 0;
			this._dtsamplecount = 0;
		}
	},
	runScene : function (scene) {
		if (this._scene)  {
			delete this._scene;
		}
		this._scene = scene;
	},
	draw : function(dt) {
		this._context.fillStyle = "#FFFFFF";
		this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

		if (this._scene) {
			this._scene.draw(this._context, dt);
		}

		if (this._displayFPS) {
			this._dttimecount += dt;
			this._dtsamplecount += 1;
			if (this._dtsamplecount >= this._FPSsample) {
				this._displayFPSNum = parseInt(1 / (this._dttimecount / this._FPSsample));
				this._dttimecount = 0;
				this._dtsamplecount = 0;
			}

			this._context.textAlign = "left";
			this._context.fillStyle = "#000000";
			this._context.fillText("fps : " + this._displayFPSNum, 10, 10);
		}
	},
	update : function(dt) {
		if (this._updateFunc && this._updateFunc.length > 0) {
			for (var i in this._updateFunc) {
				this._updateFunc[i](dt);
			}
		}
		if (this._delay && this._delay.length > 0) {
			for (var i in this._delay) {
				this._delay[i]._lasttime -= dt;
				if (this._delay[i]._lasttime <= 0) {
					this._delay[i]._func(this._delay[i]._args);
					delete this._delay[i];
				}
			}
		}
		if (this._scene) {
			this._scene._update(dt);
		}
	},

	schedule : function () {
		var nowTime = (new Date()).getTime();
		var dt = (nowTime - this._lastFrameTime)/1000;
		this._lastFrameTime = nowTime;
		this.update(dt);
		this.draw(dt);
	}
};
