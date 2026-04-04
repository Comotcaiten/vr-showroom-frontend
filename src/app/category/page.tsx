export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-black text-white rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <p className="text-sm opacity-70">Premium Design</p>
            <h2 className="text-3xl font-bold mt-2">Apple Watch Ultra</h2>
            <p className="mt-2 text-sm opacity-70">
              Advanced imaging performance with dual cameras
            </p>
          </div>
          <button className="mt-6 w-fit bg-white text-black px-4 py-2 rounded-xl">
            Shop Now
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-blue-100 rounded-2xl p-4">
            <p className="font-medium">Smart Camera</p>
            <p className="text-sm opacity-70">Save up to $450</p>
          </div>
          <div className="bg-gray-200 rounded-2xl p-4">
            <p className="font-medium">Galaxy S24</p>
            <p className="text-sm opacity-70">Save up to $600</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h3 className="font-semibold mb-4">Browse by Category</h3>
        <div className="flex gap-6 overflow-x-auto">
          {["Laptop", "Watch", "Mobile", "Fitness", "Home", "Gaming"].map(
            (item) => (
              <div
                key={item}
                className="min-w-[100px] bg-white rounded-xl p-4 text-center shadow"
              >
                <div className="h-10 w-10 bg-gray-200 rounded-full mx-auto mb-2" />
                <p className="text-sm">{item}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">New Arrivals</h3>
          <button className="text-sm">View All</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Blender", price: "$77" },
            { name: "Treadmill", price: "$888" },
            { name: "TV", price: "$700" },
            { name: "iPhone", price: "$899" },
            { name: "iPad", price: "$450" },
            { name: "Watch", price: "$99" },
            { name: "MacBook", price: "$600" },
            { name: "iMac", price: "$333" },
          ].map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow hover:shadow-md transition"
            >
              <div className="h-32 bg-gray-200 rounded-xl mb-3" />
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">{p.price}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
