"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const callback0 = function (req, res) {
    res.send('This is from callback0');
};
const callback1 = function (req, res) {
    res.send('This is from callback1');
};
app.get('/', 
// (req: Request, res: Response, next) => {
//     console.log('the response will be sent to the next function');
//     next();
// },
// callback
[callback0, callback1]);
app.listen(port, () => console.log(`Application is running on port ${port}`));
