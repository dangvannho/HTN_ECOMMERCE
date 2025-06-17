import { useState, useEffect } from 'react';
import { collectionApi } from '@/services/collection/api/collection.api';
import { Collection } from '@/services/collection/types/collection.types';

const useCollection = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await collectionApi.getAllCollections();
        if (response.statusCode === 200) {
          setCollections(response.data);
        }
      } catch (err) {
        setError('Failed to load collections');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return { collections, loading, error };
};

export default useCollection;
