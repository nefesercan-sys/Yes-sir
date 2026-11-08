'use client';
// Can Beauty Studio — hızlı talep formu: alanlar doldukça hazır WhatsApp mesajı üretir (sunucuya veri gönderilmez).
import { useMemo, useState } from 'react';
import { G_AREAS, gWa, type FormCopy } from '@/lib/guzellik';

type Props = { form: FormCopy; services: { id: string; name: string }[]; helloMsg: string };

export default function GuzellikForm({ form, services, helloMsg }: Props) {
  const [sel, setSel] = useState<string[]>([]);
  const [area, setArea] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState('1');
  const [note, setNote] = useState('');

  const href = useMemo(() => {
    const names = services.filter((s) => sel.includes(s.id)).map((s) => s.name).join(', ');
    const lines = [
      helloMsg,
      names && `${form.msgService}: ${names}`,
      area && `${form.msgArea}: ${area === '__other' ? form.areaOther : area}`,
      date && `${form.msgDate}: ${date}`,
      time && `${form.msgTime}: ${time}`,
      people && `${form.msgPeople}: ${people}`,
      note.trim() && `${form.msgNote}: ${note.trim().slice(0, 400)}`,
    ].filter(Boolean) as string[];
    return gWa(lines.join('\n'));
  }, [sel, area, date, time, people, note, form, services, helloMsg]);

  const toggle = (id: string) => setSel((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <form className="gz-form" onSubmit={(e) => e.preventDefault()}>
      <fieldset className="gz-fs">
        <legend>{form.services}</legend>
        <div className="gz-chips">
          {services.map((s) => (
            <label key={s.id} className={`gz-chip${sel.includes(s.id) ? ' on' : ''}`}>
              <input type="checkbox" checked={sel.includes(s.id)} onChange={() => toggle(s.id)} />
              {s.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="gz-g2">
        <label className="gz-f">
          <span>{form.area}</span>
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">{form.areaPick}</option>
            {G_AREAS.map((a) => (<option key={a} value={a}>{a}</option>))}
            <option value="__other">{form.areaOther}</option>
          </select>
        </label>
        <label className="gz-f">
          <span>{form.people}</span>
          <input type="number" min={1} max={20} inputMode="numeric" value={people} onChange={(e) => setPeople(e.target.value)} />
        </label>
        <label className="gz-f">
          <span>{form.date}</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="gz-f">
          <span>{form.time}</span>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
      </div>

      <label className="gz-f">
        <span>{form.note}</span>
        <textarea rows={3} maxLength={400} value={note} placeholder={form.notePh} onChange={(e) => setNote(e.target.value)} />
      </label>

      <a className="gz-btn" href={href} target="_blank" rel="noopener noreferrer">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20l1.4-4.2A8 8 0 1 1 8.2 18.6L4 20z" /></svg>
        {form.send}
      </a>
      <p className="gz-hint">{form.hint}</p>
    </form>
  );
}
