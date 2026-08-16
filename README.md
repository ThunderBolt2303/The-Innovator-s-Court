<div align="center">
  <img src="https://raw.githubusercontent.com/ThunderBolt2303/The-Innovator-s-Court/main/frontend/public/vite.svg" alt="Logo" width="80" height="80">
  <h1 align="center">The Innovator's Court: AI-Powered Cybersecurity Framework</h1>
  <p align="center">
    A proactive, machine learning-driven defense system by <strong>Team Code Benders</strong>.
    <br />
    <a href="#about-the-project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/ThunderBolt2303/The-Innovator-s-Court/issues">Report Bug</a>
    ·
    <a href="https://github.com/ThunderBolt2303/The-Innovator-s-Court/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#the-challenge">The Challenge</a></li>
        <li><a href="#our-solution">Our Solution</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#architecture">Architecture</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#team-code-benders">Team Code Benders</a></li>
  </ol>
</details>

## About The Project

Modern critical infrastructure—healthcare, transportation, financial services, and public utilities—is increasingly interconnected. This connectivity brings immense benefits but dramatically increases the exposure to cyberattacks, malicious requests, anomalous injections, and sophisticated threats.

### The Challenge
* **Reactive Systems:** Traditional security systems often detect threats only after suspicious activity has already caused damage.
* **Identification Challenge:** It is notoriously difficult to distinguish normal system behavior from previously unseen malicious behavior.
* **Delayed Response:** Manual investigation bottlenecks the response time when threats occur at high speeds.

### Our Solution
**How can we build a proactive cybersecurity framework that can detect anomalies early, recognize suspicious patterns, and automatically respond to threats before they compromise critical systems?**

The Innovator's Court framework continuously analyzes incoming requests and system activity to identify potentially malicious behavior.
- 🎯 **Detect Anomalies:** Utilizes `Isolation Forest` models to identify behavior that significantly differs from normal activity.
- 🧠 **Recognize Patterns:** Uses Centroid-based Pattern Recognition to compare suspicious entries with previously observed attack signatures.
- ⚡ **Assess & Respond:** An ML Decision Engine classifies activities as Normal, Suspicious, or High-Risk, triggering either autonomous mitigation or flagging for human intervention.

### Built With

* **Frontend / Dashboard:** React.js, Tailwind CSS, Recharts, Vite
* **Backend & API:** FastAPI, Uvicorn, Pydantic, RESTful APIs
* **AI / ML Core:** Python, Scikit-Learn (Isolation Forest, Clustering), Pandas, NumPy
* **Storage & Infrastructure:** SQLite (Prototyping) / PostgreSQL (Production), SQLAlchemy, Docker

---

## Architecture

Our framework operates through a pipeline of specialized layers:

1. **Input Layer:** Captures incoming User/API requests, system activity, and network events.
2. **Data Processing Layer:** Extracts relevant features, normalizes data, and prepares it for ML inference.
3. **AI Detection Layer:** The Isolation Forest model analyzes the behavior to flag potential malicious injections.
4. **Pattern Engine:** Measures similarity against known behavioral centroids (e.g., SQLi, DDoS, BruteForce).
5. **Decision Engine:** Combines anomaly and similarity scores to classify the threat level.
6. **Response Layer:** Executes decision-based responses (Human Intervention vs. Autonomous Action).
7. **Feedback & Learning Layer:** Records detected events to continuously improve detection accuracy over time.

---

## Getting Started

To get a local copy of the prototype up and running, follow these steps.

### Prerequisites

* Docker & Docker Compose
* Alternatively, Node.js (v20+) and Python (v3.11+) for manual setup.

### Installation (Docker - Recommended)

1. Clone the repo
   ```sh
   git clone https://github.com/ThunderBolt2303/The-Innovator-s-Court.git
   ```
2. Navigate to the project directory
   ```sh
   cd The-Innovator-s-Court
   ```
3. Spin up the containers
   ```sh
   docker-compose up --build
   ```
4. Access the dashboard at `http://localhost:80` (or `http://localhost:5173` if running manually). The backend API and Swagger UI will be available at `http://localhost:8000/docs`.

---

## Team Night Owls

* **Yaksh Maangat**
* **Mahi Chaudhary**
* **Uday Chaudhary**
* **Kanishka Singh**

<div align="center">
  <p>Built for The Innovator's Court Hackathon</p>
</div>
