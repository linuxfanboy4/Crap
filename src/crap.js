const readline = require('readline');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');
const { exec } = require('child_process');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const os = require('os');

const genAI = new GoogleGenerativeAI("AIzaSyAdGqKbO-omh_CM6thvPFPvh9Z7G5l6rrk");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const HISTORY_PATH = path.join(os.homedir(), '.crap_history.json');

class CrapTerminal {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.greenBright('crap> '),
      completer: this.autoComplete.bind(this)
    });
    this.currentShell = 'crap';
    this.editorContent = [];
    this.editorMode = false;
    this.initHistory();
    this.bindEvents();
  }

  async initHistory() {
    if (!fs.existsSync(HISTORY_PATH)) {
      fs.writeFileSync(HISTORY_PATH, JSON.stringify([]));
    }
  }

  bindEvents() {
    this.rl.on('line', async (input) => {
      await this.processCommand(input.trim());
      this.rl.prompt();
    }).on('close', () => {
      console.log(chalk.yellow('\nExiting Crap...'));
      process.exit(0);
    });
  }

  async processCommand(input) {
    await this.saveToHistory(input);
    if (this.editorMode) return this.handleEditor(input);
    
    const [cmd, ...args] = input.split(' ');
    switch(cmd.toLowerCase()) {
      case 'edit': this.editFile(args[0]); break;
      case 'grep': this.grep(args[0], args[1]); break;
      case 'sed': this.sed(args[0], args[1], args[2]); break;
      case 'find': this.find(args[0], args[1]); break;
      case 'http.get': this.httpGet(args[0]); break;
      case 'http.post': this.httpPost(args[0], args[1]); break;
      case 'switch': this.switchShell(args[0]); break;
      case 'ai': this.aiQuery(input.slice(3)); break;
      case 'help': this.showHelp(); break;
      case 'clear': console.clear(); break;
      default: this.executeSystemCommand(input);
    }
  }

  async aiQuery(prompt) {
    try {
      const result = await model.generateContent(prompt);
      console.log(chalk.cyan(result.response.text()));
    } catch (error) {
      console.log(chalk.red('AI Error:', error.message));
    }
  }

  async httpGet(url) {
    try {
      const response = await axios.get(url);
      console.log(chalk.blue(`Status: ${response.status}\n`), response.data);
    } catch (error) {
      console.log(chalk.red('HTTP Error:', error.message));
    }
  }

  grep(pattern, file) {
    if (!file || !fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');
    const regex = new RegExp(pattern);
    content.split('\n').forEach(line => {
      if (regex.test(line)) console.log(chalk.yellow(line));
    });
  }

  switchShell(shell) {
    exec(`which ${shell}`, (error) => {
      if (error) return console.log(chalk.red('Shell not found'));
      console.log(chalk.blue(`Switching to ${shell}...`));
      const child = exec(shell, { stdio: 'inherit' });
      child.on('exit', () => {
        console.log(chalk.blue(`Returning to Crap...`));
        this.rl.prompt();
      });
    });
  }

  async saveToHistory(command) {
    const history = JSON.parse(fs.readFileSync(HISTORY_PATH));
    history.push({ timestamp: new Date(), command });
    fs.writeFileSync(HISTORY_PATH, JSON.stringify(history));
  }

  autoComplete(line) {
    const commands = ['edit', 'grep', 'sed', 'find', 'http.get', 'http.post', 'switch', 'ai', 'help', 'clear'];
    const hits = commands.filter(c => c.startsWith(line));
    return [hits.length ? hits : commands, line];
  }

  showHelp() {
    const helpText = `
    ${chalk.underline('CRAP Terminal Commands')}
    edit <file>    - Open text editor
    grep <pattern> <file> - Search patterns
    sed <pattern> <replace> <file> - Text substitution
    find <dir> <name> - Search files
    http.get <url> - HTTP GET request
    http.post <url> <data> - HTTP POST request
    switch <shell> - Switch shells
    ai:<prompt>    - AI query
    help           - Show this help
    clear          - Clear screen
    `;
    console.log(helpText);
  }

  editFile(file) {
    if (fs.existsSync(file)) {
      this.editorContent = fs.readFileSync(file, 'utf8').split('\n');
    }
    this.editorMode = true;
    console.log(chalk.blue(`Editing ${file} (type 'save' to finish)`));
    this.rl.setPrompt(chalk.magenta('edit> '));
    this.rl.prompt();
  }

  handleEditor(input) {
    if (input === 'save') {
      fs.writeFileSync(file, this.editorContent.join('\n'));
      this.editorMode = false;
      this.rl.setPrompt(chalk.greenBright('crap> '));
      console.log(chalk.green('File saved'));
    } else {
      this.editorContent.push(input);
    }
  }

  executeSystemCommand(cmd) {
    exec(cmd, (error, stdout, stderr) => {
      if (error) return console.log(chalk.red(`Error: ${error.message}`));
      if (stderr) return console.log(chalk.yellow(stderr));
      console.log(stdout);
    });
  }
}

new CrapTerminal().rl.prompt();
