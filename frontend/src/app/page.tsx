import GameWorld from '@/components/GameWorld';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full h-screen">
        <GameWorld />
      </div>
      <div className="absolute top-0 left-0 p-4 pointer-events-none w-full h-full">
         <div className="text-white text-4xl font-bold drop-shadow-lg">
            SUPER MEGA GAME MMO
         </div>
         <div className="absolute bottom-4 left-4 text-white text-xl">
            Health: <span className="text-red-500">100</span> | Mana: <span className="text-blue-500">100</span>
         </div>
         <div className="absolute bottom-4 right-4 bg-gray-800/80 p-4 rounded text-white pointer-events-auto">
            <h3>Chat</h3>
            <div className="h-32 w-64 overflow-y-auto mb-2 text-sm border border-gray-600 p-1">
               <p>[Global] Player1: Hello world!</p>
            </div>
            <input type="text" className="w-full bg-gray-700 text-white p-1" placeholder="Type..." />
         </div>
      </div>
    </main>
  );
}
