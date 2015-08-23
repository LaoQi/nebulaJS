var ClickTestScene = TestScene.extend({
    init : function () {
        this._super();

        var str = "现在点击的是：";
        var note = new Label(str);
        note.x = 500;
        note.y = 60;
        note.setFontSize(32);
        note.setSpacing(30);
        this.addChild(note);

        s = new Sprite("doge");
        s.x = 160;
        s.y = 160;
        s.zIndex = 50;
        Nebula.Director.addMouseListener(s, "down");
        s.onmousedown = function (e) {
            console.log(s._id);
            note.setString(str + "1");
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
            note.setString(str + "2");
        };
        this.addChild(s2);

        var s3 = new Sprite("head");
        s3.zIndex = 60;
        s3.x = 230;
        s3.y = 150;
        s3.rotate = 30;
        this.addChild(s3);
        s3.onmousedown = function (e) {
            console.log(s3._id);
            note.setString(str + "3");
        };
        Nebula.Director.addMouseListener(s3, "down");

        Nebula.Delay(5, function() {
            console.log("s2 removeMouseListener");
            note.setString("2 移除监听");
            Nebula.Director.removeMouseListener(s2, "down");
        });
    },
    onEnter : function () {
        Nebula.Director._debug = true;
    },
    onLeave : function() {
        Nebula.Director._debug = false;
    },
    update : function (dt) {
    }
});
