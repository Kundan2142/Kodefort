import prisma from "@/lib/prisma";

export async function GET() {
  try {
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
          { title: "Introduction to HTML", description: "Learn the structure of HTML documents", youtubeUrl: "https://www.youtube.com/watch?v=qz0aGYrrlhU", order: 1 },
          { title: "CSS Fundamentals", description: "Learn how to style web pages with CSS", youtubeUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc", order: 2 },
          { title: "JavaScript Basics", description: "Learn the fundamentals of JavaScript", youtubeUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg", order: 3 },
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
          { title: "Introduction to Cybersecurity", description: "Understand what cybersecurity is", youtubeUrl: "https://www.youtube.com/watch?v=UKxQTvqcpSg", order: 1 },
          { title: "Network Security Basics", description: "Learn about network security", youtubeUrl: "https://www.youtube.com/watch?v=094B0hA4W_g", order: 2 },
          { title: "Ethical Hacking Intro", description: "Introduction to ethical hacking", youtubeUrl: "https://www.youtube.com/watch?v=dz7Ntp7KQGA", order: 3 },
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
          { title: "What is AI?", description: "Introduction to artificial intelligence", youtubeUrl: "https://www.youtube.com/watch?v=2ePf9rue1Ao", order: 1 },
          { title: "Machine Learning Basics", description: "Learn the basics of machine learning", youtubeUrl: "https://www.youtube.com/watch?v=GwIo3gDZCVQ", order: 2 },
          { title: "Introduction to Neural Networks", description: "Learn about neural networks", youtubeUrl: "https://www.youtube.com/watch?v=aircAruvnKk", order: 3 },
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
          { title: "Introduction to Digital Marketing", description: "Understand digital marketing", youtubeUrl: "https://www.youtube.com/watch?v=nkuYN8MHxvk", order: 1 },
          { title: "SEO Fundamentals", description: "Learn search engine optimization", youtubeUrl: "https://www.youtube.com/watch?v=DvwS7cV9Gng", order: 2 },
          { title: "Social Media Marketing", description: "Learn social media marketing", youtubeUrl: "https://www.youtube.com/watch?v=0IKWvLh4v7k", order: 3 },
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
          { title: "Python for Beginners", description: "Introduction to Python", youtubeUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw", order: 1 },
          { title: "Python Data Structures", description: "Learn lists, tuples, and dictionaries", youtubeUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw&t=4404s", order: 2 },
          { title: "Python Functions", description: "Learn how to write functions", youtubeUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw&t=7400s", order: 3 },
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
          { title: "Introduction to Cloud Computing", description: "What is cloud computing?", youtubeUrl: "https://www.youtube.com/watch?v=dH0yzp4NY1I", order: 1 },
          { title: "Cloud Service Models", description: "IaaS, PaaS, SaaS explained", youtubeUrl: "https://www.youtube.com/watch?v=36zducUX16w", order: 2 },
          { title: "AWS Basics", description: "Introduction to Amazon Web Services", youtubeUrl: "https://www.youtube.com/watch?v=3hLmDS179YE", order: 3 },
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
          { title: "Introduction to DevOps", description: "What is DevOps?", youtubeUrl: "https://www.youtube.com/watch?v=Xrgk023l-4Q", order: 1 },
          { title: "Git and GitHub", description: "Version control basics", youtubeUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", order: 2 },
          { title: "CI/CD Pipelines", description: "Continuous integration and deployment", youtubeUrl: "https://www.youtube.com/watch?v=scEDHsr3APg", order: 3 },
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
          { title: "SDLC Overview", description: "Software development lifecycle phases", youtubeUrl: "https://www.youtube.com/watch?v=Fi31p5GzE3s", order: 1 },
          { title: "Agile Methodology", description: "Introduction to Agile", youtubeUrl: "https://www.youtube.com/watch?v=Z9QbYZh1YXY", order: 2 },
          { title: "Software Testing Basics", description: "Types of testing", youtubeUrl: "https://www.youtube.com/watch?v=D27uL3u58dI", order: 3 },
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
          { title: "Introduction to Databases", description: "What is a database?", youtubeUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY", order: 1 },
          { title: "SQL Basics", description: "Structured Query Language", youtubeUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY&t=330s", order: 2 },
          { title: "Database Design", description: "Normalization and ER diagrams", youtubeUrl: "https://www.youtube.com/watch?v=ztHopE5Wnpc", order: 3 },
        ],
      },
    ];

    for (const internship of internships) {
      const existing = await prisma.internship.findUnique({ where: { name: internship.name } });
      if (!existing) {
        await prisma.internship.create({
          data: {
            name: internship.name,
            description: internship.description,
            price: internship.price,
            difficulty: internship.difficulty,
            icon: internship.icon,
            rating: internship.rating,
            tasks: {
              create: internship.tasks,
            },
          },
        });
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
