---
description: Start the Neurosonic development server
---

1. Navigate to the frontend directory and start the dev server.
   ```bash
   cd frontend
   npm run dev
   ```

2. The Vite dev server will start at `http://localhost:5173`

3. Open the browser automatically (optional).
   ```powershell
   Start-Process "http://localhost:5173"
   ```

**Expected Output:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

**Troubleshooting:**
- If port 5173 is in use, Vite will try 5174, 5175, etc.
- Press `q` to quit the dev server
- Press `r` to restart the server
