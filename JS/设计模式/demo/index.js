/***
 * 单例模式
 *  */
var Singleton = function(name) {
    this.name = name;
    this.instance = null;
}
Singleton.prototype.getName = function() {
    console.log(this.name);
}
Singleton.getInstance = function(name) {
    if (!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
}

var a = Singleton.getInstance('alice');
var b = Singleton.getInstance('Liza');
a.getName();
b.getName()
console.log(a === b);