# העלאת הפרויקט ל-GitHub / Push to GitHub

הפרויקט כבר מאותחל עם Git ו-commit ראשון. מה שנותר:

## 1. צרי ריפו חדש ב-GitHub

1. היכנסי ל-**https://github.com** (התחברי אם צריך).
2. לחצי **"+"** למעלה מימין → **"New repository"**.
3. **Repository name:** למשל `DigitalIris` (או כל שם שתרצי).
4. **Public**.
5. **אל תסמני** "Add a README" / "Add .gitignore" — הפרויקט כבר יש בו קבצים.
6. לחצי **"Create repository"**.

## 2. חיבורי הריפו המקומי ל-GitHub

אחרי שיצרת את הריפו, GitHub יראה לך פקודות. במקום זה הרצי **בטרמינל** מתוך תיקיית הפרויקט (`c:\Users\irisp\DigitalIris`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

החליפי:
- `YOUR_USERNAME` — שם המשתמש שלך ב-GitHub
- `YOUR_REPO_NAME` — שם הריפו (למשל `DigitalIris`)

דוגמה:
```bash
git remote add origin https://github.com/irisp/DigitalIris.git
```

## 3. דחיפה (push) ל-GitHub

```bash
git branch -M main
git push -u origin main
```

אם GitHub מבקש **התחברות** — השתמשי ב:
- **Username:** שם המשתמש ב-GitHub
- **Password:** **Personal Access Token** (לא סיסמת החשבון).  
  ליצירת Token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token. סמני scope `repo`.

---

אחרי ה-push, הפרויקט יופיע ב-`https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`.
