
import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaPlay, FaStar } from "react-icons/fa";
import { useNavigate, Link } from "react-router";

const profiles = [
  {
    name: "Daniel",
    title: "Java Full Stack Developer",
    image: "https://i.pravatar.cc/200?img=12",
    skills: [
      { name: "Java", color: "badge-primary" },
      { name: "Spring Boot", color: "badge-secondary" },
      { name: "React", color: "badge-accent" },
      { name: "MySQL", color: "badge-success" },
      { name: "REST API", color: "badge-info" },
    ],
    experience:
      "Developed scalable Java applications using Spring Boot, REST APIs and MySQL.",
  },
  {
    name: "Nataliya",
    title: "Frontend React Developer",
    image: "https://i.pravatar.cc/200?img=32",
    skills: [
      { name: "React", color: "badge-primary" },
      { name: "Tailwind", color: "badge-secondary" },
      { name: "Next.js", color: "badge-accent" },
      { name: "JavaScript", color: "badge-success" },
      { name: "Figma", color: "badge-info" },
    ],
    experience:
      "Built responsive, high performance web apps using React and Next.js.",
  },
  {
    name: "Joshep",
    title: "Python Backend Developer",
    image: "https://i.pravatar.cc/200?img=12",
    skills: [
      { name: "Python", color: "badge-primary" },
      { name: "Django", color: "badge-secondary" },
      { name: "FastAPI", color: "badge-accent" },
      { name: "PostgreSQL", color: "badge-success" },
      { name: "Docker", color: "badge-info" },
    ],
    experience:
      "Designed and deployed backend services using Django, FastAPI and PostgreSQL.",
  },
  {
    name: "Priya Mehta",
    title: "UI/UX Designer",
    image: "https://i.pravatar.cc/200?img=47",
    skills: [
      { name: "Figma", color: "badge-primary" },
      { name: "Adobe XD", color: "badge-secondary" },
      { name: "Prototyping", color: "badge-accent" },
      { name: "User Research", color: "badge-success" },
      { name: "Wireframing", color: "badge-info" },
    ],
    experience:
      "Designed intuitive user interfaces and improved product usability across web and mobile apps.",
  },
  {
    name: "Thomas ",
    title: "DevOps Engineer",
    image: "https://i.pravatar.cc/200?img=11",
    skills: [
      { name: "AWS", color: "badge-primary" },
      { name: "Docker", color: "badge-secondary" },
      { name: "Kubernetes", color: "badge-accent" },
      { name: "CI/CD", color: "badge-success" },
      { name: "Terraform", color: "badge-info" },
    ],
    experience:
      "Automated deployment pipelines and managed cloud infrastructure on AWS using Kubernetes.",
  },
  {
    name: "Sneha Reddy",
    title: "Management Consultant",
    image: "https://i.pravatar.cc/200?img=44",
    skills: [
      { name: "Business Strategy", color: "badge-primary" },
      { name: "Marketing", color: "badge-secondary" },
      { name: "Financial Analysis", color: "badge-accent" },
      { name: "Leadership", color: "badge-success" },
      { name: "Communication", color: "badge-info" },
    ],
    experience:
      " Experienced in academic projects, case studies, and collaborative teamwork to solve real-world business challenges.",
  },
  {
    name: "Arjun Nair",
    title: "Management Trainee",
    image: "https://i.pravatar.cc/200?img=51",
    skills: [
      { name: "Business Strategy", color: "badge-primary" },
      { name: "Marketing", color: "badge-secondary" },
      { name: "Financial Analysis", color: "badge-accent" },
      { name: "Leadership", color: "badge-success" },
      { name: "Communication", color: "badge-info" },
    ],
    experience:
      "MBA graduate with strong knowledge of business management and financial analysis. Experienced in academic projects, case studies.",
  },
  {
    name: "Neha Kapoor",
    title: "Machine Learning Engineer",
    image: "https://i.pravatar.cc/200?img=29",
    skills: [
      { name: "Python", color: "badge-primary" },
      { name: "TensorFlow", color: "badge-secondary" },
      { name: "Scikit-learn", color: "badge-accent" },
      { name: "NLP", color: "badge-success" },
      { name: "Pandas", color: "badge-info" },
    ],
    experience:
      "Built and deployed machine learning models for prediction and NLP based applications.",
  },
  {
    name: "Aditya Rao",
    title: "Node.js Backend Developer",
    image: "https://i.pravatar.cc/200?img=60",
    skills: [
      { name: "Node.js", color: "badge-primary" },
      { name: "Express", color: "badge-secondary" },
      { name: "MongoDB", color: "badge-accent" },
      { name: "REST API", color: "badge-success" },
      { name: "GraphQL", color: "badge-info" },
    ],
    experience:
      "Built scalable backend systems and APIs using Node.js, Express and MongoDB.",
  },
];

