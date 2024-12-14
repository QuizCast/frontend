<img src="https://github.com/user-attachments/assets/4d84857a-fa96-436c-a81c-0dd26a8a1aa7" alt="logo" width="200"/>

# QuizCast Frontend

Welcome to the **QuizCast Frontend** repository! This frontend is built using **Next.js**, providing a sleek and intuitive interface for users to create, join, and participate in quizzes. It integrates with **Supabase** for real-time updates, authentication, and data broadcasting, making the quiz experience seamless and engaging. The UI is styled with **Tailwind CSS** and **Flowbite**, ensuring a modern and responsive design.

---

## Features

- **User-Friendly Interface:** A clean and simple design for hosts and participants, styled with **Flowbite** and **Tailwind CSS**.
- **Supabase Integration:** Handles real-time updates, database changes, and quiz broadcasts.
- **Quiz Hosting and Participation:** Easily create and join quizzes using unique keys.
- **Real-Time Leaderboard:** Automatically updates using Supabase's PostgreSQL changes.
- **Profile Picture Uploads:** Hosts can upload and manage their profile pictures.

---

## Prerequisites

1. **Node.js** (v14.0 or higher) and **npm** installed.
2. A **Supabase** account with access to the API and bucket storage.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/QuizCast/frontend.git
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
NEXT_PUBLIC_SUPABASE_BUCKET=<your_supabase_bucket_name>
NEXT_PUBLIC_BACKEND_URL=<your_backend_url>
NEXT_PUBLIC_DB_TABLE=<your_supabase_table_name>
```

### 4. Run the Application
For development:
```bash
npm run dev
```
The application will be accessible at:
```
http://localhost:3000
```

For production:
1. Build the project:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

---

## Deployment

This application is deployed using **Vercel**. Follow these steps to deploy your own instance:

1. Push the repository to your GitHub or GitLab account.
2. Connect your repository to Vercel.
3. Add the `.env.local` variables to your Vercel project in the environment settings.
4. Deploy the application with a single click!

---

## Styling with Tailwind CSS and Flowbite

This project uses **Tailwind CSS** for utility-first styling and **Flowbite** to provide ready-to-use components, ensuring a clean and responsive design. All UI elements are fully customizable to suit your requirements.

### Installing Tailwind CSS
If you'd like to extend or modify the styles, ensure that Tailwind CSS is correctly configured in `tailwind.config.js`.

### Flowbite Components
Flowbite provides pre-styled components like buttons, modals, alerts, and more. For further customization, check the [Flowbite Documentation](https://flowbite.com/docs/).

---

## Project Structure

```
quizcast-frontend/
│
├── node_modules/         # Installed npm packages
├── public/               # Public assets (images, icons, etc.)
│
├── src/                  # Source code directory
│   ├── app/              # Application-specific components and logic
│   ├── store/            # State management logic
│   ├── styles/           # Global and module-specific styles
│
├── .env.local            # Environment variables
├── .gitignore            # Git ignore file
├── jsconfig.json         # JavaScript configuration for Next.js
├── next.config.mjs       # Next.js configuration
├── package-lock.json     # Lock file for npm dependencies
├── package.json          # Project dependencies and scripts
├── postcss.config.js     # PostCSS configuration for Tailwind
├── README.md             # Project documentation
├── tailwind.config.js    # Tailwind CSS configuration

```

---

## Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the application for production.
- `npm start` - Starts the production server.

---

## Real-Time Functionality

The frontend leverages **Supabase JS SDK** to:
1. Listen to real-time PostgreSQL changes to update the leaderboard dynamically.
2. Allow the host to broadcast messages to subscribers, triggering quiz start events.
3. Enable real-time submission tracking during quizzes.

These features ensure that all participants are in sync during live quizzes.

---

## Contributing ❤️

We welcome contributions from the community! To get started:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

---

## License

This project is open-source and available under the MIT License.

---

## Contact

For questions or feedback, feel free to reach out or open an issue. Happy coding! 🎊
