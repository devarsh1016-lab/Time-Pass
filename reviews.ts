// Placeholder reviews. Replace with real, attributable customer quotes before launch.
export type Review = { quote: string; name: string; city: string };

export const reviews: Review[] = [
  { quote: 'The champagne stone looks warmer in person than any photo showed.', name: 'Ananya R.', city: 'Mumbai' },
  { quote: 'Sized, engraved and delivered before our anniversary.', name: 'Karan and Meher', city: 'Delhi' },
  { quote: 'I wear the Wick every day. It has not needed a single adjustment.', name: 'Priya S.', city: 'Bengaluru' },
  { quote: 'They video-called me through three stones before I chose.', name: 'Hannah L.', city: 'London' },
  { quote: 'The hoops are light enough to forget you are wearing them.', name: 'Riya M.', city: 'Ahmedabad' },
  { quote: 'Certificate, invoice and care card all in the box. No chasing.', name: 'Devika T.', city: 'Pune' },
];

// Placeholder aggregate. Pull from your reviews provider.
export const reviewSummary = { rating: 4.9, count: 1240 };
