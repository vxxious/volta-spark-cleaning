/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors bypass unreliable Vinext client routing in production. */

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
