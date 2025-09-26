export function Forbidden() {
    return (
        <div className="container flex h-screen w-full flex-col items-center justify-center gap-6 overflow-y-auto">
            <svg width="125" height="87" focusable="false" fill="currentColor" stroke="currentColor" className="text-neutral-500">
                <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
                    <path
                        d="M1.5 83.5a2.006 2.006 0 002 2h118a2.006 2.006 0 002-2v-80a2.006 2.006 0 00-2-2H3.5a2.006 2.006 0 00-2 2z"
                        strokeWidth="3"
                    />
                    <path strokeWidth="2" d="M123.4 14H1.4M19.4 8h-10" />
                    <path
                        d="M46.5 69.5h30a2.006 2.006 0 002-2v-22a2.006 2.006 0 00-2-2h-30a2.006 2.006 0 00-2 2v22a2.006 2.006 0 002 2zM71.5 43.5v-7.2A10.238 10.238 0 0063 26.1 10.014 10.014 0 0051.5 36v6.5"
                        strokeWidth="3"
                    />
                </g>
            </svg>

            <div className="text-center">
                <h3 className="mb-1 text-xl font-semibold">Error 403: Access not allowed</h3>

                <p className="text-sm italic text-muted-foreground">
                    You do not have permission to access this page. Try checking the URL
                    <br />
                    or visit a different page.
                </p>
            </div>
        </div>
    );
}
