var AnimateTestScene = TestScene.extend({
    init : function () {
        this._super();

        var animelist = [];
        for (var i = 0; i < 9; ++i) {
            var r = Nebula.Ract(82*i, 0, 82, 62);
            animelist.push({
                texture : "run",
                ract : r
            });
        }

        this.doges = [];
        for (var i = 0; i < 80; ++i) {
            var s2 = new Sprite("run", Nebula.Ract(0, 0, 82, 62));
            // s2.setScale(1);
            s2.x = s2.width*0.07*i + 200;
            s2.y = (i%8)*23 + 250;
            s2.animate = Nebula.Animate(Nebula.AnimateFrames(animelist), 0.05 + Math.random()*0.06);
            s2.zIndex = i;
            this.addChild(s2);
        }

        var s3 = new Sprite("doge");
        s3.zIndex = 49;
        this.addChild(s3);
        Nebula.Delay(3, function(){
            s3.setScale(2);
        });
        s3.anchorX = 0.5;
        s3.anchorY = 0.5;
        s3.x = 150;
        s3.y = 150;
        s3.rotate = 30;
        this.s3 = s3;
        this.schedule = true;
    },
    update : function (dt) {
        this.s3.rotate += 2;
    }
});
