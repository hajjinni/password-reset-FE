# SecureAuth – Frontend

A modern and responsive React-based frontend for a secure authentication system featuring **login, registration, and password reset with email verification**.

---

## Features

* User Login & Registration
* Forgot Password with Email Reset Link
* Secure Password Reset Flow with Token Validation
* Reset Link Expiry Handling (30 minutes)
* Password Visibility Toggle
* Password Strength Indicator
* Error Handling & Alerts
* Modern UI with responsive design

---

## Tech Stack

* React
* React Router DOM
* Axios
* Bootstrap + Custom CSS
* React Icons

---

##  Project Structure

```
src/
 ├── components/
 │    └── Navbar.js
 ├── pages/
 │    ├── Login.js
 │    ├── Register.js
 │    ├── ForgotPassword.js
 │    ├── ResetPassword.js
 │    └── NotFound.js
 ├── services/
 │    └── api.js
 ├── App.js
 ├── App.css
 └── index.js
```

##  Getting Started

### 1. Clone the repository

```
git clone https://github.com/your-username/password-reset-frontend.git
cd password-reset-frontend
```

### 2. Install dependencies

```
npm install
```

### 3. Run the app locally

```
npm start
```

---

##  Build for Production

```
npm run build
```

---

##  Deployment

### Netlify

* Build Command:

```
npm run build
```

* Publish Directory:

```
build
```

* Add Environment Variable:

```
REACT_APP_API_URL=your-backend-url
```

---

##  Password Reset Flow

1. User enters email in **Forgot Password**
2. Backend verifies user and sends reset link via email
3. User clicks the link
4. Token is validated
5. User sets a new password
6. Password is updated and token is cleared

---

##  Important Notes

* Ensure backend is deployed before using frontend
* Reset link works only if backend `CLIENT_URL` is correctly set
* Reset token expires after configured time

---

##  Security Considerations

* Passwords are securely handled by backend
* Reset tokens are time-bound
* Avoid exposing API URLs and secrets

