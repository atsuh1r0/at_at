import Image from "next/image";

export default function Header() {
  return (
    <header className="flex p-2 justify-between items-center bg-blue-400">
      <div className="text-white">
        小野寛太
        <span>
          さん
        </span>
      </div>
      <div>
        <Image src="/logo.png" alt={""} width={32} height={32} />
      </div>
    </header>
  )
}
