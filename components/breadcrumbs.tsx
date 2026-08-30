import Link from "next/link";

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link href="/">Home</Link></li>
        <li>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