const features = [
  {
    icon: "🚀",
    title: "AI-Powered",
    desc: "Our AI analyzes your input and generates a tailored resume for you.",
  },
  {
    icon: "📄",
    title: "Multiple Templates",
    desc: "Choose from a variety of professionally designed resume templates.",
  },
  {
    icon: "💼",
    title: "Job-Specific Resumes",
    desc: "Optimize your resume for specific job roles and industries.",
  },
];

const testimonials = [
  {
    text: "This AI resume maker saved me so much time! My resume looks professional and got me multiple interviews.",
    name: "John Doe",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    text: "I love the templates and the ease of use. Highly recommend this tool to anyone looking for a job.",
    name: "Jane Smith",
    role: "Marketing Specialist",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [profile] = useState(
    () => profiles[Math.floor(Math.random() * profiles.length)]
  );

  return (
    <div className="bg-base-100">
      {/* ================= HERO ================= */}
      <section className="min-h-screen bg-base-200 relative overflow-hidden">
        {/* Ambient glow — daisyUI theme colors, dark mode, light mode */}
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-secondary/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="badge badge-primary badge-lg mb-6">
                ✨ AI Powered Resume Builder
              </div>

              <h1 className="text-6xl font-extrabold leading-tight text-base-content">
                Build Job Winning
                <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Resume Using AI
                </span>
              </h1>

              <p className="mt-8 text-lg text-base-content/60 leading-8">
                Simply describe yourself and let AI generate a beautiful,
                ATS friendly resume in less than one minute.
              </p>

              <div className="flex gap-5 mt-10">
                <button
                  onClick={() => navigate("/generate-resume")}
                  className="btn btn-lg rounded-full gap-2 px-8 border-none text-primary-content bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300"
                >
                  Get Started
                  <FaArrowRight />
                </button>
              </div>

              <div className="flex items-center gap-3 mt-10">
                <div className="flex gap-1 text-warning">
                  <FaStar size={18} />
                  <FaStar size={18} />
                  <FaStar size={18} />
                  <FaStar size={18} />
                  <FaStar size={18} />
                </div>
                <span className="text-base-content/50">
                  Trusted by 10,000+ Users
                </span>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="relative rounded-3xl bg-base-100/40 backdrop-blur-xl border border-base-content/10 shadow-2xl overflow-hidden">
                {/* mock  top bar */}
                <div className="flex items-center gap-1.5 px-5 py-3 border-b border-base-content/10">
                  <span className="w-3 h-3 rounded-full bg-error/60"></span>
                  <span className="w-3 h-3 rounded-full bg-warning/60"></span>
                  <span className="w-3 h-3 rounded-full bg-success/60"></span>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-20 rounded-full ring-2 ring-primary/40 ring-offset-2 ring-offset-base-100">
                        <img src={profile.image} alt={profile.name} />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-base-content">
                        {profile.name}
                      </h2>
                      <p className="text-primary font-medium">{profile.title}</p>
                    </div>
                  </div>

                  <div className="divider before:bg-base-content/10 after:bg-base-content/10"></div>

                  <h3 className="font-bold mb-3 text-base-content">Skills</h3>

                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <div key={index} className={`badge ${skill.color}`}>
                        {skill.name}
                      </div>
                    ))}
                  </div>

                  <div className="divider before:bg-base-content/10 after:bg-base-content/10"></div>

                  <h3 className="font-bold text-base-content">Experience</h3>

                  <p className="text-base-content/60 mt-3">
                    {profile.experience}
                  </p>

                  <div className="divider before:bg-base-content/10 after:bg-base-content/10"></div>

                  <button className="btn w-full border-none text-primary-content bg-gradient-to-r from-primary to-secondary shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01] transition-all duration-300">
                    Download Resume
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-base-200 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="badge badge-primary badge-lg mb-4">Why Choose Us</div>
            <h2 className="text-4xl font-extrabold text-base-content">
              Powerful{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Features
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                whileHover={{ y: -11, scale: 1 }}
                className="rounded-3xl bg-base-100 border-2 border-base-content/10 shadow-lg hover:shadow-2xl hover:border-primary/50 hover:shadow-primary/20 transition-all duration-[10ms] p-8 text-center cursor-pointer"
              >
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-base-content mb-2">
                  {f.title}
                </h3>
                <p className="text-base-content/60">{f.desc}</p>
              </motion.div>


            ))}
          </div>
        </div>
      </section>


      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-base-200 relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-[26rem] h-[26rem] bg-accent/10 rounded-full blur-[120px]"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="badge badge-secondary badge-lg mb-4">Testimonials</div>
            <h2 className="text-4xl font-extrabold text-base-content">
              What Our{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Users Say
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="rounded-3xl bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-xl p-8"
              >
                <div className="flex gap-1 text-warning mb-4">
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                </div>

                <p className="text-base-content/70 leading-7">"{t.text}"</p>

                <div className="divider before:bg-base-content/10 after:bg-base-content/10"></div>

                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring-2 ring-primary/40 ring-offset-2 ring-offset-base-100">
                      <img src={t.image} alt={t.name} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-base-content">{t.name}</h4>
                    <p className="text-base-content/50 text-sm">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-24 bg-base-100 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-primary/10 rounded-full blur-[130px]"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          <div className="rounded-3xl bg-base-200/60 backdrop-blur-xl border border-base-content/10 shadow-2xl p-14">
            <h2 className="text-4xl font-extrabold text-base-content mb-6">
              Ready to Create{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Your Resume?
              </span>
            </h2>
            <p className="text-base-content/60 text-lg mb-8">
              Join thousands of users who have landed their dream jobs with our
              AI resume maker.
            </p>
            <button
              onClick={() => navigate("/generate-resume")}
              className="btn btn-lg rounded-full gap-2 px-10 border-none text-primary-content bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300"
            >
              Get Started Now
              <FaArrowRight />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-base-200 border-t border-base-content/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-xl font-extrabold text-base-content mb-3">
                AI{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Resume
                </span>
              </h4>
              <p className="text-base-content/60">
                Your go-to tool for creating professional resumes with AI.
              </p>
            </div>
            <div>
              <h4 className="footer-title text-base-content/80">Quick Links</h4>
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/about" className="link link-hover text-base-content/60">
                  About Us
                </Link>
                <a href="#" className="link link-hover text-base-content/60">
                  Features
                </a>
                <Link to="/contact" className="link link-hover text-base-content/60">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h4 className="footer-title text-base-content/80">Legal</h4>
              <div className="flex flex-col gap-2 mt-2">
                <a href="#" className="link link-hover text-base-content/60">
                  Privacy Policy
                </a>
                <a href="#" className="link link-hover text-base-content/60">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          <div className="divider before:bg-base-content/10 after:bg-base-content/10"></div>

          <p className="text-center text-base-content/40 text-sm">
            © {new Date().getFullYear()} AI Resume. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}