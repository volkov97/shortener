const { exec: execOnCallbacks } = require("child_process");
const util = require("util");
const fs = require("fs/promises");
const path = require("path");

const exec = util.promisify(execOnCallbacks);

async function monitorProcess() {
  setInterval(async () => {
    const { pid } = process;

    const { stdout } = await exec(
      `ps -p ${pid} -o pid,vsz=MEMORY,pcpu -o comm,args=ARGS`
    );

    const log = `${new Date()}\n${stdout}`;

    await fs.writeFile(path.resolve(__dirname, "../cpu-memory.log"), log, {
      flag: "a",
    });
  }, 2000);
}

module.exports = { monitorProcess };
