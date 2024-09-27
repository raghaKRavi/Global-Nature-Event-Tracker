"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paramProcess = (body, defaults = {}, model) => {
    if (Object.keys(body).length <= 0) {
        return defaults;
    }
    const result = {};
    for (const [key, value] of Object.entries(body)) {
        if (value == null && defaults.hasOwnProperty(key)) {
            result[key] = value;
        }
        else if (value != null && model.hasOwnProperty(key)) {
            result[key] = value;
        }
    }
    return result;
};
exports.default = paramProcess;
