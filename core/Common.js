Nebula.Ract = function (xx, yy, ww, hh) {
    return {x:xx, y:yy, w:ww, h:hh};
};

Nebula.Delay = function (dt, func, args) {
    var d = {
        _lasttime : dt,
        _func : func,
        _args : args
    };

    Nebula.Director._delay.push(d);
};
