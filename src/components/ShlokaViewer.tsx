import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

interface Shloka {
  id: string;
  shloka: string;
  meaning: string;
  date: string;
  source: string;
  comment: string;
}

const ShlokaViewer: React.FC = () => {
  const [shlokas, setShlokas] = useState<Shloka[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const shlokasRef = ref(database, 'shlokas');
    const unsubscribe = onValue(shlokasRef, (snapshot) => {
      try {
        const data = snapshot.val();
        const fetchedShlokas: Shloka[] = [];
        if (data) { // Check if data is not null
          for (let key in data) {
            fetchedShlokas.push({
              ...data[key],
              id: key // Store the Firebase key
            });
          }
        }
        setShlokas(fetchedShlokas);
        setLoading(false);
      } catch (e: any) {
        setError(`Failed to fetch shlokas: ${e.message}`);
        setLoading(false);
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="shloka-viewer-container">Loading Shlokas...</div>;
  }

  if (error) {
    return <div className="shloka-viewer-container" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="shloka-viewer-container">
      <h2>📖 View Shlokas</h2>
      {shlokas.length === 0 && !loading && !error && (
        <p>No shlokas found. Add new shloka.</p>
      )}
      {shlokas.length > 0 && (
        <div className="shloka-list">
          {shlokas.map((shloka, index) => (
            <div key={index} className="shloka-item">
              <h3 className="shloka-text">
                {(() => {
                  let parts: string[];
                  if (shloka.shloka.includes('|')) {
                    parts = shloka.shloka.split('|');
                  } else if (shloka.shloka.includes('।')) {
                    const index = shloka.shloka.indexOf('।');
                    parts = [shloka.shloka.substring(0, index + 1), shloka.shloka.substring(index + 1)];
                  } else {
                    const mid = Math.floor(shloka.shloka.length / 2);
                    parts = [shloka.shloka.substring(0, mid), shloka.shloka.substring(mid)];
                  }
                  return parts.map((part, i) => (
                    <React.Fragment key={i}>
                      {part.trim()}
                      {i < parts.length - 1 && <br />}
                    </React.Fragment>
                  ));
                })()}
              </h3>
              <p><strong>Meaning:</strong> {shloka.meaning}</p>
              <p><strong>Date:</strong> {shloka.date}</p>
              <p><strong>Source:</strong> {shloka.source}</p>
              <p><strong>Comment:</strong> {shloka.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShlokaViewer;