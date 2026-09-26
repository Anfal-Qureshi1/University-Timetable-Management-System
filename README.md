# University Timetable Management System

A web-based academic prototype for managing university timetable data, users, and lecture assignments through a central interface.

> **Project status:** Academic prototype. The repository implements timetable data management and manual assignment workflows. It does **not** currently include an automatic timetable optimization solver or production-grade authentication.

## Purpose

University timetable data can become difficult to manage when departments, semesters, teachers, subjects, rooms, and lecture assignments are handled separately. This project brings those entities into one MongoDB-backed application with dedicated views for different user roles.

## Implemented features

### Role-oriented interface

The project contains separate pages for:

- **Admin**
- **Teacher**
- **Student**

A login endpoint returns the user's configured role so the frontend can direct the user to the appropriate experience.

### Timetable data management

The backend includes models and REST routes for:

- Departments
- Semesters
- Teachers
- Subjects
- Rooms
- Lecture assignments
- Users

Assignments can be created, viewed, updated, deleted, and filtered using fields such as teacher, department, semester, and day.

### Static web frontend

HTML, CSS, and JavaScript pages are served directly by the Express backend, keeping the prototype simple to run locally.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Development | npm, nodemon |

## Repository structure

```text
University-Timetable-Management-System/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── public/
│   │   ├── admin.html
│   │   ├── teacher.html
│   │   ├── student.html
│   │   └── style.css
│   ├── db.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Run locally

### Requirements

- Node.js
- npm
- MongoDB running locally

The current database connection uses:

```text
mongodb://127.0.0.1:27017/timetableDB
```

### Start the application

```bash
cd backend
npm install
npm start
```

Then open:

```text
http://localhost:5000
```

For development with automatic server restart:

```bash
npm run dev
```

## API areas

The Express server exposes routes under:

```text
/api
/api/departments
/api/semesters
/api/teachers
/api/subjects
/api/assignments
/api/rooms
```

The assignment API supports filtering by teacher, department, semester, and day.

## Important limitations

This repository should be treated as a coursework/learning prototype:

- Login currently performs a direct username/password lookup.
- Passwords are stored as plain text in the current model.
- There is no automatic optimization solver in this public version.
- Automatic conflict detection is not implemented in the current backend.
- Production authorization, validation, testing, and deployment hardening would be required before real-world use.

Documenting these limitations is intentional so the repository accurately represents its current implementation.

## Related work

This project represents an earlier timetable-management approach. More advanced scheduling/optimization work can be developed separately without changing the scope of this repository.

## Author

**Anfal Qureshi**  
Computer Science student interested in software systems, databases, scheduling problems, and optimization.
