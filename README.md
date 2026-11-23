# predX — Personal Decision Simulation Engine

**predX** is an intelligent decision simulation engine designed to help you live the decision before you make it.

Whether you are starting a business, changing careers, learning high-impact skills, pursuing higher education, or making a big life transition, **predX** calculates realistic probabilities of success, timeline to results, financial runway sustainability, risk factors, milestone projections, and actionable next steps.

---

## 🚀 Key Features

- **⚡ Dual-Engine Architecture**:
  - **Deterministic Model**: Zero-configuration, offline-ready heuristic simulation based on runway, time commitment, experience, and baseline risk.
  - **AI Deep Simulation**: Integrates with state-of-the-art LLMs (Claude 3.5 Sonnet, Gemini 1.5 Flash, or GPT-4o Mini) for deep, personalized qualitative forecasts.
- **🎯 5 Tailored Decision Modules**:
  1. **Start a Business**: Budget, revenue goals, weekly hours, runway, and risk analysis.
  2. **Change Career**: Compare multiple potential paths side-by-side with timeline estimations.
  3. **Learn a Skill**: Assess mastery timelines, time allocation, and career payoff.
  4. **Move to University**: Degree level, cost, location (India/Abroad), and funding runway.
  5. **Custom Decision**: Free-form simulation of any unique personal or professional choice.
- **📊 Rich Visual Analytics**:
  - Probability of success gauge
  - Runway sustainability warnings
  - Comparative option breakdown
  - 3-scenario forecasts (Best case, Most likely, Worst case)
  - Milestone roadmap
  - Actionable next steps checklist

---

## 💻 Run Locally

Simply open `index.html` in any web browser:
```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

predX runs instantly in any browser without needing Node.js or external servers installed.

---

## ☁️ Deploy to Vercel

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/thesameerpasha/predX.git
   git branch -M main
   git push -u origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
   - **Framework Preset**: Other
   - **Root Directory**: `./`
3. *(Optional)* Add any of the following environment variables in Vercel to unlock AI-powered simulations:
   - `ANTHROPIC_API_KEY` (Anthropic Claude 3.5 Sonnet)
   - `GEMINI_API_KEY` (Google Gemini 1.5 Flash)
   - `OPENAI_API_KEY` (OpenAI GPT-4o Mini)
4. Click **Deploy**.

---

## 📁 Repository Structure

```
├── api/
│   └── analyze.js       # Vercel serverless function (Anthropic, Gemini, OpenAI)
├── index.html           # Standalone single-page simulation application
├── package.json         # Project metadata and configuration
├── vercel.json          # Vercel routing configuration
├── .gitignore           # Git ignore file
└── README.md            # Documentation
```

---

## 📄 License

MIT License. Created by [Sameer Pasha](https://github.com/thesameerpasha).
