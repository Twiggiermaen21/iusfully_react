'use client'
import React, { useState, useEffect } from 'react';

export default function Header() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/index.html')         // ścieżka do public/foo.html
      .then(res => res.text())
      .then(setHtml)
      .catch(err => console.error('Błąd ładowania HTML:', err));
  }, []);

  return (
    <header>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </header>
  );
}
