import React, { useState } from 'react';
import { supabase } from './supabaseClient'
import useNavigation from './hooks/useNavigation';
import AppRouter from './components/AppRouter';
import { RouteTransitionStyles, RouteTransition } from './components/RouteTransition';
import usePublicContent from './hooks/usePublicContent';


export default function App() {
  const [enviado, setEnviado] = useState(false);
const [enviando, setEnviando] = useState(false);
const { publicCaseStudies, publicArticles } = usePublicContent();
const [errorEnvio, setErrorEnvio] = useState('');

const {
  route,
  navigate,
  transitionPhase,
  setScrollToContact,
  scrolled,
  isMenuOpen,
  setIsMenuOpen
} = useNavigation();

  // ==========================================================
  // CONTACTO: después de volver a Inicio, hacemos scroll
  // hasta el formulario cuando la página ya está montada.
  // ==========================================================

const handleSubmit = async (e) => {
  e.preventDefault();

  if (enviando) return;

  setEnviando(true);
  setErrorEnvio('');

  const form = e.currentTarget;
  const formData = new FormData(form);

  const { error } = await supabase
    .from('contact_submissions')
    .insert({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      status: 'new'
    });

  setEnviando(false);

  if (error) {
    console.error('Error al enviar consulta:', error);
    setErrorEnvio('No fue posible enviar su consulta. Por favor, inténtelo nuevamente.');
    return;
  }

  setEnviado(true);
  form.reset();

  setTimeout(() => setEnviado(false), 5000);
};

  return (
    <AppRouter
      route={route}
      scrolled={scrolled}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      navigate={navigate}
      transitionPhase={transitionPhase}
      setScrollToContact={setScrollToContact}
      publicCaseStudies={publicCaseStudies}
      publicArticles={publicArticles}
    />
  );
}
