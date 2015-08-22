var Delay = Class.extend({

	_lasttime : 0,
	_func : null,
	_args : null,

	create : function (dt, func, args) {
		this._lasttime = dt;
		this._func = func;
		this._args = args;

		Nebula.Director._delay.append(this);
	}
});