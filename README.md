# Tech Stack Buddy AI

<br/>
<p align="center">
  <a href="https://www.openai.com/" >
        <img alt="OpenAI's GPT-3 Turbo (for AI-powered features) - An autoregressive language model that uses deep learning to produce human-like text" src="https://img.shields.io/static/v1.svg?label=OpenAI&message=GPT-4&color=brightgreen" /></a>
    <a href="https://platform.openai.com/docs/assistants/overview" >
        <img alt="OpenAI Assistants API - Leverages GPT to provide conversational and interactive AI experiences" src="https://img.shields.io/static/v1.svg?label=OpenAI&message=Assistants API&color=brightgreen" /></a>
    <a href="https://nodejs.org/" >
        <img alt="Node.js - A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building fast and scalable network applications" src="https://img.shields.io/static/v1.svg?label=Node.js&message=JavaScript runtime&color=lightyellow" /></a>
  <a href="https://expressjs.com/" >
        <img alt="Express.js - Fast, unopinionated, minimalist web framework for Node.js" src="https://img.shields.io/static/v1.svg?label=Express.js&message=Web framework&color=green" /></a>
    <a href="https://www.npmjs.com/" >
        <img alt="Node Package Manager" src="https://img.shields.io/static/v1.svg?label=npm&message=packages&color=lightblue" /></a>
    <a href="https://reactjs.org/" >
        <img alt="React - A JavaScript library for building user interfaces" src="https://img.shields.io/static/v1.svg?label=React&message=UI library&color=blue" /></a>
    <a href="https://github.com/">
        <img alt="GitHub (for repository hosting and project management) - Provides hosting for software development and version control using Git" src="https://img.shields.io/static/v1.svg?label=GitHub&message=hosting&color=lightgrey" /></a>
    <a href="https://opensource.org/license/mit/">
        <img alt="The MIT License" src="https://img.shields.io/static/v1.svg?label=License&message=MIT&color=lightgreen" /></a>
</p>
<br/>

Welcome to the Tech Stack Buddy AI project repository! Tech Stack Buddy AI is your AI-powered assistant, designed to advise on the optimal technology stack for full-stack development projects. Leveraging artificial intelligence, Tech Stack Buddy AI analyzes your project requirements to recommend a customized technology stack that fits your project's needs. Our goal is to streamline the tech stack selection process, making it easier, faster, and more efficient for developers and teams.

## Features

### Back-End Development

- **Database Schema:** We've designed robust schemas to meticulously store user queries, project descriptions, and the AI's recommended tech stacks. This enables a historical view of decisions and preferences, enhancing future recommendations.

- **AI Module Development:** At the heart of Tech Stack Buddy AI is our sophisticated AI module. It engages with users to understand their project requirements and advises on the most suitable tech stack selection. This module is continually learning and evolving with each interaction.

### Front-End Development

- **Interactive UI for Project Descriptions:** Our user interface is crafted to simplify the input of project descriptions. Users can choose between a guided step-by-step wizard or a free-form text area, both designed to gather comprehensive project details efficiently.

- **Displaying Recommendations:** The AI's tech stack recommendations are displayed in an interactive and engaging manner. For each suggestion, users can explore the reasoning behind the choice and examine potential alternatives, empowering informed decision-making.

### Security and Authentication

- **JWT for User Authentication:** Security is paramount. Users can create accounts, submit projects, and save their recommendation histories securely using JSON Web Tokens (JWT) for authentication.

- **API Security:** We ensure that all interactions between the AI, the database, and the users are safeguarded against unauthorized access, employing best practices in API security.

## Getting Started

To start using Tech Stack Buddy AI, clone this repository to your local machine:

```bash
git clone https://github.com/Maximilian93B/StackBuddyAI.git
```

Navigate to the project directory:

```bash
cd StackBuddyAI
```

### Prerequisites

Ensure you have the following installed:

- Node.js and npm
- Python (for AI module development)
- MongoDB (for database)

### Installation

Install backend dependencies:

1. **Install backend dependencies:**

```bash
cd server
npm install
```

2. **Start the backend server:**

```bash
npm start
```

3. **Install frontend dependencies:**

```bash
cd ../client
npm install
```

4. **Start the frontend application:**

```bash
npm start
```

Your Tech Stack Buddy AI should now be running locally!

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit pull requests. If you have suggestions or encounter issues, please open an issue in the repository.

## License

This project is licensed under the [MIT License][mit-license] - see the LICENSE.md file for details.

## Acknowledgments

- Thanks to all the contributors who spend their time and effort helping to make Tech Stack Buddy AI better.
- Special thanks to the open-source community for the invaluable resources and support.

[mit-license]: <https://github.com/Maximilian93B/StackBuddyAI/blob/main/LICENSE>
