import express from 'express';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import crs from 'crypto-random-string';
import Compiler from './core/compiler';

const app = express();

app.use(express.json());

app.post('/cpp', async (req, res) => {
    try {
        const filename = crs({ length: 5 });
        if (!fs.existsSync(path.join(__dirname, `./user`))) {
            fs.mkdirSync(path.join(__dirname, `./user`));
        }
        fs.writeFileSync(path.join(__dirname, `./user/${filename}.cpp`), req.body.input);
        const result = await Compiler.cpp(filename);
        fs.unlinkSync(path.join(__dirname, `./user/${filename}.cpp`));
        fs.unlinkSync(path.join(__dirname, `./user/${filename}.exe`));
        // result = { stdout, stderr }
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        console.log(chalk.bgRed.black('Couldn\'t execute properly'));
        return res.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});