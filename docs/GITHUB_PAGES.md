# פרסום ב-GitHub Pages / Deploy to GitHub Pages

## מה הוגדר

- **base:** האתר יופיע בכתובת `https://IrisPelled.github.io/DigitalIris/`
- **build:pages:** `npm run build:pages` — בונה את האתר ויוצר `dist/404.html` (נדרש לרouting ב-Pages)
- **GitHub Action:** כל push ל-`main` מריץ build ומעלה ל-GitHub Pages

## הפעלת GitHub Pages (פעם אחת)

1. היכנסי לריפו: **https://github.com/IrisPelled/DigitalIris**
2. **Settings** → **Pages** (בתפריט השמאלי).
3. תחת **Build and deployment**:
   - **Source:** GitHub Actions
4. שמרי. אין צורך לבחור branch או folder — ה-workflow ידאג להעלאה.

## אחרי ה-push

- אחרי שדחפת את השינויים (כולל ה-workflow וה-`base`) ל-`main`, ה-Action ירוץ אוטומטית.
- ב-**Actions** תראי אם ה-build וההעלאה הצליחו.
- האתר יהיה זמין ב: **https://IrisPelled.github.io/DigitalIris/**

## הרצה מקומית עם base של Pages

```bash
npm run build:pages
npx vite preview --base /DigitalIris/
```

## הערה

- ה-backend (server) לא רץ ב-GitHub Pages. אם האפליקציה משתמשת ב-API, תצטרכי לפרוס את השרת elsewhere (למשל Render, Railway) ולהגדיר את כתובת ה-API ב-frontend.
