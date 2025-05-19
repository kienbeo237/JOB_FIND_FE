export default function VouchersLoading() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Loading vouchers and coupons...</p>
      </div>
    </div>
  );
}
