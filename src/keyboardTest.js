var KeyboardScene = Scene.extend({
    init : function () {
        this._super();

        //test onkeydown
        s = new Sprite("doge");
        s.x = Nebula.Director.width/2;
        s.y = Nebula.Director.height/2;
        s.zIndex = 50;
        s.anchorX = 0.5;
        s.anchorY = 0.5;
        s.rotate = 20;
        this.s1 = s;
        this.addChild(s);

        this.schedule = true;

        Nebula.Director._onkeydown = this.onkeydown;
        Nebula.Director._onkeyeventObj = this;
    },
    onkeydown : function (keycode, thiz) {
        switch (keycode) {
            case 32 :
                thiz.s1.setScale(thiz.s1.scale == 3 ? 1 : 3);
                break;
            case 37:
                thiz.s1.x -= 5;
                break;
            case 38:
                thiz.s1.y -= 5;
                break;
            case 39:
                thiz.s1.x += 5;
                break;
            case 40:
                thiz.s1.y += 5;
                break;
            default :
                break;
        }
    },
    update : function (dt) {
        this.s1.rotate -= 1;
    }
});
