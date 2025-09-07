import React, { useState, useEffect } from 'react';

interface Shloka {
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
    const fetchShlokas = async () => {
      const SPREADSHEET_ID = '1dEAZXY7BGuTGmoU_x-XC7VtoPuXxx0OrPYpDqFz7CSw';
      const sheetName = 'Shlokas';
      const API_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const jsonString = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        const data = JSON.parse(jsonString);

        if (data.table && data.table.rows) {
          const fetchedShlokas: Shloka[] = data.table.rows.map((row: any) => {
            let rawDate = row.c[2]?.v || "";
            let formattedDate = rawDate;

            // 👉 Parse Date(YYYY,MM,DD) format
            const dateMatch = /^Date\((\d+),(\d+),(\d+)\)$/.exec(rawDate);
            if (dateMatch) {
              const year = parseInt(dateMatch[1], 10);
              const month = parseInt(dateMatch[2], 10) + 1; // month is 0-indexed
              const day = parseInt(dateMatch[3], 10);
              formattedDate = `${day.toString().padStart(2, "0")}-${month
                .toString()
                .padStart(2, "0")}-${year}`;
            }

            return {
              shloka: row.c[0]?.v || "",
              meaning: row.c[1]?.v || "",
              date: formattedDate,
              source: row.c[3]?.v || "",
              comment: row.c[4]?.v || "",
            };
          });
          setShlokas(fetchedShlokas);
        } else {
          setShlokas([]);
        }
      } catch (e: any) {
        setError(`Failed to fetch shlokas: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchShlokas();
  }, []);

  if (loading) {
    return <div className="shloka-viewer-container">Loading Shlokas...</div>;
  }

  if (error) {
    return <div className="shloka-viewer-container" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="shloka-viewer-container">
      <h2>📖 View Shlokas from Google Sheet</h2>
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