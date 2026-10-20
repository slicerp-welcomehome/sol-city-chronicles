import { describe, expect, test } from 'bun:test';
import { canManageTimeline, matchesTimeline } from './timeline';

describe('Timeline access', () => {
  test('admins can manage community lore', () => expect(canManageTimeline('admin')).toBe(true));
  test('regular residents cannot manage community lore', () => expect(canManageTimeline('user')).toBe(false));
  test('business owners cannot manage community lore', () => expect(canManageTimeline('business_owner')).toBe(false));
  test('moderators cannot manage community lore', () => expect(canManageTimeline('moderator')).toBe(false));
  test('signed-out visitors cannot manage community lore', () => expect(canManageTimeline(null)).toBe(false));
});

test('resident filtering returns events tagging the selected person', () => {
  const event = { title: 'Town meeting', story: 'A new chapter', location: 'Town hall', lore_date: '2026-10-20', tagged_resident_ids: ['resident-a'] };
  expect(matchesTimeline(event, '', 'all', 'resident-a')).toBe(true);
  expect(matchesTimeline(event, '', 'all', 'resident-b')).toBe(false);
  expect(matchesTimeline(event, 'town', '2026', 'all')).toBe(true);
  expect(matchesTimeline(event, '', '2025', 'all')).toBe(false);
});