"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AxiosConfiguration_1 = __importDefault(require("../../../integration/domain/config/AxiosConfiguration"));
class NaturalEventsService {
    constructor(baseURL) {
        this.axios = (0, AxiosConfiguration_1.default)(baseURL);
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.get(`/categories`);
                const categories = response.data.categories && response.data.categories.map((category) => {
                    const { id, title } = category;
                    return { id, title };
                });
                return { success: true, body: categories };
            }
            catch (error) {
                console.log(error);
                return { success: false, error };
            }
        });
    }
    getEvents(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.get('/events', {
                    params: Object.assign({}, params)
                });
                const events = response.data.events && response.data.events.map(
                //TODO: if possible destructure and return in better format!
                (event) => {
                    const { id, title, description, closed, categories, sources, geometry } = event;
                    return { id,
                        title,
                        description,
                        closed,
                        categories,
                        sources,
                        geometry };
                });
                return { success: true, body: events };
            }
            catch (error) {
                console.log(error);
                return { success: false, error };
            }
        });
    }
    getSources() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.get('/sources');
                const sources = response.data.sources && response.data.sources.map((s) => {
                    const { id, title, source } = s;
                    return { id, title, source };
                });
                return { success: true, body: sources };
            }
            catch (error) {
                console.log(error);
                return { success: false, error };
            }
        });
    }
}
exports.default = NaturalEventsService;
