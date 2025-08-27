import React from 'react'


function Contact() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-6">
      <h1 className="text-3xl font-bold text-purple-400">Contact Me</h1>
      <div className="flex gap-6 mt-4">
        
        {/* GitHub */}
        <a 
          href="https://github.com/yourusername" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <lord-icon
          src="Github.json"
            trigger="hover"
            colors="primary:#a78bfa"
            style={{ width: "30px", height: "30px" }}
          ></lord-icon>
          GitHub
        </a>

        {/* LinkedIn */}
        <a 
          href="https://linkedin.com/in/yourusername" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <lord-icon
            src="https://cdn.lordicon.com/dxjqoygy.json"
            trigger="hover"
            colors="primary:#0ea5e9"
            style={{ width: "30px", height: "30px" }}
          ></lord-icon>
          LinkedIn 
        </a>

        {/* Email */}
        <a 
          href="mailto:youremail@example.com" 
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <lord-icon
            src="https://cdn.lordicon.com/rhvddzym.json"
            trigger="hover"
            colors="primary:#22c55e"
            style={{ width: "30px", height: "30px" }}
          ></lord-icon>
          Email
        </a>
      </div>
    </div>
  )
}

export default Contact
