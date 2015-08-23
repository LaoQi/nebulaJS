Nebula.Camera = {
	
	x : 0,
	y : 0,
	alpha : 1,
	isEnable : false
}

Nebula.Ract = function (xx, yy, ww, hh) {
    return {x:xx, y:yy, w:ww, h:hh};
};

Nebula.Delay = function (dt, func, args) {
    var d = {
        _lasttime : dt,
        _func : func,
        _args : args
    };

    Nebula.Director._delay.push(d);
};

Nebula.AnimateFrames = function (list) {

	var framelist = [];
	var i;
	for (i in list) {
		var imgdata =  Texture.getTexture(list[i].texture);
		framelist.push({
			imgdata : imgdata,
			ract : list[i].ract
		});
	}
	return framelist;
}

Nebula.Animate = function (framelist, delay, loop, callback) {
		
	var ani = {
		frames : framelist,
		delay : delay,
		_delay : delay,
		curframe : 0,
		loop : 0,
		curloop : 0,
		callback : null,
	}

	ani.frames = framelist;
	ani.delay = delay;
	if (typeof(loop) === "undefined") {
		ani.loop = 0;
	} else {
		ani.loop = loop;
	}

	if(typeof(callback) !== "undefined") ani.callback = callback;
	return ani;
};