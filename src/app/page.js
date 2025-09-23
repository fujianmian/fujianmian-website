'use client';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown, Calendar, MapPin, Camera, Code } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'events', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "StudyHub",
      description: "An innovative learning platform that transforms uploaded content into interactive study tools like flashcards, mind maps, and AI-generated videos, empowering students to master concepts effortlessly.",
      tech: ["Next.js", "TypeScript", "AWS ECS", "AWS Bedrock"],
      github: "https://github.com/fujianmian/TrialGreatHack",
      demo: "https://youtube.com/watch?v=demo-studyhub" // Placeholder, awaiting your input
    },
    {
      title: "Skill3",
      description: "A blockchain-powered certificate storage solution ensuring authenticity through immutability. Secured third place at Buildstation Ideathon 2024 for its innovative approach to credential verification.",
      tech: ["Next.js", "Figma", "Maschain"],
      github: "https://github.com/skill-3/skill3",
      demo: "https://youtu.be/2sXv7UU_QEc?si=-eKPEuTXREyKXlHj"
    }
  ];

  const events = [
    {
      title: "ETH Uprising Workshop",
      description: "Captured the energy of a dynamic blockchain workshop through photography, helping participants prepare for a major hackathon with hands-on Ethereum development skills.",
      date: "February 2025",
      location: "Asia Pacific University, Malaysia",
      type: "Workshop",
      image: "workshop",
      icon: <Camera size={36} />
    },
    {
      title: "Devmatch Hackathon 2024",
      description: "Transformed Figma designs into responsive Next.js code as a frontend developer, contributing to a high-impact hackathon project that pushed the boundaries of innovation.",
      date: "August 2024",
      location: "Asia Pacific University, Malaysia",
      type: "Hackathon",
      image: "hackathon",
      icon: <Code size={36} />
    },
    {
      title: "Devmatch Hackathon 2025",
      description: "Mentored aspiring developers and captured stunning event photos, fostering a vibrant tech community while guiding students through technical challenges.",
      date: "August 2025",
      location: "Asia Pacific University, Malaysia",
      type: "Hackathon",
      image: "hackathon",
      icon: <Camera size={36} />
    }
  ];

  const getImageGradient = (type) => {
    switch (type) {
      case 'workshop': return 'from-blue-600 to-indigo-800';
      case 'hackathon': return 'from-green-600 to-teal-800';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Heng Jun Yong - Blockchain & Cloud Innovator</title>
        <meta name="description" content="Portfolio of Heng Jun Yong, a Year 3 Software Engineering student crafting cutting-edge solutions in cloud computing and blockchain." />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-purple-400">Heng Jun Yong</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'events', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors ${
                    activeSection === item 
                      ? 'text-purple-400 font-medium border-b-2 border-purple-400' 
                      : 'text-gray-300 hover:text-purple-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-300 hover:text-purple-400"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              {['home', 'about', 'projects', 'events', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 capitalize text-gray-300 hover:text-purple-400"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mx-auto mb-8 flex items-center justify-center border-4 border-purple-400/50">
              <span className="text-white text-4xl font-bold">HJ</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Hey, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Heng Jun Yong</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              A Year 3 Software Engineering student revolutionizing the future with blockchain and cloud computing innovations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('projects')}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-500 transition-colors font-medium shadow-lg shadow-purple-600/25"
              >
                Explore My Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-purple-400 text-purple-400 px-8 py-3 rounded-lg hover:bg-purple-400 hover:text-gray-900 transition-colors font-medium"
              >
                Let's Connect
              </button>
            </div>
            <div className="mt-12 animate-bounce">
              <ChevronDown className="mx-auto text-purple-400" size={32} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-850">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-400 mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-lg text-gray-300 mb-6">
                I'm a Year 3 Software Engineering student at Asia Pacific University, diving deep into the worlds of cloud computing and blockchain. My journey is fueled by a relentless curiosity to master cutting-edge technologies and create solutions that make a real impact.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                When I'm not coding, you'll catch me gaming, snapping photos, or networking with tech enthusiasts to spark new ideas. My goal? To push the boundaries of innovation and build a future where technology empowers everyone.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/heng-jun-yong-undefined-8aa93b272" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/fujianmian" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Github size={24} />
                </a>
                <a href="mailto:jun379e@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-full h-96 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg shadow-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-400 mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-gray-700">
                <div className="h-48 bg-gradient-to-br from-purple-600 to-indigo-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded text-sm border border-purple-700/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <Github size={18} className="mr-1" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <ExternalLink size={18} className="mr-1" />
                      Demo Video
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-gray-850">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-400 mb-12">Events & Activities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-gray-700">
                <div className={`h-64 bg-gradient-to-br ${getImageGradient(event.image)} flex items-center justify-center relative`}>
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-4xl mb-2">
                      {event.icon}
                    </div>
                    <span className="bg-purple-600/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{event.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{event.description}</p>
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-sm text-gray-500 space-y-2 sm:space-y-0">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-purple-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-purple-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-400 mb-12">Let's Build the Future Together</h2>
          <div className="text-center">
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm thrilled to dive into the blockchain ecosystem and create groundbreaking solutions with cloud technology. Connect with me to collaborate on exciting projects or share ideas over a virtual coffee!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-6 mb-8 space-y-4 sm:space-y-0">
              <a href="mailto:jun379e@gmail.com" className="flex items-center text-gray-400 hover:text-purple-400 transition-colors">
                <Mail className="mr-2" size={20} />
                jun379e@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/heng-jun-yong-undefined-8aa93b272" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin className="mr-2" size={20} />
                LinkedIn
              </a>
              <a href="https://github.com/fujianmian" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="mr-2" size={20} />
                GitHub
              </a>
              <a href="https://wa.me/+60123870893" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-purple-400 transition-colors">
                <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.888-2.031-.986-.272-.099-.471-.148-.669.149-.198.297-.768.986-.939 1.186-.171.198-.351.228-.528.129-.177-.099-1.008-.648-1.926-2.076-.711-1.107-.894-1.836-.684-2.133.198-.297.468-.447.738-.546.279-.099.513-.108.693-.099.18.009.567.243.855.579.297.347.714 1.206.792 1.404.081.198.162.396.081.603-.081.198-.351.529-.612.819-.261.288-.558.567-.657.666-.099.099-1.008.981-.099 1.677.9.696 1.782 1.395 2.673 1.782.891.387 1.584.486 2.133.288.558-.198 1.758-.747 2.127-1.494.369-.747.369-1.386.279-1.584-.099-.198-.297-.347-.594-.495zm4.383-2.535c0 6.627-5.373 12-12 12S0 18.474 0 11.847 5.373 0 12 0s12 5.373 12 12zm-2 0c0-5.514-4.486-10-10-10S2 6.333 2 11.847s4.486 10 10 10 10-4.486 10-10z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Heng Jun Yong. Crafted with Next.js and a passion for <span className="text-purple-400">innovation</span>.
          </p>
        </div>
      </footer>
    </div>
  );
}