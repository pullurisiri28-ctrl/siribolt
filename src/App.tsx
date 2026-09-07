import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Modal } from '@/components/ui/Modal';
import { Dashboard } from '@/pages/Dashboard';
import { RiskMap } from '@/pages/RiskMap';
import { Prediction } from '@/pages/Prediction';
import { Warnings } from '@/pages/Warnings';
import { Weather } from '@/pages/Weather';
import { Alerts } from '@/pages/Alerts';
import { Contacts } from '@/pages/Contacts';
import { Safety } from '@/pages/Safety';
import { LocationDetails } from '@/pages/LocationDetails';
import { locations } from '@/data/mockData';
import { type PageId } from '@/config/navigation';

function App() {
  const [page, setPage] = useState<PageId>('dashboard');
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  const selectedLocation = locations.find((l) => l.id === selectedLocationId) ?? null;

  const handleSelectLocation = (id: string) => {
    setSelectedLocationId(id);
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard onNavigate={setPage} onSelectLocation={handleSelectLocation} />;
      case 'map':
        return <RiskMap onSelectLocation={handleSelectLocation} />;
      case 'prediction':
        return <Prediction onSelectLocation={handleSelectLocation} />;
      case 'warnings':
        return <Warnings onSelectLocation={handleSelectLocation} />;
      case 'weather':
        return <Weather />;
      case 'alerts':
        return <Alerts />;
      case 'contacts':
        return <Contacts />;
      case 'safety':
        return <Safety />;
      default:
        return <Dashboard onNavigate={setPage} onSelectLocation={handleSelectLocation} />;
    }
  };

  return (
    <>
      <Layout current={page} onNavigate={setPage}>
        {renderPage()}
      </Layout>
      <Modal open={selectedLocation !== null} onClose={() => setSelectedLocationId(null)} title="Location Details" maxWidth="max-w-3xl">
        {selectedLocation && <LocationDetails location={selectedLocation} />}
      </Modal>
    </>
  );
}

export default App;
