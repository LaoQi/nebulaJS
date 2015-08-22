var Scene = Class.extend({
	_childs : null,
	_index : null,

	init : function () {
		this._childs = [];
		this._index = [];
	},
	_sort : function () {
		if (this._childs && this._childs.length > 0) {
			for (var i in this._index) {

			}
		}
	},
	addChild : function (child, index) {
		this._childs.push(child);
	},
	draw : function (ctx, dt) {
		this._sort();
		for (var i in this._childs) {
            if (!this._childs[i].hide) {
			    this._childs[i].draw(ctx, dt);
            }
		}
	},
	_update : function(dt) {
		for (var i in this._childs) {
			if (this._childs[i].schedule) {
				this._childs[i].update(dt);
			}
		}
	}
});
