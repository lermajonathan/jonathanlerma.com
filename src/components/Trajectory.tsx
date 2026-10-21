import { useEffect, useRef, useState } from 'react';
import { SegmentedControl } from '@pance/react';
import { trajectory } from '../data/trajectory';
import { entriesLabel, filterByTrack, type Track, type TrackFilter } from '../lib/trajectory';
import { readingProgress } from '../lib/progress';
import './Trajectory.css';

const filters: { value: TrackFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'work', label: 'Work' },
  { value: 'education', label: 'Education' },
  { value: 'milestone', label: 'Milestones' },
];
const trackLabel: Record<Track, string> = { work: 'Work', education: 'Education', milestone: 'Milestone' };

/** Lights the timeline's spine as the reader scrolls past it, via the --fill custom property. */
function useSpineFill(filter: TrackFilter) {
  const listRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let frame = 0;
    const update = () => {
      const { top, height } = list.getBoundingClientRect();
      list.style.setProperty('--fill', readingProgress({ top, height, viewport: window.innerHeight }).toFixed(3));
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [filter]);
  return listRef;
}

export default function Trajectory() {
  const [filter, setFilter] = useState<TrackFilter>('all');
  const entries = filterByTrack(trajectory, filter);
  const listRef = useSpineFill(filter);

  return (
    <div className="traj">
      <div className="traj-filter" data-spec="SegmentedControl · @pance/react · size md">
        <SegmentedControl label="Filter the timeline" options={filters} value={filter} onChange={setFilter} />
        <p className="traj-count" aria-live="polite">
          {entriesLabel(entries.length)}
        </p>
      </div>
      <ol className="traj-list" ref={listRef}>
        {entries.map((entry, i) => (
          <li key={entry.title} className={`traj-item ${i % 2 ? 'is-right' : 'is-left'}`} data-track={entry.track}>
            <span className="traj-node" aria-hidden="true" />
            <span className="traj-link" aria-hidden="true" />
            <article className="traj-card">
              <p className="traj-meta">
                <span className="traj-date">{entry.date}</span>
                <span className="traj-track">{trackLabel[entry.track]}</span>
              </p>
              <h3 className="traj-title">{entry.title}</h3>
              {entry.org && <p className="traj-org">{entry.org}</p>}
              <p className="traj-text">{entry.text}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
