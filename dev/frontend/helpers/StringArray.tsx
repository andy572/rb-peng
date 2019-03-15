/*

unique() {
        let o = {}, a = [], i, e;
        for (i = 0; e = this[i]; i++) {o[e] = 1}
        for (e in o) {a.push (e)}
        return a;
    }
 */

export{}
declare global {
    interface Array<T> {
        unique(): Array<T>;
    }
}

if (!Array.prototype.unique) {
    Array.prototype.unique = function<T>(): T[] {
        let o = {}, a = [], i, e;
        for (i = 0; e = this[i]; i++) {o[e] = 1}
        for (e in o) {a.push (e)}
        return a;
    }
}