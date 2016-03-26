

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var Loader = {

    sourcefile : "resource.json",
    //Requests Queue
    RQ : [],

    display : function (src) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "Bold 20px";
        context.textAlign = "left";
        context.fillStyle = "black";
        context.fillText("Loading " + src, canvas.width/4, canvas.height/2);

        //test
        // for(var t = Date.now();Date.now() - t <= 1000;);
    },

    _loadData : function(path, callback) {
        console.log("load " + path);
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = path;
        if (callback) {
            // script.onreadystatechange = function () {
            //     if (this.readyState == 'loaded') callback();
            // }
            this.display("Script " + path);
            script.onload = callback;
        }
        head.appendChild(script);
    },
    _loadImage : function (name, path, callback) {
        console.log("load " + path);
        var img = new Image();
        img.onload = function() {
            Loader.display("Texture " + name);
            Texture.addTexture(name, img);
            if (callback) {
                callback();
            }
        }
        img.src = path;
    },
    _init : function() {
        if (typeof(Resource) != "undefined" && Resource) {
            for (var i in Resource){
                for (var j in Resource[i]) {
                    if (Array.isArray(Resource[i])){
                        this.RQ.push({t:i, v:Resource[i][j]});
                    } else {
                        this.RQ.push({t:i, k: j, v: Resource[i][j]});
                    }
                }
            }
        } else {
            throw new URIError("The resource is not accessible.");
        }
        this._request();
    },
    _request : function() {
        if (this.RQ.length > 0) {
            var source = this.RQ.shift();
            if (source.t == "src") {
                this._loadData(source.v, this._request.bind(this));
            } else if (source.t == "texture") {
                this._loadImage(source.k, source.v, this._request.bind(this));
            } else {
                // other data
            }
        } 
        // complete
        else {
            if (typeof(Nebula) == "undefined") {
                throw new Error("Nebula load error!");
            }

            Nebula.Director.init(canvas, context);

            document.onkeydown = Nebula.Director.onkeydown;
            document.onkeyup = Nebula.Director.onkeyup;
            document.onkeypress = Nebula.Director.onkeypress;

            Nebula.Director.runScene(new MainScene());
        }
    },
    loading : function(){
        //init resource 
        this._loadData(this.sourcefile, this._init.bind(this));
    }
};
Loader.loading();