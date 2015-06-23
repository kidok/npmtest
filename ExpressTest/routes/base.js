var express = require('express');
var router = express.Router();
debugger
function MiduoRouter() {

}

//浅拷贝  
function extendCopy(p) {　　
    var c = {};　　
    for (var i in p) {　　　
        c[i] = p[i];　　
    }　　
    c.uber = p;　　
    return c;　
}

//深拷贝  
function deepCopy(p, c) {　　
    var cc = c || {};　　
    for (var i in p) {　　　
        if (typeof p[i] === 'object') {　　　
            c[i] = (p[i].constructor === Array) ? [] : {};　　　　
            deepCopy(p[i], c[i]);　　　
        } else {　　　
            c[i] = p[i];　　　
        }　　
    }　　
    return c;
}

Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() {
        return that.apply(this, arguments);
    };
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};

//MiduoRouter.prototype = Object.create(router.prototype);
MiduoRouter = router.clone();
//deepCopy(router, MiduoRouter);
module.exports = MiduoRouter;

// router.use(function(req, res, next) {
//   // .. some logic here .. like any other middleware
//   console.log("common router");
//   next();
// });

// module.exports = router;
