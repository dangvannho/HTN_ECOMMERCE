import { useState } from 'react';
import { Facebook, Twitter, Instagram, ArrowLeft, ArrowRight, MessageSquareHeart } from 'lucide-react';
import heroimage from "@/assets/heroimg.svg"
import profileGit from "@/assets/profleGit.jpg"

// Array of images for the slider
const heroImages = [
    heroimage,
    profileGit  // Replace with actual image path
];

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
    };

    return (
        <div className="relative flex flex-col lg:flex-row justify-center overflow-hidden">
            {/* cột trái  */}
            <div className="w-full lg:w-1/2 px-6 sm:px-12 lg:px-16 flex flex-col justify-center lg:justify-around py-12 lg:py-16">
                {/* Top Text Content */}
                <div className="mb-12 lg:mb-0">
                    <h1 className="text-[70px] sm:text-5xl lg:text-6xl font-normal text-gray-900 mb-3 sm:mb-4">The Classics</h1>
                    <p className="text-base font-normal sm:text-lg mb-6 sm:mb-8">An exclusive selection of this season's trends.</p>
                    <a href="#" className="text-sm not-italic font-medium leading-[24px] tracking-wider text-gray-900 uppercase border-b border-gray-900 pb-1 hover:border-gray-500 hover:text-gray-500 transition-colors">
                        Discover Now
                    </a>
                </div>

                {/* Bottom Slider */}
                <div className="flex items-center gap-4 sm:gap-6 text-xs uppercase text-gray-500 tracking-wider mt-8 lg:mt-0">
                    <button onClick={prevImage} className="flex items-center gap-2 group hover:text-gray-900 transition-colors">
                        <ArrowLeft size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                        Prev
                        <span className="block w-6 sm:w-8 h-px bg-gray-400 group-hover:bg-gray-900 transition-colors"></span>
                    </button>
                    <button onClick={nextImage} className="flex items-center gap-2 group hover:text-gray-900 transition-colors">
                        <span className="block w-6 sm:w-8 h-px bg-gray-400 group-hover:bg-gray-900 transition-colors"></span>
                        Next
                        <ArrowRight size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>
            </div>

            {/* cột phải */}
            <div className="relative w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-[80vh] flex items-center justify-center order-1 lg:order-2">
                <div className="w-full h-full lg:w-[350px] lg:h-[500px] overflow-hidden">
                    {/* Update img src to use state */}
                    <img
                        src={heroImages[currentImageIndex]}
                        alt="Hero Image"
                        className="w-full h-full object-cover"
                        key={currentImageIndex} // Add key for potential transition effects later
                    />
                </div>
            </div>

            {/* Media icon */}
            <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4 sm:space-y-6 z-10">
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors"><Facebook size={16} /></a>
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors"><Twitter size={16} /></a>
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors"><Instagram size={16} /></a>
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors"><MessageSquareHeart size={16} /></a>
                <span className="text-xs text-gray-500 uppercase tracking-widest pt-2" style={{ writingMode: 'vertical-rl' }}>Follow Us</span>
            </div>
        </div>
    );
};

export default Hero;