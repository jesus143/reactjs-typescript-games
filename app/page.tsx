import Link from 'next/link';

export default function Page() {
  return (
    <main>
        <h1>Welcome to my games --- update</h1>
        <nav>
          <ul>
            <li>
              <Link href="/chess-problem">Chess Problem</Link>
            </li>
            <li>
              <Link href="/snake">Snake</Link>
            </li>
            <li>
              <Link href="/sudoku">Sudoku</Link>
            </li>
            <li>
              <Link href="/tick-tock-toe">Tick Tock Toe</Link>
            </li>
          </ul>
        </nav>
    </main>
  );
}

