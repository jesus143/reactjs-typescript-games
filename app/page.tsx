import Link from 'next/link';

export default function Page() {
  return (
    <main>


        <h1>Welcome to my games</h1>


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
  
      <div> </div>
      <b> Sr. Software Engineer Engr. </b>
        <img src="./author.jpg" alt="Logo" width={100} height={100} />

        
    </main>



  );
}

