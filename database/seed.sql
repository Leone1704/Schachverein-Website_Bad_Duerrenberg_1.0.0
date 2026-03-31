-- Schachverein Website - Default-Daten (optional)
-- Diese Datei lädt Beispieldaten in die Datenbank

INSERT INTO events (title, date, description)
VALUES 
    ('Bezirksliga Runde 2', '2026-04-12', 'Heimspiel gegen SG Beispielstadt'),
    ('Offenes Schnellschachturnier', '2026-04-26', '7 Runden Schweizer System im Vereinsheim'),
    ('Vereinsmeisterschaft Runde 1', '2026-05-10', 'Start der neuen Vereinsmeisterschaft')
ON CONFLICT DO NOTHING;

INSERT INTO results (date, team1, team2, score)
VALUES
    ('2026-03-29', 'SV Musterstadt', 'SC Feldrand', '4.5 : 3.5'),
    ('2026-03-15', 'SK Beispielort', 'SV Musterstadt', '5.0 : 3.0'),
    ('2026-03-01', 'Vereinsblitz-Monatsturnier', 'Gesamtwertung', 'Finale')
ON CONFLICT DO NOTHING;
