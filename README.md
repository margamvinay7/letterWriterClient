# Letter Writer | [Backend Repo Link](https://github.com/margamvinay7/LetterWriterServer)

Letter Writer is a full-stack web application that allows users to create, edit, and save text-based letters. Users can sign in using Google authentication and store their letters directly in Google Drive.

## 🚀 Features

### 1️⃣ **User Authentication (Google OAuth)**
- Sign up and log in using Google authentication.
- Secure session management using JWT authentication.

### 2️⃣ **Letter Creation & Editing**
- A simple text editor for writing and formatting letters.
- Supports bold, italic, underline, strikethrough, and ordered lists.
- Ability to save drafts before uploading to Google Drive.

### 3️⃣ **Google Drive API Integration**
- Save letters directly to Google Drive in Google Docs format.
- Retrieve and view saved letters.
- Proper OAuth scopes and permissions implemented for security.
- Automatic folder organization in Google Drive ("Letters" folder).

### 4️⃣ **Deployment**
- **Frontend:** Deployed on Vercel ([Live App](https://letter-writer-client.vercel.app/)).
- **Backend:** Deployed on Render ([Server Repo](https://github.com/margamvinay7/LetterWriterServer)).

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js with Express
- **Authentication:** Google OAuth via Firebase Auth
- **Storage API:** Google Drive API
- **Deployment:** Vercel (Frontend) & Render (Backend)
- **Version Control:** GitHub

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/margamvinay7/letterWriterClient.git
cd letterWriterClient
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Create a `.env` file
Copy `.env.example` to `.env` and add your environment variables.

### 4️⃣ Run the application
```sh
npm run dev
```

## 📌 Backend Repository
You can find the backend code here: [Server Repo](https://github.com/margamvinay7/LetterWriterServer)

## 📜 License
This project is licensed under the MIT License.

