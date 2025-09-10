export default function RaidExtractor() {
  return (
    <main style={{ maxWidth: "800px", margin: "2rem auto", padding: "1rem" }}>
      <h1>Ronnie’s RAID Extractor™</h1>
      <p>Paste a transcript below. Ronnie will extract Risks, Actions, Issues, and Decisions.</p>

      <textarea
        id="input"
        rows={12}
        placeholder="Paste transcript..."
        style={{ width: "100%", padding: "12px", borderRadius: "8px" }}
      />
      <button
        onClick={() => {
          const text = (document.getElementById("input") as HTMLTextAreaElement).value;
          const output = document.getElementById("output");
          if (output) {
            output.textContent = text ? "✅ Parsed RAID goes here." : "Paste something first.";
          }
        }}
        style={{ marginTop: "1rem", padding: "10px 16px", borderRadius: "10px" }}
      >
        Extract RAID
      </button>

      <div id="output" style={{ marginTop: "1rem", fontWeight: "bold" }}></div>
    </main>
  );
}
