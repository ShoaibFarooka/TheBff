// a logger class that logs to the console
// takes an input mode, which can be devOnly, if true it will only log in development mode

import consola from "consola";

type Tuple = [any, ...any[]];

export class Logger {
    devOnly: boolean;
    isDev = true;

    constructor(devOnly: boolean = false) {
        this.devOnly = devOnly;
        this.isDev = process.env.NODE_ENV === "development";
    }

    log(...message: Tuple) {
        if (this.devOnly) {
            if (this.isDev) {
                consola.log(...message);
            }
        } else {
            consola.log(...message);
        }
    }

    error(...message: Tuple) {
        if (this.devOnly) {
            if (this.isDev) {
                consola.error(...message);
            }
        } else {
            consola.error(...message);
        }
    }

    warn(...message: Tuple) {
        if (this.devOnly) {
            if (this.isDev) {
                consola.warn(...message);
            }
        } else {
            consola.warn(...message);
        }
    }

    info(...message: Tuple) {
        if (this.devOnly) {
            if (this.isDev) {
                consola.info(...message);
            }
        } else {
            consola.info(...message);
        }
    }

    dir(...message: Tuple) {
        if (this.devOnly) {
            if (this.isDev) {
                console.dir(...message);
            }
        } else {
            console.dir(...message);
        }
    }
}

export const logger = new Logger(true);
export const prodLogger = new Logger(); 