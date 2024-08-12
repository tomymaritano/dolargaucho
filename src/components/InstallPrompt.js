import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPopup, setShowInstallPopup] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkInstallationStatus = () => {
      // Check if app is installed (standalone mode)
      if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        setIsInstalled(true);
      } else {
        setIsInstalled(false);
      }
    };

    // Run the check on component mount
    checkInstallationStatus();

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      if (!isInstalled && !localStorage.getItem('appInstalled')) {
        setDeferredPrompt(e);
        setShowInstallPopup(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isInstalled]);

  const handleInstallClick = () => {
    setShowInstallPopup(false);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          localStorage.setItem('appInstalled', 'true'); // Store the installation status
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <Dialog open={showInstallPopup} onClose={() => setShowInstallPopup(false)}>
      <DialogTitle>Instalar Aplicación</DialogTitle>
      <DialogContent>
        <Typography>¿Te gustaría instalar esta aplicación en tu dispositivo?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowInstallPopup(false)} color="primary">No, gracias</Button>
        <Button onClick={handleInstallClick} color="primary" variant="contained">Instalar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstallPrompt;
