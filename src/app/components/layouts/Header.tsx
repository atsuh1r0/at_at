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
        <img src="/logo.png" alt="" className="w-12 h-12" />
      </div>
    </header>
  )
}
