# MusterRoll
Eliminate fake/proxy attendance in colleges, universities and organizations with MusterRoll. Attendance is recorded only after **biometric authentication/voice recognition** and **physical presence within the classroom or organization’s geofence**, ensuring no one can mark attendance on someone else’s behalf or from outside the premises.

With **advanced analytics** and **attendance logs**, administrators can easily track attendance trends, identify frequently bunked lectures, and assess student retention per professor. The system replaces outdated, register-based attendance methods with a **mobile-based attendance clock-in**, eliminating manual roll calls, paperwork, and year-long record storage.

> 📌 **Application Demo** is provided below for reference

## Features
1. **Authentication** - Both employee and admin can signup/signin into their corresponding portal. API - Firebase Auth.
2. **Geofencing** - An admin can draw a geofence on his organisation's map and employee can clock-in (mark his attendance) only when he is inside that geofence. API - Google maps
3. **Biometric authentication** - Employee is only clocked in/out when there biometric is authenticated successfully and also when they are within there shift time set by the admin. API - FingerprintAIO
4. **Statistics** - Get statistics of all presentees, absentees, early leavers and late comers of daily, weekly, monthly or custom range. Chart types - Pie, Doughnut, Bar, Area, Line, Group Bar. API - Chart.JS
5. **Search and filter functionality** - Search members of organisation and filter them by their respective departments and designations.
6. **Attendance log** - Navigate to employee's profile and get attendance status of everyday
7. **Real time updation** - Update data for realtime with the help of firebase
8. **Backend Integration** - Backend integrated with cloud firestore.
9. **Upload picture** - Capture photo with camera or get from gallery and upload it on Firebase Storage

## 🚀 Running the Application

### Prerequisites
Download the following:
* [Node.js LTS version](https://nodejs.org/en/)
* [Android Studio](https://developer.android.com/studio)

### Installation
Navigate to cloned directory in the terminal and run `npm install` to install node_modules and required dependencies. After execution, run `npm install -g @ionic/cli native-run cordova-res` to install the Ionic CLI.

### Run on browser
Navigate to cloned directory in the terminal and run `ionic serve`. As execution finishes, goto http://localhost:8100/ in your web browser.

### Run on android
Run `ionic build` first and then run `ionic cap run android` by navigating to working directory in terminal.

## Application Demo Recordings

### 1. Geofence (Google Maps API)
[➡️ Watch HQ(1080p) Video On Youtube](https://youtube.com/shorts/MM6HsNscYfI?feature=share)

This video demonstrates how to add fences to the map in this project from the admin panel. It also showcases various map features, including satellite view, enabling/disabling terrain and shop labels, and 3D navigation inside city

https://github.com/user-attachments/assets/8eb485a6-c0b7-40ff-8a09-278332019361

<br>

### 2. Statistics (Chart.JS)
View *1-day statistics* using **pie and donut charts**, or analyze data over a *custom date range* with **bar, line, and area graphs**.  
These visualizations help organizers efficiently track and understand analytics.

https://github.com/user-attachments/assets/69f7576d-5922-413a-827a-a3b7fc2cc01a

<br>

### 3. Admin Panel
A basic overview and tour of the admin panel, highlighting **today’s attendance status page**, along with **analytics** and **geofence features**.

https://github.com/user-attachments/assets/5b995570-5cc0-40c3-8b89-f6c1d9245c18

<br>

### 4. Attendee Panel
A basic overview and tour of the employee panel, showcasing **authentication, clock-in/clock-out functionality, geofence validation, salary updates with time tracking and attendace logs**

https://github.com/user-attachments/assets/931ce78d-593e-4f96-9518-004f82b1d74f

<br>

### 5. Search & Filter Functionality
Easily **search and filter members** by **designation** and **department**

https://github.com/user-attachments/assets/9f2e4b80-84f6-46ac-945b-4c72baaaed6a

<br>
