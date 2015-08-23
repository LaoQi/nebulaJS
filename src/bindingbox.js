var BindingboxScene = Scene.extend({
    init : function () {
        this._super();
        s = new Sprite("doge");
        s.x = Nebula.Director.width/2;
        s.y = Nebula.Director.height/2;
        s.zIndex = 50;
        s.rotate = 60;

        s.draw = function (ctx, dt) {
            if (s._ract) {
                var ctxSave = false;
                ctx.save();
                ctxSave = true;

                ctx.translate(s.x, s.y);

                var x = 0 - s.width * s.anchorX;
                var y = 0 - s.height * (1 - s.anchorY);

                if (s.rotate != 0) {
                    ctx.rotate(s.rotate * DEGREE);
                } 

                if (s.alpha != 1) {
                    ctx.globalAlpha *= s.alpha;
                }

                ctx.drawImage(
                    s._texture, 
                    s._ract.x, 
                    s._ract.y, 
                    s._ract.w, 
                    s._ract.h, 
                    x, 
                    y,
                    s.width,
                    s.height);

                ctx.fillStyle = "black";
                ctx.strokeRect(x, y, s.width, s.height);

                ctx.fillStyle = "red";
                ctx.fillRect(0, 0, 5, 5);

                if (ctxSave) ctx.restore();
                
                ctx.fillStyle = "green";
                var bbox = s.getBindingBox();
                ctx.strokeRect(bbox.minX, bbox.minY, bbox.maxX - bbox.minX  , bbox.maxY - bbox.minY);
            }
        };


        this.s = s;
        this.addChild(s);

        this.schedule = true;
    },
    update : function (dt) {
        this.s.rotate += 2;
    }
});
