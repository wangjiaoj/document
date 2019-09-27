/***
 * 单例模式
 *  */
var Singleton = function(name) {
    this.name = name;
    this.instance = null;
}
Singleton.prototype.getName = function() {
    console.log(name);
}
Singleton.prototype.getInstance = function(name) {
    if (!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
}
var a = Singleton.getInstance('alice');
var b = Singleton.getInstance('Liza');
alert(a === b)