var DEGREE = Math.PI/180;

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
	_FPSsample : 60,

	_updateFunc : null,
	_delay : null,
	_scene : null,

	_onkeydown : null,
	_onkeyup : null,
	_onkeypress : null,

	_onkeyeventObj : null,
	_onmousedownobj : null,
	_onmouseupobj : null,

	init : function(canvas, context) {
		this._canvas = canvas;
		this._context = context;

        this.width = canvas.width;
        this.height = canvas.height;

		this._lastFrameTime = (new Date()).getTime();
		this._DT = 1000/60;
		this._intervalID = setInterval("Nebula.Director.schedule()", this._DT);

		this._updateFunc = [];
		this._delay = [];

		this._onmouseupobj = [];
		this._onmousedownobj = [];

		canvas.onkeydown = this.onkeydown;
		canvas.onkeyup = this.onkeyup;
		canvas.onkeypress = this.onkeypress;

		canvas.onmousedown = this.onmousedown;
		canvas.onmouseup = this.onmouseup;
		canvas.onmousemove = this.onmousemove;

		if (this._displayFPS) {
			this._displayFPSNum = 0;
			this._dttimecount = 0;
			this._dtsamplecount = 0;
		}
	},
	onkeydown : function(e) {
		if (Nebula.Director._onkeydown) {
			Nebula.Director._onkeydown(e.keyCode||e.which||e.charCode, Nebula.Director._onkeyeventObj);
		}
	},
	onkeyup : function(e) {
		if (Nebula.Director._onkeyup) {
			Nebula.Director._onkeyup(e.keyCode||e.which||e.charCode, Nebula.Director._onkeyeventObj);
		}
	},
	onkeypress : function(e) {
		if (Nebula.Director._onkeypress) {
			Nebula.Director._onkeypress(e.keyCode||e.which||e.charCode, Nebula.Director._onkeyeventObj);
		}
	},
	onmousedown : function(e) {
		if (Nebula.Director._onmousedownobj.length == 0) {
			return 0;
		}
		Nebula.Director._onmousedownobj.sort(function(a, b){
			return a.zIndex - b.zIndex;
		});

		var x = e.x || e.clientX;
		var y = e.y || e.clientY;
		x -= Nebula.Director._canvas.offsetLeft;
		y -= Nebula.Director._canvas.offsetTop;

		var i = Nebula.Director._onmousedownobj.length - 1;
		for (;i >= 0; --i) {
			if (Nebula.Director._ptInRact(x, y, Nebula.Director._onmousedownobj[i])) {
				Nebula.Director._onmousedownobj[i].onmousedown(e);
				if (typeof(Nebula.Director._onmousedownobj[i]) !== "undefined" && 
					!Nebula.Director._onmousedownobj[i].allowThrough) break;
			}
		}
	},
	onmouseup : function(e) {
		if (Nebula.Director._onmouseupobj.length == 0) {
			return 0;
		}
		Nebula.Director._onmouseupobj.sort(function(a, b){
			return a.zIndex - b.zIndex;
		});

		var x = e.x || e.clientX;
		var y = e.y || e.clientY;
		x -= Nebula.Director._canvas.offsetLeft;
		y -= Nebula.Director._canvas.offsetTop;

		var i = Nebula.Director._onmouseupobj.length - 1;
		for (;i >= 0; --i) {
			if (Nebula.Director._ptInRact(x, y, Nebula.Director._onmouseupobj[i])) {
				Nebula.Director._onmouseupobj[i].onmouseup(e);
				//replace scene clear
				if (typeof(Nebula.Director._onmouseupobj[i]) !== "undefined" 
					&& !Nebula.Director._onmouseupobj[i].allowThrough) 
					break;
			}
		}
	},
	onmousemove : function(e) {
		// console.log(e.x || e.clientX , e.y || e.clientY);
	},
	_ptInRact : function (x, y, obj) {

		var bbox = obj.getBindingBox();
		if (obj.rotate === 0) {
			if (x > bbox.maxX || x < bbox.minX || y > bbox.maxY || y < bbox.minY) {
				return false;
			}
			return true;
		}
		var cx = x - obj.x;
		var cy = y - obj.y;
		var sin0 = 0 - Math.sin(obj.rotate*DEGREE);
    	var cos0 = Math.cos(obj.rotate*DEGREE);
		var Cx = cx*cos0 - cy*sin0;
    	var Cy = cx*sin0 + cy*cos0;

    	var tmpx1 = obj.width * (1 - obj.anchorX);
    	var tmpx2 = 0 - obj.width * obj.anchorX;
    	var tmpy1 = obj.height * (1 - obj.anchorY);
    	var tmpy2 =  0 - obj.height * obj.anchorY;

    	if (Cx > tmpx1 || Cx < tmpx2 || Cy > tmpy1 || Cy < tmpy2) {
    		return false;
    	}
    	return true;
	},
	addMouseListener : function (obj, e) {
		if (e == "down") {
			this._onmousedownobj.push(obj);
		} else if (e == "up") {
			this._onmouseupobj.push(obj);
		}
		
	},
	removeMouseListener : function (obj, e) {
		if (e == "down") {
			var i;
			var index = -1;
			for (i in this._onmousedownobj) {
				if (this._onmousedownobj[i]._id === obj._id) {
					index = i;
				}
			}
			if (index >= 0) {
				this._onmousedownobj.splice(index, 1);
			}
		} else if (e == "up") {
			var i;
			var index = -1;
			for (i in this._onmouseupobj) {
				if (this._onmouseupobj[i]._id === obj._id) {
					index = i;
				}
			}
			if (index >= 0) {
				this._onmouseupobj.splice(index, 1);
			}
		}
	},
	runScene : function (scene) {
		if (this._scene)  {
			delete this._scene;
		}
		this._scene = scene;
	},
	replaceScene : function (scene) {
		delete this._scene;
		this._clear();
		this._scene = new scene();
	},
	_clear : function () {
		this._onmousedownobj = [];
		this._onmouseupobj = [];
		this._delay = [];
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
