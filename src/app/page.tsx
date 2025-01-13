import Image from "next/image";
import {Login} from '../components/ui/login'




export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center ">
        <Login/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

        <a
        className="flex items-center gap-2 text-center hover:underline hover:underline-offset-4"
        href="https://www.ifms.edu.br/campi/campus-tres-lagoas"
        target="_blank"
        rel="noopener noreferrer">
          <Image
            aria-hidden
            src={"/if.svg"}
            alt="Instituto Federal icon"
            width={16}
            height={16}
          />
          IFMS - Câmpus Três Lagoas
        </a>
        
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/ProjetosIFMS/classplanner-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Veja o código-fonte →
        </a>
      </footer>
    </div>
  );
}
