Kora Live - GitHub Pages edition

1. Upload index.html to the ROOT of your GitHub repository (not inside another folder).
2. In GitHub repository Settings > Pages, choose Deploy from a branch, select main and /(root), then Save.
3. Open the published Pages URL. Go to Settings inside the site, enter your NEW Football-Data.org API token, and press Save.
4. Return to Matches and press Refresh.

Security: The token is stored in this browser's localStorage, not in the public repository. Since this is a static website, visitors can expose a token they enter in their own browser. Do not embed a personal token in index.html. Revoke/rotate any token previously pasted into chat.

The provider's free plan may restrict competitions and requests. If the browser reports Failed to fetch, the provider/network may block browser requests (CORS), in which case GitHub Pages alone cannot proxy the API; a serverless backend is required.
