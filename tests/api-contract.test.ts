import { describe, it, expect } from 'vitest';

describe('api client contract', () => {
  it('video comment endpoints use absolute URLs (baseUrl prefix)', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'lib', 'api.ts'), 'utf8');
    // These three were previously relative fetches — must include baseUrl
    expect(src).toMatch(/this\.baseUrl.*ADD_VIDEO_COMMENT/);
    expect(src).toMatch(/this\.baseUrl.*GET_VIDEO_COMMENTS/);
    expect(src).toMatch(/this\.baseUrl.*DELETE_VIDEO_COMMENT/);
  });

  it('appointment endpoints match server routes', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'lib', 'api.ts'), 'utf8');
    expect(src).toContain("GET_LAWYER_APPOINTMENTS: '/api/appointments/lawyer'");
    expect(src).toContain("GET_CLIENT_APPOINTMENTS: '/api/appointments/client'");
  });
});
