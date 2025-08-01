# 🔐 MailXposed – Check if Your Email Was Breached

MailXposed is a full-stack web app that checks if your email address has been exposed in known data breaches.

## 🌐 Live Demo
🔗 [Live Website](https://mailxposed.onrender.com) (Link will be updated after deployment)

## 🚀 Features

- 📧 Check email for data breach history  
- 🌗 Toggle between Light and Dark Mode  
- 📊 Risk Meter with personalized safety tips  
- ✅ Real-time feedback with clear results  
- 🔒 Built with Node.js + Express + HTML/CSS/JS  

## 📸 Screenshots

### 💡 Light Mode  
![Light Mode](assets/light-mode.png)

### 🌗 Dark Mode  
![Dark Mode](assets/dark-mode.png)

## 📁 Project Structure

```MailXposed/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── routes/
│   └── breachRoutes.js
├── index.js
├── db.js
├── .env
├── .gitignore
└── README.md
```
## 🛠️ Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: JSON-based data
- Deployment: Render (to be added)

## 🧠 How It Works

1. User enters an email
2. Domain is extracted (e.g., `gmail.com`)
3. App checks for matching breached records in database
4. Shows risk level and breach details

## 📥 Installation

```bash
git clone https://github.com/Vaishnaviiii-23/MailXposed.git
cd MailXposed
npm install
node index.js
Then open public/index.html in your browser.
```
## 🧑‍💻 Author
Vaishnavi P Poojari

