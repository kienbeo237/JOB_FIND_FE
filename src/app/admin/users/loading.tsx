export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mt-2"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100 p-1">
        <div className="flex">
          <div className="flex-1 h-10 bg-gray-200 rounded-md m-1"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-md m-1"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-md m-1"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-md m-1"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 h-10 bg-gray-200 rounded"></div>
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="h-96 bg-gray-100"></div>
      </div>
    </div>
  )
}
