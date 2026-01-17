# MusterRoll
Eliminate fake or proxy attendance in colleges, universities, and organizations with Musterroll. Attendance is recorded only after **biometric authentication/voice recognition** and **physical presence within the classroom or organization’s geofence**, ensuring no one can mark attendance on someone else’s behalf or from outside the premises.

With **advanced analytics** and **attendance logs**, administrators can easily track attendance trends, identify frequently bunked lectures, and assess student retention per professor. The system replaces outdated, register-based attendance methods with a **mobile-based attendance clock-in**, eliminating manual roll calls, paperwork, and year-long record storage.

### Features
1. **Authentication** - Both employee and admin can signup/signin and both portals (employee and admin) have different application layout. API - Firebase auth.
2. **Geofencing** - An admin can draw a geofence on his organisation's map and employee can mark his attendance only when he is inside that geofence. API - Google maps
3. **Biometric authentication** - Employee is only clocked in/out when there biometric is authenticated successfully and also when they are within there shift time set by the admin. API - FingerprintAIO
4. **Statistics** - Get statistics of all presentees, absentees, early leavers and late comers of daily, weekly, monthly or custom range. Chart types - Pie, Doughnut, Bar, Area, Line, Group bar. API - chart.js
5. **Search and filter functionality** - Search members of organisation and filter them by their respective departments and designations.
6. **Attendance log** - Navigate to employee's profile and get attendance status of everyday
7. **Real time updation** - Update data for realtime with the help of firebase
8. **Backend Integration** - Backend integrated with cloud firestore.
9. **Upload picture** - Capture photo with camera or get from gallery and upload it on Firebase Storage

## Prerequisites
Download the following:
* [Node.js LTS version](https://nodejs.org/en/)
* [Android Studio](https://developer.android.com/studio)

## Frontend
Navigate to cloned directory in the terminal and run `npm install` to install node_modules and required dependencies. After execution, run `npm install -g @ionic/cli native-run cordova-res` to install the Ionic CLI.

### Run on browser
Navigate to cloned directory in the terminal and run `ionic serve`. As execution finishes open http://localhost:8100/ in your web browser.

### Run on android
Run `ionic build` first and then run `ionic cap run android` by navigating to working directory in terminal.
