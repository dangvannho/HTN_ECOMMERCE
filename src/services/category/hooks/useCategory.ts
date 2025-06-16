import { useState, useEffect } from 'react';
import { categoryApi } from '@/services/category/api/category.api';
import { Category } from '@/services/category/types/category.types'; 


const useCategory = () => {
const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
 
  useEffect(() => {
    const fetchCategories = async () => {
      try { 
        const response = await categoryApi.getAllCategories();
        // Sort categories based on their names
        const sortedCategories = response.data.sort((a, b) => {
          // First group: Basic shirts (Áo Thun, Áo Polo, etc.)
          const isBasicShirtA = a.name.toLowerCase().includes('áo') && 
            !a.name.toLowerCase().includes('khoác');
          const isBasicShirtB = b.name.toLowerCase().includes('áo') && 
            !b.name.toLowerCase().includes('khoác');
          
          // Second group: Jackets (Áo khoác)
          const isJacketA = a.name.toLowerCase().includes('áo khoác');
          const isJacketB = b.name.toLowerCase().includes('áo khoác');
          
          // Third group: Pants (Quần)
          const isPantsA = a.name.toLowerCase().includes('quần');
          const isPantsB = b.name.toLowerCase().includes('quần');

          // Sort by groups first
          if (isBasicShirtA && !isBasicShirtB) return -1;
          if (!isBasicShirtA && isBasicShirtB) return 1;
          if (isJacketA && !isJacketB) return -1;
          if (!isJacketA && isJacketB) return 1;
          if (isPantsA && !isPantsB) return -1;
          if (!isPantsA && isPantsB) return 1;

          // If in same group, sort alphabetically
          return a.name.localeCompare(b.name, 'vi');
        });
        
        setCategories(sortedCategories);
      } catch (err) {
        setError('Failed to load categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); 

  return { categories, loading, error };

}

export default useCategory
