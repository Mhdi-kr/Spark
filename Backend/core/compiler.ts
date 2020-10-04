import os from 'os';
import util from 'util';
import chalk from 'chalk';
import { EventEmitter } from 'events';
import { exec } from 'child_process';

const execSync = util.promisify(exec);
export const CompilerEvents: EventEmitter = new EventEmitter();

interface execAnswer {
    stdout?: string;
    stderr?: string;
}

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
    public async cpp(
        filename: string,
        callback: (((args: any) => any) | undefined) = undefined,
        callEvent: (string | undefined) = undefined):
        Promise<execAnswer | ((args: any) => any) | boolean> {
        // Working for windows powershell
        console.log(chalk.bgCyan.black('Executing file'));
        let answer: execAnswer | null = null;
        if (os.platform() === 'win32') {
            answer = await execSync(`cd user; g++ -o ${filename} ${filename}.cpp; .\\${filename}.exe `, {
                shell: 'powershell.exe'
            });
        } else if (os.platform() === 'linux') {
            answer = await execSync(`cd user && g++ -o ${filename} ${filename}.cpp && ./${filename} `);
        }
        console.log(chalk.bgGreenBright.black('File executed'));
        if (!callback) {
            if (callEvent) {
                return CompilerEvents.emit(callEvent!, answer);
            }
            return answer!;
        }
        return callback(answer);
    }

}

// const compiler: Compiler = new Compiler();

CompilerEvents.addListener('start-cpp', async (filename: string, callback: any, callEvent: any) => {
    await new Compiler().cpp(filename, callback, callEvent);
});



export default (new Compiler());