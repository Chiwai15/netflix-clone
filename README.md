# **Netflix Clone**

A responsive Netflix Clone built with **ReactJS**. This project replicates the Netflix homepage, complete with a movie carousel, user authentication (sign-up/sign-in), and dynamic layout.

## **Features**
- 🎬 **Homepage Layout**:  
  Includes a movie carousel with dynamic title cards.
- 🔑 **Authentication Pages**:  
  Sign-up and sign-in forms for user management.
- 🎨 **Custom Components**:  
  - Navbar
  - Footer
  - Title Cards
- 📂 **Assets**:  
  Contains preloaded images, icons, and data for a seamless user experience.

## **Project Structure**
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
### **3. Start the Development Server**
```
npm run dev
```
### **4. Terminal Output**
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
Open your browser and navigate to http://localhost:5173/ to view the application.

Screenshots

![Product Preview](public/preview.png)

	•	Homepage with Carousel
	•	Sign-up and Sign-in Pages

Technologies Used

	•	ReactJS: Frontend framework
	•	Vite: Development server and build tool
	•	CSS: Styling
	•	Git: Version control

Future Improvements

	•	🎥 Add a video player for streaming content.
	•	🛠️ Implement backend services for real-time authentication.
	•	🌐 Deploy to a live environment.