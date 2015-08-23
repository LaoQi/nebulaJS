var ClickTestScene = Scene.extend({
    init : function () {
        this._super();
        s = new Sprite("doge");
        s.x = 160;
        s.y = 160;
        s.zIndex = 50;
        Nebula.Director.addMouseListener(s, "down");
        s.onmousedown = function (e) {
            console.log(s._id);
            s.zIndex += 1;
        };
        this.addChild(s);

        var s2 = new Sprite("head");
        s2.zIndex = 49;
        s2.x = 100;
        s2.y = 150;
        // s2.rotate = 30;
        Nebula.Director.addMouseListener(s2, "down");
        s2.onmousedown = function (e) {
            console.log(s2._id);
            s2.zIndex += 1;
        };
        this.addChild(s2);

        var s3 = new Sprite("head");
        s3.zIndex = 60;
        s3.x = 300;
        s3.y = 150;
        s3.rotate = 30;
        this.addChild(s3);
        s3.onmousedown = function (e) {
            console.log(s3._id);
            s3.zIndex += 1;
        };
        Nebula.Director.addMouseListener(s3, "down");

        Nebula.Delay(5, function() {
            console.log("s2 removeMouseListener");
            Nebula.Director.removeMouseListener(s2, "down");
        });
    },
    update : function (dt) {
    }
});
