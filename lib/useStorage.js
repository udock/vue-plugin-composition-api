"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
function default_1(key, options) {
    var val = vue_1.ref(options.defaultValue);
    var value = localStorage.getItem(key);
    if (value !== null) {
        val.value = value;
    }
    return vue_1.computed({
        get: function () {
            return val.value;
        },
        set: function (value) {
            if (!options.readonly) {
                localStorage.setItem(key, value + '');
                val.value = value;
            }
            else {
                val.value = '';
                vue_1.nextTick(function () {
                    val.value = localStorage.getItem(key);
                });
                console.warn('try change readonly localStorage: ', key);
            }
        }
    });
}
exports.default = default_1;
