import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
            <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">404</p>
                <h1 className="mt-4 text-3xl font-bold text-slate-900">Page not found</h1>
                <p className="mt-3 text-slate-600">The page you requested does not exist or may have moved.</p>
                <div className="mt-6 flex justify-center gap-3">
                    <Link to="/" className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700">
                        Go home
                    </Link>
                    <Link to="/app" className="rounded-lg border border-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
                        Open app
                    </Link>
                </div>
            </div>
        </main>
    );
}
