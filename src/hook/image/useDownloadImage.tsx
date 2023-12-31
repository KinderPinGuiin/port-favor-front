import { useCallback, useState } from 'react';

export function useDownloadImage() {
    const [error, setError] = useState<string | null>(null);

    const downloadImage = useCallback(async (src: string, name: string) => {
      try {
        const response = await fetch(src);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = name || 'image'; // Nom de téléchargement par défaut si le nom est manquant
        link.click();
        window.URL.revokeObjectURL(url); // Libérer l'objet URL
        setError(null); // Réinitialiser les erreurs
      } catch (error) {
        setError('Erreur lors du téléchargement');
        console.error('Erreur lors du téléchargement :', error);
      }
    }, []);
  
    return { downloadImage, error };
}
