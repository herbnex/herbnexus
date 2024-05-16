# Herb Nexus

Herb Nexus is a web 3.0 application connecting licensed Herbal practioner with people all over the world in a live enviroment. It also provides personalized herbal remedy recommendations based on user-input symptom utilziing openAI.

### Prerequisites

Before you can run this project locally, you'll need the following installed on your machine:

- **Node.js**: Required for npm. [Download Node.js](https://nodejs.org/en/download/)
- **Git**: For cloning and managing source code. [Install Git](https://git-scm.com/downloads)

## Contributing

Your contributions are welcome! Whether you're improving features, fixing bugs, or enhancing documentation, here’s how to contribute:

1. **Fork** the repository on GitHub.
   Visit [Herb Nex GitHub Repository](https://github.com/herbnex/nexus) and click the "Fork" button to create a copy of the repository in your account.

2. **Clone** your fork to your local machine.

```bash
git clone https://github.com/your-username/herbnexus.git
cd herbnexus
```

3. **Install Dependenciesy**

```bash
npm install
```

4. **Create a .env file in the root of your project and add your environment variables. For example:**

```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_DATABASE_URL=your_database_url
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

5. **Create** a new branch for your changes.

```bash
git checkout -b feature/YourFeatureName
```

6. **Commit** changes to your branch.

```bash
git add .
git commit -m "Describe the change"
```

7. **Push** your changes and submit a **pull request**.

```bash
git push origin feature/YourFeatureName
```

8. **Pull** Open a **pull request**.
   Go to your fork on GitHub, select your branch, and click "New Pull Request" to begin the process of merging your changes into the main project.

## Merge to Production

**Switch to the main branch**

```bash
git checkout main
```

**Merge changes from develop to main**

```bash
git merge develop
```

**Push the changes to the remote main branch**

```bash
git push origin main
```

## Step-by-Step Instructions for Merging with a Commit Message

**Continue in the Editor:**

If you're in a terminal-based text editor like Vim (which seems to be the case based on your message), you're already in the right place to write your commit message.

**Write Your Commit Message:**

In Vim, press i to enter insert mode. This allows you to start typing in the editor.
Replace the existing content or add your specific reason for the merge directly below the comments. A typical message might be, "Merging development changes for feature XYZ into main".

**Save and Exit:**

After typing your commit message, press Esc to exit insert mode.
Type :wq (write and quit) and then press Enter to save your changes and close the editor. This will complete the commit for the merge.

If you wish to abort the merge because you’ve changed your mind or need to make further changes first, you can:
Press Esc to ensure you are not in insert mode.
Type :q! and press Enter to quit without saving changes.

## License

Herb Nexus is released under the ISC License.

```

```
