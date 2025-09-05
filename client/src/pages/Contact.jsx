import React from 'react'

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center mt-16 px-6">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-purple-400 mb-2">Contact Me</h1>
      <p className="text-gray-400 mb-10 text-center max-w-xl">
        Let’s connect! You can reach out through these platforms or send me a message directly.
      </p>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8  w-full max-w-3xl">

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/vaibhav-singh-978103325/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-6 bg-[#0d0111] rounded-2xl shadow-lg border border-sky-700 hover:scale-105 hover:shadow-sky-600 transition-transform"
        >
          <lord-icon
            src="https://cdn.lordicon.com/dxjqoygy.json"
            trigger="hover"
            colors="primary:#0ea5e9"
            style={{ width: "40px", height: "40px" }}
          ></lord-icon>
          <span className="mt-3 text-gray-300 font-medium">LinkedIn</span>
        </a>

        {/* Email */}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=vaibhavsingh192007@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-6 bg-[#0d0111] rounded-2xl shadow-lg border border-green-700 hover:scale-105 hover:shadow-green-600 transition-transform"
        >
          <lord-icon
            src="https://cdn.lordicon.com/rhvddzym.json"
            trigger="hover"
            colors="primary:#22c55e"
            style={{ width: '40px', height: '40px' }}
          ></lord-icon>
          <span className="mt-3 text-gray-300 font-medium">Email</span>
          <span className="text-sm text-gray-400 mt-1">vaibhavsingh192007@gmail.com</span>
        </a>
      </div>

      {/* Contact Form */}

    </div>
  )
}

export default Contact
