# CRAP Terminal - Advanced Command Line Interface

## Overview

CRAP Terminal (Command-line Rapid Action Processor) is a highly advanced and extensible command-line interface designed to streamline and enhance your terminal experience. Built with Node.js, this tool integrates a variety of powerful functionalities, including file manipulation, text processing, HTTP requests, and AI-driven queries, all within a unified interface. CRAP Terminal is currently in its beta phase, with ongoing development aimed at refining its features and expanding its capabilities.

## Features

- **File Editing**: Seamlessly edit text files directly within the terminal using the built-in editor.
- **Text Processing**: Utilize `grep` and `sed` commands for advanced pattern searching and text substitution.
- **File Search**: Efficiently locate files within directories using the `find` command.
- **HTTP Requests**: Perform `GET` and `POST` requests with ease, directly from the terminal.
- **Shell Switching**: Dynamically switch between different shell environments without exiting the terminal.
- **AI Integration**: Leverage the power of Google's Generative AI for intelligent query responses.
- **Command History**: Maintain a comprehensive history of executed commands for easy retrieval and reference.
- **Auto-Completion**: Enhance productivity with intelligent command auto-completion.

## Installation

To install CRAP Terminal, execute the following commands in your terminal:

```bash
wget https://raw.githubusercontent.com/linuxfanboy4/Crap/refs/heads/main/src/crap.js
node crap.js
```

This will download the latest beta version of CRAP Terminal and initiate the interface.

## Usage

Upon launching CRAP Terminal, you will be greeted with a prompt (`crap>`), indicating that the terminal is ready to accept commands. Below is a detailed guide on how to utilize the various features:

### File Editing

To edit a file, use the `edit` command followed by the file path:

```bash
crap> edit /path/to/file.txt
```

This will open the file in the built-in editor. Make your changes and type `save` to save and exit the editor.

### Text Processing

#### Grep

Search for patterns within a file using the `grep` command:

```bash
crap> grep pattern /path/to/file.txt
```

#### Sed

Perform text substitution with the `sed` command:

```bash
crap> sed pattern replacement /path/to/file.txt
```

### File Search

Locate files within a directory using the `find` command:

```bash
crap> find /path/to/directory filename
```

### HTTP Requests

#### GET Request

Perform a `GET` request to a specified URL:

```bash
crap> http.get https://api.example.com/data
```

#### POST Request

Send a `POST` request with data to a specified URL:

```bash
crap> http.post https://api.example.com/data '{"key":"value"}'
```

### Shell Switching

Switch to a different shell environment:

```bash
crap> switch bash
```

To return to CRAP Terminal, simply exit the shell.

### AI Integration

Query the integrated AI for intelligent responses:

```bash
crap> ai What is the capital of France?
```

### Command History

CRAP Terminal maintains a history of all executed commands, stored in `~/.crap_history.json`. This allows for easy retrieval and reference of past commands.

### Auto-Completion

Enhance your productivity with the built-in auto-completion feature. Start typing a command and press `Tab` to see suggestions.

## Development Status

CRAP Terminal is currently in its beta phase. While the core functionalities are operational, the development team is actively working on refining the tool and adding new features. A stable release is anticipated in the coming days.

## Contributing

As CRAP Terminal is still under development, contributions are highly encouraged. If you wish to contribute, please fork the repository and submit a pull request with your changes. Ensure that your code adheres to the project's coding standards and includes appropriate documentation.

## License

CRAP Terminal is released under the MIT License. For more details, refer to the LICENSE file in the repository.

## Support

For any issues or feature requests, please open an issue on the GitHub repository. Your feedback is invaluable in shaping the future of CRAP Terminal.

---

CRAP Terminal is designed to be a powerful and versatile tool for developers and system administrators alike. With its comprehensive set of features and ongoing development, it aims to redefine the command-line experience. Stay tuned for updates and enhancements as we work towards the stable release.
