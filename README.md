# MovingAverageCalc

## Running The Application

This application is built with:

- Frontend: React + Material UI (MUI)
- Backend: Django 5.2

## Prerequisites

Make sure you have the following installed:

- **Python 3.10+** (`python3`) for the backend (Django)
- **pip** or **virtualenv** for managing Python packages
- **Node.js (v18 or later)** for the frontend (React)
- **npm** or **yarn** for managing JavaScript dependencies

## Backend Setup (Django)

1. Navigate to the backend directory:

    -  cd MovingAverageCalc

2. Install requirements:

    - pip install -r requirements.txt

3. Start the back-end server (local host):

    - python3 manage.py runserver

**The Django API will now be available at:**
**http://127.0.0.1:8000/**


## Frontend Setup (React)
1. Navigate to the frontend directory:

    - cd frontEnd

2. Install requirements

    - yarn / npm install

3. Starting the front-end
    - npm start / yarn start

**The React app will run at:**
**http://localhost:3000/**



## Coding Choices

1. **Framework Choice**  
    I chose to write the back-end code in Django, a framework in Python.

2. **Logic Separation**  
    Due to the size of the project, the SMA calculations were done directly in the view function, which would not be optimal in larger, more complex applications. To make the application more scalable, the business logic of the SMA calculations could be separated into a utility function or service and imported to be used in the view.

3. **Rounding Results**  
    The results are rounded to two decimal places to improve readability and provide a consistent format.

4. **Use of Window Logic**  
    To improve the logic’s efficiency further, it would be possible to implement a sliding window approach.

## Assumptions

1. **Simple Moving Average Calculation**  
    The moving average is calculated as a Simple Moving Average (SMA), using the number of observations (`n`) specified by the user.

2. **Instrument Availability**  
    It is assumed that once the list of instruments is fetched, the available instruments will remain consistent throughout the session, meaning no instruments will be removed or added unexpectedly.

3. **Floating-Point Precision**  
    Given that the application performs relatively simple mathematical operations, minor inconsistencies in floating-point precision (due to the use of Python) are not considered critical. If higher precision is needed, it’s recommended to use a dedicated math or numerical library.

4. **Handling Missing or Invalid Values**  
    When encountering missing or invalid values (e.g., `null`, `None`, or `undefined`), these entries are assumed to be ignored and skipped during processing.