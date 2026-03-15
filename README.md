# University Timetable Management System

This project is a **web-based solution** designed to automate and simplify the complex task of university timetable management. It addresses the common issues of manual systems, such as scheduling conflicts, time-consuming updates, and the lack of a centralized platform for all university stakeholders.

---

## ### Problem Statement

Manual timetable management often leads to:

* 
**Time inefficiency**: Creating schedules manually takes significant effort.


* 
**Conflicts**: Frequent clashes between teachers, rooms, and class sections.


* 
**Update Difficulties**: Hard to manage and communicate changes once a schedule is set.


* 
**Fragmentation**: No single system for administrators, teachers, and students to access information.



## ### Objectives

The primary goal is to **automate timetable management**.

* 
**Accuracy**: Drastically reduce scheduling conflicts and errors.


* 
**Security**: Provide role-based access to ensure data integrity.


* 
**Accessibility**: Ensure easy timetable viewing for all user types.



---

## ### System Features

### **Role-Based Access Control**

The system provides three distinct roles with specialized features:

| Role | Key Features |
| --- | --- |
| **Admin** | Manage teachers, departments, semesters, subjects, and rooms; set daily time slots; view, preview, and export full timetables.

 |
| **Teacher** | Assign lectures to available slots with built-in conflict detection; view, edit, or delete personal schedules.

 |
| **Student** | View timetables filtered by department and semester; export schedules as CSV files.

 |

---

## ### Technology Stack

* 
**Frontend**: HTML, CSS, JavaScript.


* 
**Backend**: Node.js, Express.js.


* 
**Database**: MongoDB.


* 
**Development Tools**: VS Code, Web Browser.



---

## ### System Workflow

1. 
**Authentication**: User logs into the system.


2. 
**Redirection**: Based on the role, a specific dashboard (Admin, Teacher, or Student) opens.


3. 
**Data Retrieval**: The frontend fetches relevant data from the backend API.


4. 
**Dynamic Rendering**: The timetable is displayed dynamically on the UI.



---

## ### Contributors

* 
**Anfal Qureshi** (24PWBCS1069) 
