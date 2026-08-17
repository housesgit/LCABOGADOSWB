import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import caseStudies from '../data/cases';
import articles from '../data/articles';

export default function usePublicContent() {
  const [publicCaseStudies, setPublicCaseStudies] = useState(caseStudies);
  const [publicArticles, setPublicArticles] = useState(articles);

  useEffect(() => {
    let mounted = true;

    const loadPublicCases = async () => {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('status', 'published')
        .order('case_date', { ascending: false });

      if (error) {
        console.error('Error cargando casos públicos:', error);
        return;
      }

      if (!mounted) return;

      const mappedCases = (data || []).map((item) => ({
        ...item,
        date: item.case_date || '',
        displayDate: item.case_date
          ? new Date(`${item.case_date}T00:00:00`).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          : '',
        published: item.status === 'published'
      }));

      setPublicCaseStudies(mappedCases);
    };

    loadPublicCases();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadPublicArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('article_date', { ascending: false });

      if (error) {
        console.error('Error cargando artículos públicos:', error);
        return;
      }

      if (!mounted) return;

      const mappedArticles = (data || []).map((item) => ({
        ...item,
        date: item.article_date || '',
        displayDate: item.article_date
          ? new Date(`${item.article_date}T00:00:00`).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          : '',
        published: item.status === 'published',
        body: item.body || ''
      }));

      setPublicArticles(mappedArticles);
    };

    loadPublicArticles();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    publicCaseStudies,
    publicArticles
  };
}
