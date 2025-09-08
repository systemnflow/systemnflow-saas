// apps/raid/page.tsx

export default function RaidExtractor() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🚨 Ronnie’s RAID Extractor™</h1>
      <p>Start by entering the project issue or chaos you're facing. Ronnie will break it down using RAID (Risks, Assumptions, Issues, Dependencies).</p>
      <form>
        <label htmlFor="input">Describe your issue:</label><br />
        <textarea id="input" rows={6} style={{ width: "100%", marginTop: "1rem" }}></textarea><br />
        <button type="submit" style={{ marginTop: "1rem" }}>Extract RAID</button>
      </form>
    </main>
  );
}
