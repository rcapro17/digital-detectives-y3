# Digital Detectives – Year 3 (GitHub Pages + optional live teacher dashboard)

## Files
- `index.html`: student game (five missions; 40-minute timer; local progress; required written evidence; online submission)
- `teacher.html`: teacher-only live submissions dashboard and CSV export
- `student-cloud.js`: anonymous student sign-in and Firestore submission
- `firebase-config.js`: project settings you need to fill in
- `firestore.rules`: database rules (replace teacher email before publishing)

## 1. Publish on GitHub Pages
1. Create a PUBLIC repository, e.g. `digital-detectives-y3`.
2. Upload **all files** in this folder to the root of the repo. Do **not** upload the ZIP directly as a single file.
3. Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
4. Student URL: `https://USERNAME.github.io/digital-detectives-y3/`.
5. Teacher URL: `https://USERNAME.github.io/digital-detectives-y3/teacher.html`.

GitHub Pages only hosts static files. To receive submissions from different Chromebooks, you must also complete the Firebase configuration below. Without Firebase the game still works locally, and each team can download a JSON evidence file for manual collection. 

## 2. Enable live submissions (Firebase)
Do this with a school-approved Google/Firebase account and school approval for storing student work in the cloud. Use team nicknames, not students' full names; no photos/files are uploaded to this system. Teacher should inspect locally saved images/folders and the actual report separately.

1. Visit https://console.firebase.google.com/ and create a project. Note that service availability, quotas, and billing requirements can change: verify the current console settings before enabling.
2. In Project settings → General, add a Web app, and copy the Firebase configuration fields (`apiKey`, `authDomain`, `projectId`, `appId`) into `firebase-config.js`. Firebase web API keys are public identifiers, **not secrets**; the Firestore security rules provide access control.
3. Authentication → Sign-in method: enable **Anonymous** (for students) and **Google** (for the teacher). Set the authorized domains for the site and teacher login if prompted by Firebase.
4. Build → Firestore Database: create a database. In the **Rules** tab, paste `firestore.rules`, replacing `REPLACE_WITH_TEACHER_EMAIL` with the exact email address used for teacher Google sign-in. Publish the rules.
5. In `firebase-config.js`, fill in `DETECTIVE_TEACHER_EMAIL` with **the same** teacher email.
6. Commit the changed files to GitHub. Try a student submission on a test browser, and sign in to `teacher.html` with the authorized teacher account. Verify it appears; mark teacher-verified; export CSV.
7. If permission errors occur: ensure Auth providers are on, rules were published, the emails match exactly, and the Firestore database is enabled. A school-managed account may block third-party Firebase services.

**Privacy/security notes:** A static `teacher.html` page is public as a URL, but the underlying submissions are not public: Firestore rules limit reads and teacher verification to the authorized email. Teacher sign-in is required. Never put service-account credentials, private keys or admin SDK secrets in this repository. The teacher email in the rules is public (not a password). No shared secret/password is used. Student scores and checklist states are self-reported except auto-checked quiz questions; review proof before verification. Signed-in anonymous Firebase accounts and browser-local progress are device/browser-specific. Users on shared Chromebooks should reset/clear profiles between groups.

## 3. Workflow during class
1. Each pair enters its team nickname and class (Y3A, etc.).
2. Complete missions 1–3: search for and save a photo, check NASA, organize files.
3. Mission 4 requires **three meaningful written facts on separate lines** and a **research source**, plus the checklist and external report creation.
4. Mission 5 has two automatically checked questions.
5. Finish and click **Submit to teacher**. When Firebase is connected, wait for the **Successfully submitted** message.
6. Teacher opens `teacher.html`, signs in with Google, watches submissions, checks evidence and external files, then clicks **Mark teacher-verified**.
7. Export CSV if you need a record. If network/credentials are unavailable, have each pair click **Download evidence (.json)** and hand in the file using a school-approved service.

## Limitations
- Without Firebase there is **no remote teacher visibility** and no actual online submission confirmation. Downloaded JSON requires manual collection.
- The site does **not** automatically inspect the Chromebook Files app, saved images or Google Docs. Teacher must check those artifacts directly. Written facts/source are submitted as evidence.
- Revisions from the same anonymous browser identity overwrite that team's submission. Teacher verification is preserved when students resubmit; teacher should re-review if evidence changes after verification.
- The dashboard lists teams that **submitted**, not every browser that merely opened the game. It is not live progress tracking.
- Firebase has been integrated in the source code but requires your own project configuration and testing before it works online.
