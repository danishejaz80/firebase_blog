# Getting Started

First clone this repo by opening terminal/powershell and typing this command there

```
git clone https://github.com/danishejaz80/firebase_blog.git <your-project-name>
```

After cloning successfully, navigate to project directory

```
cd <your-project-name>
```

## Setting up Firebase Functions

### navigate to functions directory

```
cd functions/
```

### Install package using package manager tool

```
$ npm install
```

### Global install firebase tools (Skip if you done the step)

```
$  npm install -g firebase-tools
```

### Login to your firebase account (Skip if you done the step)

```
$ firebase login
```

### Setup firebase in the boilerplate

```
$ firebase init
$
$ ...

? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices.
 ◯ Database: Deploy Firebase Realtime Database Rules
 ◯ Firestore: Deploy rules and create indexes for Firestore
 ◉ Functions: Configure and deploy Cloud Functions
 ◯ Hosting: Configure and deploy Firebase Hosting sites
❯◯ Storage: Deploy Cloud Storage security rules

=== Project Setup

? Please select an option: Use an existing project
i  Using project {your-project-id} ({your-project-name})

continue with your preferred configuration.

✔  Firebase initialization complete!
```

### Configuration

navigate to `functions/utils/` and open `config.js` into any editor and update your firebase app configurations here.

### Test

```
$ npm build && firebase serve
```

### Deploy

```
$ npm build && firebase deploy
```

Note: if your are using free account then use `Emulator`

```
firebase emulators:start
```
