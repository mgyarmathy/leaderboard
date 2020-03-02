# leaderboard-client

A React application that allows users to view, add, edit, and delete player 
scores.

## Development

- **Initialize**: `npm install` - Download dependencies specified in 
`package.json`.
- **Run**: `npm run start` - Runs the app in development mode at 
http://localhost:3000.
- **Build**: `npm run build` - Builds the app for production to the `build/`
folder.
- **Deploy**: `aws s3 sync build/ s3://leaderboard.gyarmathy.me/`
- **Test**: 
    - `npm run cy:run:local` - Execute Cypress e2e tests against the
    local environment (http://localhost:3000)
    - `npm run cy:run:prod` - Execute Cypress e2e tests against the prod 
    environment (https://leaderboard.gyarmathy.me)

---

This project was bootstrapped with 
[Create React App](https://github.com/facebook/create-react-app).

