var Scene = Class.extend({
	_childs : null,

    schedule : false,

	init : function () {
		this._childs = [];
	},
	_sort : function () {
		if (this._childs && this._childs.length > 0) {
            this._childs.sort(function(a, b) {
                return a.zIndex - b.zIndex;
            });
		}
	},

	onLeave : function() {
	},
	onEnter : function() {
	},
	addChild : function (child) {
		this._childs.push(child);
	},
	removeChild : function(child) {
		var i;
		var index = -1;
		for (i in this._childs) {
			if (this._childs[i]._id === child._id) {
				index = i;
			}
		}
		if (index >= 0) {
			this._childs.splice(index, 1);
		}
	},
	draw : function (ctx, dt) {
		this._sort();
		for (var i in this._childs) {
            if (!this._childs[i].hide) {
			    this._childs[i].draw(ctx, dt);
            }
		}
	},
	update : function(dt) {
	},
	_update : function(dt) {
        if (this.schedule) {
            this.update(dt);
        }
		for (var i in this._childs) {
			if (this._childs[i].schedule) {
				this._childs[i].update(dt);
			}
			if (this._childs[i].animate) {
				this._childs[i].updateAnimate(dt);
			}
		}
	}
});
