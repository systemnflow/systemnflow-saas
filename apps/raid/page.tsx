'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function RAIDExtractorPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [raid, setRaid] = useState<{
    Risks: string[];
    Actions: string[];
    Issues: string[];
    Decisions: string[];
  } | null>(null);

  const extractRaid = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/extract-raid', {
        method: 'POST',
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      setRaid(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ronnie’s RAID Extractor™</h1>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={10}
        placeholder="Paste your transcript, notes, or meeting summary here..."
      />
      <Button className="mt-4" onClick={extractRaid} disabled={loading}>
        {loading ? 'Extracting RAID...' : 'Extract RAID'}
      </Button>

      {raid && (
        <Card className="mt-6">
          <CardContent>
            {['Risks', 'Actions', 'Issues', 'Decisions'].map((key) => (
              <div key={key}>
                <h2 className="text-lg font-semibold mt-4">{key}</h2>
                <ul className="list-disc list-inside text-sm">
                  {raid[key as keyof typeof raid].map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
