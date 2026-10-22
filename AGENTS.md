# Project rules
- Keep citizen records in the private `characters` table and enforce account ownership through RLS; Dashboard access must not depend on roles.
- Keep Dashboard queries keyed by the signed-in account and protect both overview and detail routes with the same authentication guard to avoid cross-account cached content.