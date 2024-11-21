export default function AppSkeleton() {
return ( 
<div
  className="min-h-screen p-6 flex flex-col items-center justify-center bg-gray-100"
>
  <main className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
    <div className="h-8 bg-gray-300/75 animate-pulse rounded w-3/4 mx-auto mb-4">

    </div>
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="h-10 bg-gray-300/75 animate-pulse rounded flex-1">
   
      </div>
      <div className="h-10 bg-gray-300/75 animate-pulse rounded w-1/4">

      </div>
    </div>
    <div className="h-4 bg-gray-300/75 animate-pulse rounded w-1/2 mx-auto">
  
    </div>
  </main>

  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    style={{ display: "none" }} 
  >
    <div className="bg-white rounded-lg p-6 relative shadow-lg w-11/12 max-w-lg">
      <div className="absolute top-3 right-3 h-6 w-6 bg-gray-300/75 animate-pulse rounded-full">

      </div>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-20 h-20 bg-gray-300/75 animate-pulse rounded-full">
   
        </div>
        <div className="h-6 bg-gray-300/75 animate-pulse rounded w-1/2">

        </div>
        <div className="space-y-2 w-full">
          <div className="h-4 bg-gray-300/75 animate-pulse rounded w-2/3 mx-auto">
    
          </div>
          <div className="h-4 bg-gray-300/75 animate-pulse rounded w-1/2 mx-auto">
       
          </div>
          <div className="h-4 bg-gray-300/75 animate-pulse rounded w-3/4 mx-auto">
   
          </div>
          <div className="h-4 bg-gray-300/75 animate-pulse rounded w-1/2 mx-auto">
        
          </div>
          <div className="h-4 bg-gray-300/75 animate-pulse rounded w-1/2 mx-auto">
        
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 )
}