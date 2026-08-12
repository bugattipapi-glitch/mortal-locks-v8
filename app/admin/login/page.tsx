import { redirect } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { isCommissioner } from '../../../lib/auth';
import { loginAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function CommissionerLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isCommissioner()) redirect('/admin');
  const query = await searchParams;
  return (
    <SiteShell active="admin">
      <section className="commissioner-login panel">
        <div className="login-scan" aria-hidden="true" />
        <small>CHANNEL 8 · RESTRICTED FREQUENCY</small>
        <h1>COMMISSIONER<br />ACCESS</h1>
        <p>One password. No username. The control room is otherwise off-air.</p>
        <form action={loginAction}>
          <label htmlFor="commissioner-password">PASSWORD</label>
          <input id="commissioner-password" name="password" type="password" autoComplete="current-password" autoFocus required />
          {query.error && <div className="login-error" role="alert">ACCESS DENIED · CHECK THE PASSWORD</div>}
          <button type="submit">TUNE IN →</button>
        </form>
      </section>
    </SiteShell>
  );
}
