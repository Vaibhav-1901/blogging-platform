import React from 'react'

function About() {
    return (
        <div className="max-w-3xl mx-auto text-center mt-10 p-6">
            <h1 className="text-3xl font-bold text-purple-400 mb-6">
                About This Website
            </h1>
            <p className="text-gray-300 leading-relaxed mb-6 ">
                Welcome to <span className="text-purple-400 font-semibold">WordSphere</span>, 
                a modern blogging platform where ideas connect people. 
                Our goal is to make sharing and discovering blogs simple, interactive, 
                and enjoyable for everyone.
            </p>

            <div className="text-left text-gray-300 space-y-4">
                <p>✨ <span className="font-semibold text-white">Explore</span> blogs written by others across different topics.</p>
                <p>🏷️ <span className="font-semibold text-white">Sort & filter</span> posts by tags like Education, Finance, Travel, Lifestyle, and more.</p>
                <p>✏️ <span className="font-semibold text-white">Create & share</span> your own blogs with an easy-to-use editor.</p>
                <p>💬 <span className="font-semibold text-white">Comment & interact</span> with other writers, making blogging a two-way conversation.</p>
            </div>
        </div>
    )
}

export default About
