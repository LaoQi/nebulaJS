var HelloScene = Scene.extend({
    init : function () {
        this._super();
        this.s = new Sprite("doge");
        this.s.x = Nebula.Director.width/2 - this.s.width/2;
        this.s.y = Nebula.Director.height/2 - this.s.height/2;
        this.s.zIndex = 50;

        var animelist = [];
        for (var i = 0; i < 9; ++i) {
            var r = Nebula.Ract(82*i, 0, 82, 62);
            animelist.push({
                texture : "run",
                ract : r
            });
        }

        this.addChild(this.s);
        
        for (var i = 0; i < 400; ++i) {
            var s2 = new Sprite("run", Nebula.Ract(0, 0, 82, 62));
            s2.setScale(0.4);
            s2.x = s2.width*(i%20);
            var j = parseInt(i/20);
            s2.y = s2.height*j;
            s2.animate = Nebula.Animate(Nebula.AnimateFrames(animelist), Math.random()%0.3);
            s2.zIndex = i/5;
            this.addChild(s2);
        }

        var s3 = new Sprite("doge");
        s3.zIndex = 49;
        this.addChild(s3);
        Nebula.Delay(3, function(){
            s3.setScale(6);
        });
        this.schedule = true;
        this.scaletest = 1;
    },
    update : function (dt) {
        if (this.scaletest < 3) {
            this.scaletest += 0.05;
        } else {
            this.scaletest = 0.6;
        }
        this.s.setScale(this.scaletest);
    }
});
