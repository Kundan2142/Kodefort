import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Common Day 1 tasks for all internships
    const commonDay1Tasks = [
      { title: "Create Professional LinkedIn Account", description: "Create a professional LinkedIn account if you don't have one", youtubeUrl: null, order: 1 },
      { title: "Follow Kodefort LinkedIn Page", description: "Follow the official Kodefort LinkedIn page", youtubeUrl: null, order: 2 },
      { title: "Publish LinkedIn Post", description: "Publish a LinkedIn post mentioning you joined the 120 Hours Internship at Kodefort, share your learning goals and tag Kodefort", youtubeUrl: null, order: 3 },
      { title: "Explore Kodefort Website", description: "Visit the Kodefort website and read about the company's mission, services, and areas of work", youtubeUrl: null, order: 4 },
      { title: "Read Internship Guidelines", description: "Read the Internship Guidelines and Code of Conduct carefully", youtubeUrl: null, order: 5 },
      { title: "Complete Intern Profile", description: "Complete your intern profile by providing the required personal and academic details", youtubeUrl: null, order: 6 },
      { title: "Write Self-Introduction", description: "Write a short self-introduction (100–150 words) covering your name, college and course, area of interest, and what you expect to learn during the internship", youtubeUrl: null, order: 7 },
      { title: "Internship Expectations Note", description: "Write a one-page note on 'Why I Joined the Kodefort Internship and What I Hope to Learn'", youtubeUrl: null, order: 8 },
      { title: "Professional Communication", description: "Explore the basics of professional communication and workplace etiquette", youtubeUrl: null, order: 9 },
    ];

    // Seed internships with tasks
    const internships = [
      {
        name: "Web Development",
        description: "Learn HTML, CSS, JavaScript, React and modern development.",
        price: 499,
        difficulty: "Beginner",
        icon: "💻",
        rating: 4.9,
        tasks: [
          // Videos
          { title: "Introduction to HTML", description: "Learn the structure of HTML documents", youtubeUrl: "https://www.youtube.com/embed/qz0aGYrrlhU", order: 10 },
          { title: "CSS Fundamentals", description: "Learn how to style web pages with CSS", youtubeUrl: "https://www.youtube.com/embed/1Rs2ND1ryYc", order: 11 },
          { title: "JavaScript Basics", description: "Learn the fundamentals of JavaScript", youtubeUrl: "https://www.youtube.com/embed/PkZNo7MFNFg", order: 12 },
          { title: "React Introduction", description: "Learn the basics of React", youtubeUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8", order: 13 },
          // Assignments
          { title: "Build a Personal Portfolio", description: "Create a responsive portfolio website using HTML and CSS", youtubeUrl: null, order: 14 },
          { title: "JavaScript To-Do App", description: "Build a functional to-do list application with vanilla JavaScript", youtubeUrl: null, order: 15 },
        ],
      },
      {
        name: "Cyber Security",
        description: "Learn the basics of cybersecurity and how to protect systems.",
        price: 499,
        difficulty: "Intermediate",
        icon: "🛡️",
        rating: 4.8,
        tasks: [
          // Videos
          { title: "Introduction to Cybersecurity", description: "Understand what cybersecurity is", youtubeUrl: "https://www.youtube.com/embed/UKxQTvqcpSg", order: 10 },
          { title: "Network Security Basics", description: "Learn about network security", youtubeUrl: "https://www.youtube.com/embed/094B0hA4W_g", order: 11 },
          { title: "Ethical Hacking Intro", description: "Introduction to ethical hacking", youtubeUrl: "https://www.youtube.com/embed/dz7Ntp7KQGA", order: 12 },
          { title: "Password Security", description: "Learn about password best practices", youtubeUrl: "https://www.youtube.com/embed/7U_rz9j4Z0Y", order: 13 },
          // Assignments
          { title: "Security Audit Report", description: "Perform a basic security audit of a sample website", youtubeUrl: null, order: 14 },
          { title: "Password Strength Checker", description: "Build a tool to check password strength", youtubeUrl: null, order: 15 },
        ],
      },
      {
        name: "AI Basics",
        description: "Learn the fundamentals of artificial intelligence and machine learning.",
        price: 499,
        difficulty: "Intermediate",
        icon: "🤖",
        rating: 4.9,
        tasks: [
          // Videos
          { title: "What is AI?", description: "Introduction to artificial intelligence", youtubeUrl: "https://www.youtube.com/embed/2ePf9rue1Ao", order: 10 },
          { title: "Machine Learning Basics", description: "Learn the basics of machine learning", youtubeUrl: "https://www.youtube.com/embed/GwIo3gDZCVQ", order: 11 },
          { title: "Introduction to Neural Networks", description: "Learn about neural networks", youtubeUrl: "https://www.youtube.com/embed/aircAruvnKk", order: 12 },
          { title: "Python for AI", description: "Python libraries for AI and ML", youtubeUrl: "https://www.youtube.com/embed/rfscVS0vtbw", order: 13 },
          // Assignments
          { title: "Linear Regression Model", description: "Implement a simple linear regression model", youtubeUrl: null, order: 14 },
          { title: "Image Classification Basics", description: "Explore basic image classification techniques", youtubeUrl: null, order: 15 },
        ],
      },
      {
        name: "Digital Marketing",
        description: "Master SEO, social media, and digital marketing strategies.",
        price: 499,
        difficulty: "Beginner",
        icon: "📈",
        rating: 4.7,
        tasks: [
          // Videos
          { title: "Introduction to Digital Marketing", description: "Understand digital marketing", youtubeUrl: "https://www.youtube.com/embed/nkuYN8MHxvk", order: 10 },
          { title: "SEO Fundamentals", description: "Learn search engine optimization", youtubeUrl: "https://www.youtube.com/embed/DvwS7cV9Gng", order: 11 },
          { title: "Social Media Marketing", description: "Learn social media marketing", youtubeUrl: "https://www.youtube.com/embed/0IKWvLh4v7k", order: 12 },
          { title: "Content Marketing", description: "Learn content marketing strategies", youtubeUrl: "https://www.youtube.com/embed/6ZfuNTqbHE8", order: 13 },
          // Assignments
          { title: "SEO Keyword Research", description: "Perform keyword research for a niche", youtubeUrl: null, order: 14 },
          { title: "Social Media Campaign Plan", description: "Create a social media campaign plan", youtubeUrl: null, order: 15 },
        ],
      },
      {
        name: "Python Programming",
        description: "Learn Python from scratch and build real-world applications.",
        price: 499,
        difficulty: "Beginner",
        icon: "🐍",
        rating: 4.9,
        tasks: [
          // Videos
          { title: "Python for Beginners", description: "Introduction to Python", youtubeUrl: "https://www.youtube.com/embed/rfscVS0vtbw", order: 10 },
          { title: "Python Data Structures", description: "Learn lists, tuples, and dictionaries", youtubeUrl: "https://www.youtube.com/embed/rfscVS0vtbw", order: 11 },
          { title: "Python Functions", description: "Learn how to write functions", youtubeUrl: "https://www.youtube.com/embed/rfscVS0vtbw", order: 12 },
          { title: "Python OOP", description: "Object-oriented programming in Python", youtubeUrl: "https://www.youtube.com/embed/JeznW_7DlB0", order: 13 },
          // Assignments
          { title: "Number Guessing Game", description: "Build a number guessing game in Python", youtubeUrl: null, order: 14 },
          { title: "Todo List Application", description: "Create a todo list with file storage", youtubeUrl: null, order: 15 },
        ],
      },
      {
        name: "Cloud Computing",
        description: "Learn cloud fundamentals and AWS/Azure services.",
        price: 499,
        difficulty: "Intermediate",
        icon: "☁️",
        rating: 4.8,
        tasks: [
          // Videos
          { title: "Introduction to Cloud Computing", description: "What is cloud computing?", youtubeUrl: "https://www.youtube.com/embed/36zducUX16w", order: 10 },
          { title: "Cloud Service Models", description: "IaaS, PaaS, SaaS explained", youtubeUrl: "https://www.youtube.com/embed/36zducUX16w", order: 11 },
          { title: "AWS Basics", description: "Introduction to Amazon Web Services", youtubeUrl: "https://www.youtube.com/embed/3hLmDS179YE", order: 12 },
          { title: "Azure Fundamentals", description: "Introduction to Microsoft Azure", youtubeUrl: "https://www.youtube.com/embed/8h0-QjL1c0g", order: 13 },
          // Assignments
          { title: "Deploy Static Website", description: "Deploy a static website to cloud storage", youtubeUrl: null, order: 14 },
          { title: "Cloud Architecture Diagram", description: "Design a simple cloud architecture", youtubeUrl: null, order: 15 },
        ],
      },
      {
        name: "DevOps",
        description: "Master CI/CD, Docker, Kubernetes, and DevOps practices.",
        price: 499,
        difficulty: "Advanced",
        icon: "⚙️",
        rating: 4.9,
        tasks: [
          // Videos
          { title: "Introduction to DevOps", description: "What is DevOps?", youtubeUrl: "https://www.youtube.com/embed/Xrgk023l-4Q", order: 10 },
          { title: "Git and GitHub", description: "Version control basics", youtubeUrl: "https://www.youtube.com/embed/RGOj5yH7evk", order: 11 },
          { title: "CI/CD Pipelines", description: "Continuous integration and deployment", youtubeUrl: "https://www.youtube.com/embed/scEDHsr3APg", order: 12 },
          { title: "Docker for Beginners", description: "Learn containerization with Docker", youtubeUrl: "https://www.youtube.com/embed/3c-iBn73dDE", order: 13 },
          // Assignments
          { title: "Dockerize an App", description: "Create a Dockerfile for a simple app", youtubeUrl: null, order: 14 },
          { title: "GitHub Actions Workflow", description: "Set up a basic CI pipeline", youtubeUrl: null, order: 15 },
        ],
      },
      {
        name: "Software Development",
        description: "Learn SDLC, Agile, testing, and professional coding practices.",
        price: 499,
        difficulty: "Beginner",
        icon: "💡",
        rating: 4.8,
        tasks: [
          // Videos
          { title: "SDLC Overview", description: "Software development lifecycle phases", youtubeUrl: "https://www.youtube.com/embed/Fi31p5GzE3s", order: 10 },
          { title: "Agile Methodology", description: "Introduction to Agile", youtubeUrl: "https://www.youtube.com/embed/Z9QbYZh1YXY", order: 11 },
          { title: "Software Testing Basics", description: "Types of testing", youtubeUrl: "https://www.youtube.com/embed/D27uL3u58dI", order: 12 },
          { title: "Clean Code Principles", description: "Write maintainable and readable code", youtubeUrl: "https://www.youtube.com/embed/7Em85C30yWc", order: 13 },
          // Assignments
          { title: "Agile Sprint Plan", description: "Create a sprint plan for a sample project", youtubeUrl: null, order: 14 },
          { title: "Unit Testing Practice", description: "Write unit tests for a simple function", youtubeUrl: null, order: 15 },
        ],
      },
      {
        name: "Database Management",
        description: "Master SQL, database design, and modern databases.",
        price: 499,
        difficulty: "Beginner",
        icon: "🗄️",
        rating: 4.7,
        tasks: [
          // Videos
          { title: "Introduction to Databases", description: "What is a database?", youtubeUrl: "https://www.youtube.com/embed/HXV3zeQKqGY", order: 10 },
          { title: "SQL Basics", description: "Structured Query Language", youtubeUrl: "https://www.youtube.com/embed/HXV3zeQKqGY", order: 11 },
          { title: "Database Design", description: "Normalization and ER diagrams", youtubeUrl: "https://www.youtube.com/embed/ztHopE5Wnpc", order: 12 },
          { title: "NoSQL Databases", description: "Introduction to MongoDB and other NoSQL", youtubeUrl: "https://www.youtube.com/embed/pWbMrx5rVBE", order: 13 },
          // Assignments
          { title: "Design ER Diagram", description: "Create an ER diagram for a library system", youtubeUrl: null, order: 14 },
          { title: "SQL Query Practice", description: "Write SQL queries for a sample database", youtubeUrl: null, order: 15 },
        ],
      },
    ];

    for (const internship of internships) {
      // Check if internship exists
      const existingInternship = await prisma.internship.findUnique({
        where: { name: internship.name },
        include: { tasks: true }
      });

      if (!existingInternship) {
        // Create new internship with all tasks
        await prisma.internship.create({
          data: {
            name: internship.name,
            description: internship.description,
            price: internship.price,
            difficulty: internship.difficulty,
            icon: internship.icon,
            rating: internship.rating,
            tasks: {
              create: [...commonDay1Tasks, ...internship.tasks],
            },
          },
        });
      } else {
        // Internship exists, check if common tasks are present
        const existingTaskTitles = existingInternship.tasks.map(t => t.title);
        const missingCommonTasks = commonDay1Tasks.filter(ct => !existingTaskTitles.includes(ct.title));
        
        if (missingCommonTasks.length > 0) {
          // Add missing common tasks
          for (const task of missingCommonTasks) {
            await prisma.task.create({
              data: {
                ...task,
                internshipId: existingInternship.id
              }
            });
          }

          // Update order of existing specific tasks to start at 10
          for (const task of existingInternship.tasks) {
            // Skip common tasks we just added
            if (commonDay1Tasks.some(ct => ct.title === task.title)) continue;
            
            // Update order to be 10 + original order (or 10 if no order)
            const newOrder = task.order < 10 ? task.order + 9 : task.order;
            await prisma.task.update({
              where: { id: task.id },
              data: { order: newOrder }
            });
          }
        }
      }
    }

    return new Response(JSON.stringify({ message: "Internships and tasks seeded successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to seed data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
