import React from 'react'

interface CollectionHeaderProps {
  title: string;
  id?: string;
}

const CollectionHeader: React.FC<CollectionHeaderProps> = ({ title, id }) => {
  return (
    <div className="flex items-center justify-center mb-10">
      <div className="flex-grow border-t border-dotted border-gray-500 mr-4"></div>
      <span id={id} className="text-gray-800 font-bold tracking-widest text-lg uppercase">
        {title}
      </span>
      <div className="flex-grow border-t border-dotted border-gray-500 ml-4"></div>
    </div>
  )
}

export default CollectionHeader