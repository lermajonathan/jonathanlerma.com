export type Track = 'work' | 'education' | 'milestone';
export type TrackFilter = 'all' | Track;

export type TrajectoryEntry = {
  date: string;
  track: Track;
  title: string;
  org?: string;
  text: string;
};

export function filterByTrack(entries: TrajectoryEntry[], filter: TrackFilter): TrajectoryEntry[] {
  return filter === 'all' ? entries : entries.filter((entry) => entry.track === filter);
}

export function entriesLabel(count: number): string {
  return `${count} ${count === 1 ? 'entry' : 'entries'}`;
}
