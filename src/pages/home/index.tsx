import ListTrending from "@/pages/home/_components/section-trending/list-trending";
import { useState } from 'react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('WOMEN');

  const tabs = ['ALL', 'WOMEN', 'MEN', 'KIDS'];

  return (
    <div className="flex justify-center items-center">
      {/* Section Trending */}
      <div className="mt-24">
        <h3 className="text-center text-[35px] not-italic font-normal">Trending</h3>
        <div className="flex justify-evenly items-center my-8 px-36">
          {tabs.map((tab) => (
            <a
              key={tab}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab);
              }}
              className={`relative px-2 py-1 text-base transition-colors duration-200 ${activeTab === tab
                ? 'font-bold text-black after:absolute after:bottom-0 after:left-1/2 after:w-6 after:h-0.5 after:bg-black after:-translate-x-1/2'
                : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              {tab}
            </a>
          ))}
        </div>
        <ListTrending />
      </div>
    </div>
  );
};

export default Home;
