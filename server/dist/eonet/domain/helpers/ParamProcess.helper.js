"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paramProcess = (body, defaults = {}) => {
    if (Object.keys(body).length <= 0) {
        return defaults;
    }
    const result = {};
    for (const [key, value] of Object.entries(body)) {
        if (value == null && defaults.hasOwnProperty(key)) {
            result[key] = value;
        }
        else if (value != null) {
            result[key] = value;
        }
    }
    return result;
};
exports.default = paramProcess;
