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
exports.CompilerEvents = void 0;
const util_1 = __importDefault(require("util"));
const chalk_1 = __importDefault(require("chalk"));
const events_1 = require("events");
const child_process_1 = require("child_process");
const execSync = util_1.default.promisify(child_process_1.exec);
exports.CompilerEvents = new events_1.EventEmitter();
class Compiler {
    /**
     * @author Alireza Kiani <raidenshadow.github.io>
     * @param {string} filename - filename for execution
     * @param {function} callback - callback interface for that kind of implementation
     * @param {string} callEvent - event name which is created for calling after execution
     * @return {object} { stdout, stderr }
     * @return {void} callback({stdout, stderr})
     * @return {boolean} CompilerEvents.emit(callEvent, { stdout, stderr })
     */
    cpp(filename, callback = undefined, callEvent = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            // Working for windows powershell
            console.log(chalk_1.default.bgCyan.black('Executing file'));
            const answer = yield execSync(`cd user; g++ -o ${filename} ${filename}.cpp; .\\${filename}.exe `, {
                shell: 'powershell.exe'
            });
            console.log(chalk_1.default.bgGreenBright.black('File executed'));
            if (!callback) {
                if (callEvent) {
                    return exports.CompilerEvents.emit(callEvent, answer);
                }
                return answer;
            }
            return callback(answer);
        });
    }
}
// const compiler: Compiler = new Compiler();
exports.CompilerEvents.addListener('start-cpp', (filename, callback, callEvent) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Compiler().cpp(filename, callback, callEvent);
}));
exports.default = (new Compiler());
