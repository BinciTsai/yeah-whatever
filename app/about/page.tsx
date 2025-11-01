export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About Yeah Whatever</h1>
      <p className="mb-3 text-gray-700">
        Yeah Whatever is a simple restaurant randomizer app that helps you decide
        where to eat based on your current location. Using Google Maps, it
        finds nearby restaurants and randomly selects one for you to explore.
      </p>
      <p className="text-gray-700">
        This project was created to make dining decisions easier and more fun. 
        You can adjust the distance range, minimum rating, and view your results 
        directly on the map.
      </p>
    </main>
  );
}
