import BookNowButton from "@/components/BookButton";
import Link from "next/link";

interface Item {
  id: string;
  title: string;
  fullDescription: string;
  shortDescription: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  priority: string;
  image: string;
}


async function getItem(id: string): Promise<Item | null> {
  

  
  try {
    const res = await fetch(`http://localhost:3000/api/items/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface Props {
  params: { id: string };
}

const ItemPage = async ({ params }: Props) => {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-500 text-lg font-medium">Item not found</p>
    </div>
  );
  //console.log(item);
  

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      {/* Back Button */}
      <Link
        href="/items"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800 transition-colors font-medium"
      >
        &larr; Back to Events
      </Link>

      {/* Main Layout */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex md:gap-6">
        {/* Image Section */}
        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {item.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-3 text-gray-600 mb-4">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                Date: {item.date}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                Location: {item.location}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                Price: ${item.price}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                Priority: {item.priority}
              </span>
            </div>

            {/* Full Description */}
            <p className="text-gray-700 leading-relaxed">{item.fullDescription || item.shortDescription}</p>
          </div>

          {/* Action / CTA (Optional) */}
          <div className="mt-6">
            <BookNowButton eventId={item.id} eventTitle={item.title}></BookNowButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
