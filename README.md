# FunnelQuiz - Smart Quiz Assessment Platform

<div align="center">

![FunnelQuiz Banner](https://via.placeholder.com/800x200/667eea/ffffff?text=FunnelQuiz+-+Smart+Quiz+Platform)

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-success?style=for-the-badge&logo=netlify)](https://causalfunnelquiz.netlify.app/)
[![GitHub Repo](https://img.shields.io/badge/💻_Source_Code-GitHub-black?style=for-the-badge&logo=github)](https://github.com/SURIYAPRASAAD04/FunnelQuiz)
[![Video Demo](https://img.shields.io/badge/🎥_Video_Demo-Watch_Now-red?style=for-the-badge&logo=googledrive)](https://drive.google.com/drive/folders/1IQX6zi-sM3tq_T2g5QGJ2psZij4fDcrH?usp=sharing)

**A modern, secure, and anti-malpractice quiz platform built for the digital age**

</div>

---

## Project Highlights

<table>
<tr>
<td width="33%" align="center">
<img src="https://via.placeholder.com/80x80/667eea/ffffff?text=🎨" width="60">
<h3>Modern UI/UX</h3>
<p>Glassmorphism design with responsive layout</p>
</td>
<td width="33%" align="center">
<img src="https://via.placeholder.com/80x80/f093fb/ffffff?text=🔒" width="60">
<h3>Anti-Malpractice</h3>
<p>Full-screen mode with tab-switch detection</p>
</td>
<td width="33%" align="center">
<img src="https://via.placeholder.com/80x80/4ade80/ffffff?text=⚡" width="60">
<h3>Real-time</h3>
<p>Dynamic questions with live timer</p>
</td>
</tr>
</table>

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/SURIYAPRASAAD04/FunnelQuiz.git

# Navigate to project directory
cd FunnelQuiz

# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000 in your browser
```

---

## Features Showcase

<details>
<summary>🔍 <strong>Click to explore features</strong></summary>

### 🎯 **Core Features**
- ✅ **15 Dynamic MCQs** - Fresh Computer Science questions every time
- ⏱️ **Smart Timer** - 30-minute auto-submission with 2-min per question guide
- 🚫 **Malpractice Prevention** - Tab-switch, refresh, and full-screen exit detection
- 📱 **Mobile Responsive** - Seamless experience across all devices
- 🧭 **Free Navigation** - Jump between questions using side panel

### 🛡️ **Security Features**
- 🔒 Enforced full-screen mode during quiz
- 👁️ Tab visibility monitoring
- 🚨 Auto-submit on suspicious activity
- 🔄 Refresh/reload prevention

### 📊 **Results & Analytics**
- 📈 Detailed score breakdown
- 📋 Question-by-question review
- 📤 Share results functionality
- ⬇️ Download score report
- 🔁 Retake or start new quiz options

</details>

---

## Tech Stack

<div align="center">

| Frontend | Styling | API | Deployment |
|:--------:|:-------:|:---:|:----------:|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | ![API](https://img.shields.io/badge/OpenTDB-API-orange?style=for-the-badge) | ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white) |

</div>

---

## Application Flow

```mermaid
graph TD
    A[🏁 Start Screen] --> B[📧 Email Registration]
    B --> C[📋 Quiz Instructions]
    C --> D[🔒 Full Screen Mode]
    D --> E[❓ Question 1/15]
    E --> F[🧭 Navigate Questions]
    F --> G[⏱️ Timer Running]
    G --> H{⏰ Time Up?}
    H -->|Yes| I[📤 Auto Submit]
    H -->|No| J[✋ Manual Submit]
    I --> K[📊 Results Screen]
    J --> K
    K --> L[🔁 Retake Quiz]
    K --> M[🆕 New Quiz]
    L --> A
    M --> A
```

---

## Screenshots

<div align="center">

### Start Screen
![Start Screen](https://i.ibb.co/pjH1Pnnq/Screenshot-2025-07-31-105718.png)

### Quiz Interface
![Quiz Screen](https://via.placeholder.com/600x300/f093fb/ffffff?text=Quiz+Interface+-+Question+Display)

### Results Dashboard
![Results Screen](https://via.placeholder.com/600x300/4ade80/ffffff?text=Results+Dashboard+-+Score+Analysis)

</div>

---

## Project Structure

```
FunnelQuiz/
├── 📁 src/
│   ├── 📄 App.jsx
│   ├── 📄 index.jsx
│   ├── 📄 Routes.jsx
│   ├── 📁 components/
│   │   └── 📁 ui/
│   ├── 📁 pages/
│   │   ├── 📁 quiz-start-screen/
│   │   ├── 📁 quiz-question-screen/
│   │   └── 📁 quiz-results-screen/
│   ├── 📁 services/
│   │   └── 📄 quizApiService.js
│   ├── 📁 styles/
│   │   └── 📄 tailwind.css
│   └── 📁 utils/
├── 📄 package.json
└── 📄 README.md
```

---

## Challenges Overcome

<table>
<tr>
<th>Challenge</th>
<th>Solution</th>
<th>Impact</th>
</tr>
<tr>
<td>Preventing Malpractice</td>
<td>Full-screen API + event listeners for tab switching, refresh attempts</td>
<td>Secure exam environment</td>
</tr>
<tr>
<td>Timer Management</td>
<td>JavaScript intervals with auto-submission triggers</td>
<td>Fair time enforcement</td>
</tr>
<tr>
<td>Mobile Responsiveness</td>
<td>Tailwind CSS utilities + separate mobile navigation</td>
<td>Cross-device compatibility</td>
</tr>
<tr>
<td>State Management</td>
<td>Centralized React hooks across components</td>
<td>Smooth user experience</td>
</tr>
</table>

---

## Developer

<div align="center">

### **Suriya Prasaad**

[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://suriyaprasaad.netlify.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/suriyaprasaad/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:suriyaprasaadjayasugumar04@gmail.com)

</div>

---

<div align="center">

### 🙏 **Thank you for checking out FunnelQuiz!**

If you found this project helpful, please consider giving it a ⭐

[![GitHub stars](https://img.shields.io/github/stars/SURIYAPRASAAD04/FunnelQuiz?style=social)](https://github.com/SURIYAPRASAAD04/FunnelQuiz/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/SURIYAPRASAAD04/FunnelQuiz?style=social)](https://github.com/SURIYAPRASAAD04/FunnelQuiz/network/members)

---

**Made with ❤️ for CausalFunnel**

</div>
