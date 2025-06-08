// Marx Logging Helper Module
// Basic color-coded logging functions for console output

const colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    reset: "\x1b[0m"
};

function error(msg) {
    console.log(colors.red + "[Error]" + colors.reset, msg);
}

function warn(msg) {
    console.log(colors.yellow + "[Warn]" + colors.reset, msg);
}

function info(msg) {
    console.log(colors.blue + "[Info]" + colors.reset, msg);
}

function success(msg) {
    console.log(colors.green + "[Success]" + colors.reset, msg);
}

module.exports = { 
    error, 
    warn, 
    info, 
    success 
};