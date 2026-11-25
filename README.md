# Bridge Ready Vouchers

Build a clean, modern, hackathon-ready frontend web app called "BridgeFund" (aligned with UN SDGs 4 & 8) that helps foreign-trained or self-taught professionals identify missing local licensing gaps and unlock micro-grant vouchers for bridging exams—no backend or database required, use React state, localStorage, and rich realistic mock data so everything is immediately interactive.

Design & Theme:

- Use a trustworthy, modern EdTech/FinTech aesthetic with a deep emerald green (#059669) primary color, slate dark text, clean white cards, subtle borders, and responsive mobile-first layout.

- Include a top navbar with the "BridgeFund" logo, an "SDG 4 & 8 Impact" badge, and a role switcher toggle between "Candidate View" and "Sponsor/Evaluator View" for live demoing.

Core Interactive Flow (Single-Page Guided Experience with Tabs/Steps):

1. Hero & Quick Demo Selector:

   - Brief headline: "Turn Unrecognized Skills into Certified Careers."

   - Include 3 one-click "Load Sample Profile" pills so a judge can test instantly: (a) "Foreign-Trained Nurse (Kenya)", (b) "Self-Taught Solar Technician", (c) "Displaced Civil Engineer", plus an option to enter custom skills.

2. Step 1: Skill & Experience Intake:

   - Form/checklist where the candidate selects their trade/profession, years of experience, country of training, and checks off practical competencies they already have (no paper certificate required).

3. Step 2: Automated Gap & Bridging Roadmap:

   - Based on the selected profile, dynamically display a visual "Readiness Score" progress bar (e.g., 75% Ready).

   - Split results into two clear columns: "Verified Competencies (Matched)" in green, and "Required Bridging Modules (Missing)" in amber—showing exact module names, short duration (e.g., "2 Weeks - Local Electrical Code"), and exam fee in KES and USD.

4. Step 3: Micro-Voucher & M-Pesa Stipend Simulator:

   - Let the user click "Apply for Bridging Voucher" on any missing module.

   - Open a sleek modal/card simulating instant micro-grant approval and mobile money disbursement (enter phone number + simulated M-Pesa confirmation receipt with a generated Voucher Code and QR badge).

   - Updating the voucher status automatically updates their Readiness Score to 100% and marks the module as "Funded & In Progress".

5. Sponsor/Evaluator View (via Navbar Toggle):

   - A clean summary dashboard showing total candidates bridged, total micro-grants disbursed, average time-to-certification, and a live list of recently issued bridging vouchers (updating dynamically when a voucher is claimed in Candidate View).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bridge-ready-vouchers.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a78f121f-2840-51a7-a279-b8f996f9df02).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
