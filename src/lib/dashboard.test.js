import { describe, expect, test } from 'bun:test';
import { canAccessDashboard } from './dashboard';

describe('Dashboard access', () => {
  for (const role of ['user', 'business_owner', 'moderator', 'admin', null]) {
    test(`signed-in account with role ${role} can access Dashboard`, () => {
      expect(canAccessDashboard({ id: 'account-a', role })).toBe(true);
    });
  }
  test('signed-out visitors cannot access Dashboard', () => {
    expect(canAccessDashboard(null)).toBe(false);
  });
});