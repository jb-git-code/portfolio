# Jayanshu Bhardwaj — Portfolio

A minimal, single-page developer portfolio. Static HTML/CSS/JS, no build step, ready to deploy on Netlify.

## Folder structure

```
portfolio/
├── index.html
├── netlify.toml
├── README.md
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    ├── images/
    │   └── profile.jpg
    └── resume/
        └── Jayanshu_Bhardwaj_Resume.pdf
```

## 1. Set up EmailJS (2 minutes, free)

The contact form is wired for [EmailJS](https://www.emailjs.com) but needs your own account IDs
to actually send mail. Until you add them, the form falls back to opening the visitor's email app
instead — the site still works, it just won't send silently in the background.

1. Go to **https://www.emailjs.com** and sign up (free tier: 200 emails/month).
2. **Add an email service**: Dashboard → *Email Services* → *Add New Service* → choose Gmail →
   connect `projayanshu22@gmail.com`. Note the **Service ID** it generates (e.g. `service_abc123`).
3. **Create a template**: Dashboard → *Email Templates* → *Create New Template*. Use these variable
   names so it matches the form fields already in `index.html`:
   - `{{from_name}}` — sender's name
   - `{{reply_to}}` — sender's email
   - `{{message}}` — their message
   Example template body:
   ```
   New message from your portfolio:

   From: {{from_name}} ({{reply_to}})
   Message:
   {{message}}
   ```
   Set **Reply To** on the template to `{{reply_to}}` so you can hit "reply" directly.
   Note the **Template ID** (e.g. `template_xyz789`).
4. **Get your Public Key**: Dashboard → *Account* → *General* → copy the **Public Key**.
5. Open `js/main.js` and fill in the top of the file:
   ```js
   const EMAILJS_CONFIG = {
     PUBLIC_KEY:  "your_public_key_here",
     SERVICE_ID:  "service_abc123",
     TEMPLATE_ID: "template_xyz789",
   };
   ```
6. Save, redeploy, and test the form — you should get an email within a few seconds.

That's it — no backend, no server, no API keys exposed beyond the public key (which is designed
to be public; EmailJS enforces sending limits per account, not secrecy of that key).

## 2. Customize

- **Resume**: swap `assets/resume/Jayanshu_Bhardwaj_Resume.pdf` for an updated version — keep the
  same filename, or update the `href` in the nav button in `index.html`.
- **Photo**: replace `assets/images/profile.jpg` with a new image (same filename, or update the
  `src` in the About section).
- **Colors/fonts**: all design tokens live at the top of `css/style.css` under `:root`.
- **Content**: project cards, skills, and the "log" (git-log-styled timeline of education/achievements)
  are plain HTML in `index.html` — edit directly.

## 3. Deploy to Netlify

**Option A — drag and drop (fastest):**
1. Go to **https://app.netlify.com/drop**
2. Drag the whole `portfolio` folder onto the page.
3. Done — Netlify gives you a live URL immediately. You can rename it under
   *Site settings → Change site name*, or attach a custom domain.

**Option B — Git-based (recommended for future updates):**
1. Push this folder to a new GitHub repo.
2. In Netlify: *Add new site → Import an existing project → connect GitHub → select the repo.*
3. Build settings: leave **Build command** empty and set **Publish directory** to `.` (this is
   already set in `netlify.toml`, so Netlify should detect it automatically).
4. Deploy. Every future push to the repo auto-deploys.

## Notes

- No frameworks, no `node_modules`, no build step — it's plain HTML/CSS/JS, so it works identically
  locally (just open `index.html` in a browser) and on Netlify.
- The site is fully responsive and respects `prefers-reduced-motion`.
