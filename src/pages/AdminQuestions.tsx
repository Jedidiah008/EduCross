import { useEffect, useMemo, useState } from 'react';
import { subjects } from '@/data/subjects';
import allGameQuestions from '@/data/gameQuestions';
import { Button } from '@/components/ui/button';

export default function AdminQuestions() {
  const [subjectId, setSubjectId] = useState<string>(Object.keys(subjects)[0]);
  const [unitId, setUnitId] = useState<string>(subjects[Object.keys(subjects)[0]].units[0].id);
  const [manual, setManual] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem('manualGameQuestions');
    const parsed = raw ? JSON.parse(raw) : {};
    setManual(parsed || {});
  }, []);

  useEffect(() => {
    // ensure unitId stays in sync when subject changes
    const units = subjects[subjectId].units;
    if (!units.find(u => u.id === unitId)) {
      setUnitId(units[0].id);
    }
  }, [subjectId]);

  const generated = useMemo(() => {
    return allGameQuestions[subjectId]?.[unitId] ?? { questions: [], enumerationQuestions: [], categoryQuestions: [] };
  }, [subjectId, unitId]);

  const getManualFor = () => {
    return manual?.[subjectId]?.[unitId] ?? { questions: [], enumerationQuestions: [], categoryQuestions: [] };
  };

  const saveManual = (newManual: any) => {
    const copy = { ...manual };
    if (!copy[subjectId]) copy[subjectId] = {};
    copy[subjectId][unitId] = newManual;
    localStorage.setItem('manualGameQuestions', JSON.stringify(copy, null, 2));
    setManual(copy);
  };

  const handleAddQuestion = () => {
    const q = prompt('Enter question text');
    if (!q) return;
    const a = prompt('Enter answer text');
    if (!a) return;
    const hintsRaw = prompt('Enter hints (comma separated)') || '';
    const hints = hintsRaw.split(',').map((h) => h.trim()).filter(Boolean);

    const m = getManualFor();
    m.questions = [...(m.questions || []), { question: q, answer: a, hints }];
    saveManual(m);
  };

  const handleDeleteQuestion = (index: number) => {
    const m = getManualFor();
    m.questions = (m.questions || []).filter((_: any, i: number) => i !== index);
    saveManual(m);
  };

  const handleClearManual = () => {
    if (!confirm('Clear manual questions for this unit?')) return;
    const copy = { ...manual };
    if (copy?.[subjectId]) {
      delete copy[subjectId][unitId];
      localStorage.setItem('manualGameQuestions', JSON.stringify(copy, null, 2));
      setManual(copy);
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(manual || {}, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manualGameQuestions.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        localStorage.setItem('manualGameQuestions', JSON.stringify(parsed, null, 2));
        setManual(parsed);
        alert('Imported successfully');
      } catch (err) {
        alert('Failed to import JSON');
      }
    };
    reader.readAsText(file);
  };

  const manualFor = getManualFor();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Manual Game Questions</h1>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="border p-2 rounded">
            {Object.keys(subjects).map(sid => (
              <option key={sid} value={sid}>{subjects[sid].title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Unit</label>
          <select value={unitId} onChange={(e) => setUnitId(e.target.value)} className="border p-2 rounded">
            {subjects[subjectId].units.map(u => (
              <option key={u.id} value={u.id}>{u.title}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-2">
          <Button onClick={handleAddQuestion}>Add Question</Button>
          <Button variant="ghost" onClick={handleClearManual}>Clear Manual</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-bold mb-2">Generated Questions</h2>
          <div className="space-y-3">
            {(generated.questions || []).map((q: any, i: number) => (
              <div key={i} className="p-3 border rounded">
                <div className="font-semibold">{i+1}. {q.question}</div>
                <div className="text-sm">Answer: {q.answer}</div>
                <div className="text-sm">Hints: {(q.hints || []).join(' / ')}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Manual Questions (editable)</h2>
          <div className="space-y-3">
            {(manualFor.questions || []).map((q: any, i: number) => (
              <div key={i} className="p-3 border rounded flex justify-between items-start">
                <div>
                  <div className="font-semibold">{i+1}. {q.question}</div>
                  <div className="text-sm">Answer: {q.answer}</div>
                  <div className="text-sm">Hints: {(q.hints || []).join(' / ')}</div>
                </div>
                <div className="ml-4">
                  <Button variant="destructive" onClick={() => handleDeleteQuestion(i)}>Delete</Button>
                </div>
              </div>
            ))}
            { (manualFor.questions || []).length === 0 && (
              <p className="text-sm text-muted-foreground">No manual questions — add some or import JSON.</p>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <Button onClick={handleExport}>Export Manual JSON</Button>
            <label className="inline-block">
              <input type="file" accept="application/json" onChange={handleImport} style={{ display: 'none' }} />
              <Button variant="outline">Import JSON</Button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
