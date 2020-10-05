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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const crypto_random_string_1 = __importDefault(require("crypto-random-string"));
const compiler_1 = __importDefault(require("./core/compiler"));
const app = express_1.default();
app.use(express_1.default.json());
app.post('/cpp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filename = crypto_random_string_1.default({ length: 5 });
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, `./user`))) {
            fs_1.default.mkdirSync(path_1.default.join(__dirname, `./user`));
        }
        fs_1.default.writeFileSync(path_1.default.join(__dirname, `./user/${filename}.cpp`), req.body.input);
        const result = yield compiler_1.default.cpp(filename);
        fs_1.default.unlinkSync(path_1.default.join(__dirname, `./user/${filename}.cpp`));
        fs_1.default.unlinkSync(path_1.default.join(__dirname, `./user/${filename}.exe`));
        // result = { stdout, stderr }
        return res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        console.log(chalk_1.default.bgRed.black('Couldn\'t execute properly'));
        return res.status(500).send(error);
    }
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
