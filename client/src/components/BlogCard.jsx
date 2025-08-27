import React from 'react'

function BlogCard({ title, content, image, }) {
  return (
    <div className='mt-7 border border-purple-400 rounded-2xl w-[28vw] h-[47vh] text-white 
                    shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] transition-all duration-300 
                    overflow-hidden hover:cursor-pointer '>
      <img src="https://media.discordapp.net/attachments/735391032203804702/1409223448349249536/image.png?ex=68adea9c&is=68ac991c&hm=8ce30cbf45acc7f1f8f61c23aeee94aaf7542609b4aefaed9953de016049213d&=&format=webp&quality=lossless&width=688&height=374" alt={title} className='w-full h-48 object-cover rounded-md ' />
    <div className="border-t border-purple-400 my-2"></div>

      <h2 className="text-xl font-bold mb-2 text-purple-300 hover:text-purple-400 transition-colors duration-200 px-2">My day at maths</h2>

      <p className='line-clamp-3 text-white px-2 '>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi nostrum deserunt adipisci dolores officiis cum corrupti excepturi, veniam nam earum ea nemo, facilis commodi ex maiores dolore voluptas! Possimus laboriosam quae officiis asperiores. Ullam!
      </p>
    </div>
  )
}
 
export default BlogCard