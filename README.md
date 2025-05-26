# **Netflix Clone**

Built a responsive Netflix homepage clone using ReactJS, integrating the TMDB API for dynamic movie data. Implemented Firebase Authentication for user sign-up/sign-in and managed auth state with Redux. Features include a movie carousel, responsive layout, and secure user session handling.

## **Demo - Try it**
https://netflix-clone-omega-silk.vercel.app/

## **Features**
-  **Homepage Layout**:  
  Includes a movie carousel with dynamic title cards.
-  **Authentication Pages**:  
  Sign-up and sign-in forms for user management.
-  **Custom Components**:  
  - Navbar
  - Footer
  - Title Cards
-  **Assets**:  
  Contains preloaded images, icons, and data for a seamless user experience.

## **Project Structure**
```
├── public/                # Static assets (banners, favicons)  
├── src/  
│   ├── assets/            # Icons, images, and reusable data  
│   ├── components/        # Reusable UI components (Navbar, Footer, etc.)  
│   ├── pages/             # App pages (Home, Login, Player)  
│   ├── App.jsx            # Main application file  
│   ├── main.jsx           # Entry point for the app  
│   └── App.css            # Global styling  
├── package.json           # Project dependencies and scripts  
├── vite.config.js         # Vite configuration  
├── .gitignore             # Files to exclude from version control  
├── eslint.config.js       # Linter configuration  
└── README.md              # Project documentation  
```
## **Installation and Usage**

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/netflix-clone.git
cd netflix-clone
```
### **2. Install Dependencies**
```
npm install
```
### **3. Setup Environment Variables**
This project requires environment variables to be configured.  
Follow these steps to set up your `.env` file:

1. Copy the `.env.example` file to create a new `.env` file:

   ```sh
   cp .env.example .env
   ```

2. Open the .env file and add your API keys and Firebase credentials

### **4. Start the Development Server**
```
npm run dev
```
### **5. Terminal Output**
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
Open your browser and navigate to http://localhost:5173/ to view the application.



Screenshots

![Git Preview](public/demo.gif)
![Product Preview](public/preview.png)

	•	Homepage with Carousel
	•	Sign-up and Sign-in Pages

Technologies Used

	•	ReactJS: Frontend framework
	•	Vite: Development server and build tool
	•	CSS: Styling
	•	Git: Version control

Future Improvements

	•	Add a video player for streaming content.
	•	Implement backend services for real-time authentication.
	•	Deploy to a live environment.


