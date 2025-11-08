# **Buskarro: Bus Reservation System**

Buskarro is a Bus Reservation System developed with Django (backend) and React.js (frontend). This application streamlines the booking process by offering a user-friendly interface for customers to book bus tickets, generate tickets, and receive email notifications. Administrators can schedule buses, view schedules, and manage the system efficiently.

## **Live Demo**
[Access the Buskarro System Here](https://buskarro.onrender.com/) 

---

## **Features**
- **User Functionality:**
  - Book bus tickets online.
  - Generate tickets with booking details.
  - Receive email notifications for successful bookings.

- **Admin Functionality:**
  - Schedule buses and define routes.
  - View and manage bus schedules.
  - Manage bookings and user data.

---

## **Technologies Used**
- **Backend:** Django 5.1.3
- **Frontend:** React.js 18.2.0 with React Router
- **Database:** SQLite (or any other database supported by Django)
- **Email Integration:** To notify users of bookings.
- **Build Tools:** Webpack 5, Babel

---

## **React Frontend**

The application now features a modern React.js frontend! 

### Key Features:
- Component-based architecture
- Client-side routing with React Router
- Responsive design
- Modern UI/UX with the original Buskarro styling

### Access the React App:
Navigate to `/react/` to use the React-based interface.

For detailed React documentation, see [REACT_README.md](REACT_README.md)

---

## **Installation**

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/senku0-0/Buskarro.git
   cd Buskarro
   ```

2. Install Python Dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Install Node.js Dependencies (for React):
   ```bash
   npm install
   ```

4. Build the React Frontend:
   ```bash
   npm run build
   ```

5. Run Django Migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the Development Server:
   ```bash
   python manage.py runserver
   ```

7. Access the application:
   - Traditional UI: `http://localhost:8000/`
   - React UI: `http://localhost:8000/react/`

--- 🎮 How to Use

### **For Users:**
1. **Sign Up or Log In**:
   - Visit the deployed link or run the application locally.
   - Create an account or log in to your existing account.
2. **Search for Buses**:
   - Enter your departure and destination locations.
   - Select your preferred date to view available buses.
3. **Book Tickets**:
   - Choose your desired bus.
   - Select seats and complete the booking process.
4. **Receive Your Ticket**:
   - After booking, a ticket will be generated.
   - Check your email for a confirmation message and ticket details.

### **For Admins:**
1. **Log In to the Admin Dashboard**:
   - Use your admin credentials to access the dashboard.
   - Navigate to the admin portal (usually `/admin` in the URL for Django apps).
2. **Manage Bus Schedules**:
   - Add new buses, define routes, and update schedules.
3. **Monitor Bookings**:
   - View and manage all bookings and user data efficiently.

