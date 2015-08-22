var Texture = {
    _textures : [],

    getTexture : function (img) {
        var i;
        for (i in this._textures) {
            if (this._textures[i].key == img) {
                return this._textures[i].value;
            }
        }
        console.log("can`t found texture " + img);
    },

    addTexture : function (k, v) {
        this._textures.push({
            key : k,
            value : v
        });
    }
};
