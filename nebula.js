var Loader = {
    jslist : [],
    coreJS : [
        "core/Class.js",
        "core/Director.js",
        "core/Texture.js",
        "core/Common.js",
        "core/Scene.js",
        "core/Sprite.js"
    ],
    extJS : [
        "ext/Button.js",
        "ext/Label.js"
    ],
    textureCount : 0,
    tc : 0,

    _loadScript : function (src, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        if (callback) {
            script.onreadystatechange = function () {
                if (this.readyState == 'loaded') callback();
            }
            script.onload = callback;
        }
        head.appendChild(script);
    },
    _loadImage : function (name) {
        var img = new Image();
        img.onload = function() {
            console.log("load Texture " + name);
            Texture.addTexture(name, img);
            Loader.textureCount++;
            if (Loader.textureCount == Loader.tc) {
                Loader.loadSrc();
            }
        }
        img.src = Resource.texture[name];
    },

    loadCore : function () {
        if (this.coreJS.length > 0) {
            var src = this.coreJS.shift();
            Loader._loadScript(
                src,
                function () {
                    console.log("loadJS " + src);
                    Loader.loadCore();
                }
            )
        } else {
            this.loadExt();
        }
    },

    loadExt : function () {
        if (this.extJS.length > 0) {
            var src = this.extJS.shift();
            Loader._loadScript(
                src,
                function () {
                    console.log("loadJS " + src);
                    Loader.loadCore();
                }
            )
        } else {
            this.loadTexture();
        }
    },
    loadTexture : function () {
        var i;
        for (i in Resource.texture) {
            this._loadImage(i);
        }
    },
    loadSrc : function() {
        if (this.jslist.length > 0) {
            var src = this.jslist.shift();
            Loader._loadScript(
                src,
                function () {
                    console.log("loadJS " + src);
                    Loader.loadSrc();
                }
            )
        } else {
            this.onReady();
        }
    },
    request : function () {
        this.jslist = Resource.src;
        for (i in Resource.texture) {
            this.tc += 1;
        }
        this.loadCore();
    }
}

Loader.onReady = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    Nebula.Director.init(canvas, context);

    document.onkeydown = Nebula.Director.onkeydown;
    document.onkeyup = Nebula.Director.onkeyup;
    document.onkeypress = Nebula.Director.onkeypress;

    Nebula.Director.runScene(new MainScene());
}

Loader.request();