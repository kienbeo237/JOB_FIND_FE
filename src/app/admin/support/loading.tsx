export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="h-4 w-64 bg-gray-200 rounded mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-8 w-16 bg-gray-200 rounded mt-2"></div>
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 h-10 bg-gray-200 rounded"></div>
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100 p-1">
        <div className="flex">
          <div className="flex-1 h-10 bg-gray-200 rounded-md m-1"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-md m-1"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-md m-1"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-md m-1"></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="h-96 bg-gray-100"></div>
      </div>
    </div>
  )
}
