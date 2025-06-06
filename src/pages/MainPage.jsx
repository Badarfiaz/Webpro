import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { 
    title: "Phone", 
    image: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-240909_inline.jpg.large.jpg" 
  },
  { 
    title: "Watches", 
    image: "https://7star.pk/wp-content/uploads/2023/05/mtp-vd200d-2.jpg" 
  },
  { 
    title: "Shoes", 
    image: "https://i0.wp.com/sageleather.com.pk/wp-content/uploads/2024/10/IMG_3682.jpg?fit=714%2C893&ssl=1" 
  },
];

function MainPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-12 text-white">
        Browse <span className="text-[#6E00FF]">Categories</span>
      </h1>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((item) => (
          <div 
            key={item.title} 
            className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#333] hover:border-[#6E00FF] transition-all duration-300 hover:shadow-lg hover:shadow-[#6E00FF]/20"
          >
            <Link to={`/item/${item.title.toLowerCase()}`}>
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </Link>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
              <Link to={`/item/${item.title.toLowerCase()}`}>
                <button className="w-full bg-gradient-to-r from-[#6E00FF] to-[#00F5FF] text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity font-medium">
                  View More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;