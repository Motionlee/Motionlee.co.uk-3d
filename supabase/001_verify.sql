-- Read-only. Safe to run at any time. Confirms the policy set on `enquiries`.
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'enquiries'
order by policyname;
