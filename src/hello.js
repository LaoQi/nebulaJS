var HelloScene = Scene.extend({
    init : function () {
        this._super();
        var s = new Sprite("doge");
        s.x = Nebula.Director.width/2 - s.width/2;
        s.y = Nebula.Director.height/2 - s.height/2;
        this.addChild(s);
    }
});
