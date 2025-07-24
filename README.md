# MathsClarity AI - Math Misconception Detector

A premium web application for detecting math misconceptions and providing detailed feedback to students and teachers.

## Features

- **Luxury Landing Page**: Modern design with animations and call-to-action
- **Authentication**: Role-based access for students and teachers using Clerk
- **File Upload**: Support for image and PDF uploads of math solutions
- **AI Analysis**: Detects mistakes and misconceptions in math solutions
- **Student Dashboard**: View uploaded problems and AI feedback
- **Teacher Dashboard**: Analytics on common misconceptions across students
- **Responsive Design**: Works on all devices with a modern UI

## Tech Stack

- **Frontend**: Next.js (App Router), TailwindCSS, Framer Motion
- **Authentication**: Clerk with role-based access
- **Charts**: Chart.js with react-chartjs-2
- **File Handling**: react-dropzone, react-pdf
- **Icons**: react-icons

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mathsclarity-ai.git
cd mathsclarity-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Teacher Credentials (for mock login)
TEACHER_EMAIL=teacher@mathsclarity.ai
TEACHER_PASSWORD=SecurePassword123!
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Student Flow
1. Sign up for an account
2. Upload a math solution (image or PDF)
3. View the AI analysis of your solution
4. Access your dashboard to see all your submissions

### Teacher Flow
1. Sign in using teacher credentials (teacher@mathsclarity.ai / SecurePassword123!)
2. Access the teacher dashboard
3. View analytics on student misconceptions
4. Review individual student submissions

## Project Structure

```
mathsclarity-ai/
├── public/             # Static assets
├── src/
│   ├── app/            # App router pages
│   │   ├── api/        # API routes
│   │   ├── dashboard/  # Student dashboard
│   │   ├── results/    # Analysis results
│   │   ├── sign-in/    # Sign in page
│   │   ├── sign-up/    # Sign up page
│   │   ├── teacher/    # Teacher dashboard
│   │   └── upload/     # File upload page
│   ├── components/     # Reusable components
│   └── lib/           # Utility functions
├── middleware.ts      # Clerk authentication middleware
└── next.config.js     # Next.js configuration
```

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Chart.js](https://www.chartjs.org/)
