var MainScene = Scene.extend({

    testlist : [
        "序列帧动画测试",
        "点击测试",
        "按键测试",
        "绑定盒测试",
        "Label控件测试"
    ],

    init : function () {
        this._super();

        var thiz = this;
        for (var i in this.testlist) {
            var label = new Label(this.testlist[i]);
            label.x = Nebula.Director.width/2;
            label.y = i * 50 + 100;
            label.setFontSize(32);
            label.setSpacing(30);
            label.index = i;

            label.onmouseup = function (e) {
                console.log(this.getString());
                thiz.changeTo(this.index * 1);
            };
            Nebula.Director.addMouseListener(label, "up");
            this.addChild(label);
        }

    },
    changeTo : function(index) {
        switch (index) {
            case 0:
                Nebula.Director.replaceScene(AnimateTestScene);
                break;
            case 1:
                Nebula.Director.replaceScene(ClickTestScene);
                break;
            case 2:
                Nebula.Director.replaceScene(KeyboardScene);
                break;
            case 3:
                Nebula.Director.replaceScene(BindingboxScene);
                break;
            case 4:
                Nebula.Director.replaceScene(LabelTestScene);
                break;
            default :
                break;
        }
    },
    update : function (dt) {
    }
});
