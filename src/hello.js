var HelloScene = Scene.extend({
    init : function () {
        this._super();
        s = new Sprite("doge");
        s.x = Nebula.Director.width/2;
        s.y = Nebula.Director.height/2;
        s.zIndex = 50;
        s.anchorX = 0.5;
        s.anchorY = 0.5;
        s.rotate = 20;
        // s.hide = true;
        this.s1 = s;
        this.addChild(s);

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
            s2.zIndex = 0 - i;
            s2.flipX = true;
            s2.flipY = false;
            this.addChild(s2);
        }

        var s3 = new Sprite("doge");
        s3.zIndex = 49;
        this.addChild(s3);
        Nebula.Delay(3, function(){
            // s3.setScale(3);
        });
        s3.anchorX = 0.5;
        s3.anchorY = 0.5;
        s3.x = 150;
        s3.y = 150;
        s3.rotate = 30;
        this.s3 = s3;
        this.schedule = true;

        Nebula.Director._onkeydown = this.onkeydown;
        Nebula.Director._onkeyeventObj = this;
    },
    onkeydown : function (keycode, thiz) {
        switch (keycode) {
            case 32 :
                thiz.s3.setScale(thiz.s3.scale == 3 ? 1 : 3);
                break;
            case 37:
                thiz.s3.x -= 5;
                break;
            case 38:
                break;
            case 39:
                thiz.s3.x += 5;
                break;
            case 40:
                thiz.s3.y += 5;
                break;
            default :
                break;
        }
    },
    update : function (dt) {
        this.s1.rotate -= 1;
        this.s3.rotate += 2;
    }
});
