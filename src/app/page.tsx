import Columns from "@/components/Tables/Columns";

export default async function Home() {
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  let request = await fetch(`${process.env.COINGECKO_API}/coins/list`, options)
  let data = await request.json()
  const random50currencies = data.sort(() => 0.5 - Math.random()).slice(0, 50)

  // Did not find time to implement Zustand/state management :(

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[#f8f9fa]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="font-bold text-xl">PepperLogic Task</h1>
        <Columns cryptos={random50currencies} />
      </main>
    </div>
  );
}
