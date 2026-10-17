'use client';

import { useState } from 'react';

type JobStatus = 'Queued' | 'Running' | 'Passed' | 'Failed';

type TestJob = {
  id: number;
  name: string;
  browser: string;
  target: string;
  status: JobStatus;
  result: string;
};

const initialJobs: TestJob[] = [
  {
    id: 1,
    name: 'Homepage smoke test',
    browser: 'Chromium',
    target: 'https://example.com',
    status: 'Queued',
    result: 'Waiting for worker',
  },
  {
    id: 2,
    name: 'Responsive layout test',
    browser: 'Firefox',
    target: 'https://example.com',
    status: 'Queued',
    result: 'Waiting for worker',
  },
  {
    id: 3,
    name: 'WebKit compatibility test',
    browser: 'WebKit',
    target: 'https://example.com',
    status: 'Queued',
    result: 'Waiting for worker',
  },
];

export default function Home() {
  const [jobs, setJobs] = useState<TestJob[]>(initialJobs);
  const [nextId, setNextId] = useState(4);

  function addJob() {
    setJobs((current) => [
      ...current,
      {
        id: nextId,
        name: `Browser test #${nextId}`,
        browser: 'Chromium',
        target: 'https://example.com',
        status: 'Queued',
        result: 'Demo job — not executed',
      },
    ]);
    setNextId((id) => id + 1);
  }

  function runDemo() {
    setJobs((current) =>
      current.map((job) =>
        job.status === 'Queued'
          ? {
              ...job,
              status: 'Running',
              result: 'Simulated run — no browser launched',
            }
          : job
      )
    );
  }

  function resetJobs() {
    setJobs((current) =>
      current.map((job) =>
        job.status === 'Running' || job.status === 'Queued'
          ? {
              ...job,
              status: 'Queued',
              result: 'Waiting for worker',
            }
          : job
      )
    );
  }

  const count = (status: JobStatus) =>
    jobs.filter((job) => job.status === status).length;

  const badgeColor: Record<JobStatus, string> = {
    Queued: '#a16207',
    Running: '#1d4ed8',
    Passed: '#15803d',
    Failed: '#b91c1c',
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f5f7fb',
        color: '#172033',
        padding: '32px 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ color: '#5265d8', fontWeight: 700 }}>BROWSER LAB</p>

        <h1 style={{ fontSize: 32, marginBottom: 8 }}>
          Browser Testing Workers
        </h1>

        <p style={{ color: '#667085', marginBottom: 28 }}>
          Manage browser test jobs from one lightweight dashboard.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 14,
            marginBottom: 24,
          }}
        >
          {[
            ['Total jobs', jobs.length, '#fff'],
            ['Queued', count('Queued'), '#fff7df'],
            ['Running', count('Running'), '#e8efff'],
            ['Passed', count('Passed'), '#e4f8eb'],
            ['Failed', count('Failed'), '#ffebeb'],
          ].map(([label, value, background]) => (
            <div
              key={String(label)}
              style={{
                background: String(background),
                border: '1px solid #e3e7ef',
                borderRadius: 12,
                padding: 18,
              }}
            >
              <div style={{ color: '#667085', fontSize: 13 }}>{label}</div>
              <div style={{ fontSize: 30, fontWeight: 700, marginTop: 8 }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        <section
          style={{
            background: '#fff',
            border: '1px solid #e3e7ef',
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: 'space-between',
              marginBottom: 18,
            }}
          >
            <h2 style={{ margin: 0 }}>Test queue</h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <button onClick={addJob} style={buttonStyle}>
                + Add job
              </button>
              <button onClick={runDemo} style={primaryButtonStyle}>
                Run demo
              </button>
              <button onClick={resetJobs} style={buttonStyle}>
                Reset queued
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['ID', 'Test', 'Browser', 'Target', 'Status', 'Result'].map(
                    (heading) => (
                      <th key={heading} style={cellStyle}>
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td style={cellStyle}>{job.id}</td>
                    <td style={cellStyle}>{job.name}</td>
                    <td style={cellStyle}>{job.browser}</td>
                    <td style={cellStyle}>{job.target}</td>
                    <td style={cellStyle}>
                      <span
                        style={{
                          color: badgeColor[job.status],
                          fontWeight: 700,
                        }}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td style={cellStyle}>{job.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ color: '#667085', fontSize: 12, marginTop: 18 }}>
            Demo mode only. These jobs are simulated; no real browser tests have
            been executed.
          </p>
        </section>
      </div>
    </main>
  );
}

const buttonStyle = {
  padding: '10px 14px',
  border: '1px solid #d0d5dd',
  borderRadius: 8,
  background: '#fff',
  cursor: 'pointer',
};

const primaryButtonStyle = {
  ...buttonStyle,
  background: '#3448c5',
  borderColor: '#3448c5',
  color: '#fff',
};

const cellStyle = {
  padding: '13px 10px',
  borderBottom: '1px solid #eaecf0',
  whiteSpace: 'nowrap' as const,
};
