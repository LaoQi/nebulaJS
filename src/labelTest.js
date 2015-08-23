var LabelTestScene = TestScene.extend({
    init : function () {
        this._super();
        //base test
        s = new Label("Hello Nebula");
        s.x = Nebula.Director.width/2;
        s.y = Nebula.Director.height/2;
        s.zIndex = 50;
        this.s = s;
        this.addChild(s);

        //flip test
        s2 = new Label("Hello Nebula");
        s2.x = 100;
        s2.y = 150;
        s2.zIndex = 50;
        s2.flipY = true;
        s2.flipX = true;
        this.s2 = s2;
        this.addChild(s2);

        //chinese test
        s3 = new Label("你好 Nebula");
        s3.x = 100;
        s3.y = 200;
        s3.zIndex = 50;
        this.s3 = s3;
        this.addChild(s3);

        //font test
        s4 = new Label("微软雅黑");
        s4.x = 100;
        s4.y = 300;
        s4.zIndex = 50;
        s4.setFont("微软雅黑");
        s4.setSpacing(30);
        s4.setFontSize(32);
        this.s4 = s4;
        this.addChild(s4);

        //set String test
        Nebula.Delay(5, function(){
            s3.setString("test test test test");
        });

        //sprite set anchor test
        Nebula.Delay(2, function(){
            s.anchorX = 0.1;
        });

        this.schedule = true;
    },
    update : function (dt) {
        this.s.rotate += 2;
    }
});
