var TestScene = Scene.extend({

    init : function () {
        this._super();

        var back = new Button("b1", null, "b2", null, function() {
        	Nebula.Director.replaceScene(MainScene);
        });
        back.x = 60;
        back.y = 400;
        this.addChild(back);
    }
});
