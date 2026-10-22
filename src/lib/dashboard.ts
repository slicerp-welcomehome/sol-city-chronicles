export function canAccessDashboard(user: { id: string } | null | undefined) {
  return Boolean(user?.id);
}

export function citizenInitials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map(part => part.charAt(0)).join('').toUpperCase();
}