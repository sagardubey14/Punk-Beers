import  { useEffect, useState } from 'react'
import axios from 'axios'

function FetchBeers() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

 
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop +1 >=document.documentElement.scrollHeight){
        
      setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchBeers = () => {
      axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=3`)
        .then(res => {
          setData(prev =>[...prev,...res.data])
        })
        .catch(err => {
          console.error('Error fetching beers:', err);
        });
    };
    console.log(data.length);
    fetchBeers();
    console.log(data.length);
  }, [page]);

  
  return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((beer, index) => ( 
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={beer.image_url} alt={beer.name} className="h-48 object-cover object-center" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{beer.name}</h2>
              <p className="text-gray-600 italic">{beer.tagline}</p>
              <p className="text-gray-700 mt-2">{beer.description}</p>
              {/* <ul className="text-gray-700 mt-2">
                <li><strong>ABV:</strong> {beer.abv}%</li>
                <li><strong>IBU:</strong> {beer.ibu}</li>
                <li><strong>EBC:</strong> {beer.ebc}</li>
              </ul> */}
              <h3 className="text-lg font-semibold text-gray-800">Ingredients:</h3>
              <ul className="text-gray-700 mt-2">
                <li><strong>Malt:</strong> {beer.ingredients.malt.map(malt => `${malt.name} - ${malt.amount.value} ${malt.amount.unit}`).join(', ')}</li>
                <li><strong>Hops:</strong> {beer.ingredients.hops.map(hop => `${hop.name} - ${hop.amount.value} ${hop.amount.unit}`).join(', ')}</li>
                <li><strong>Yeast:</strong> {beer.ingredients.yeast}</li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">Food Pairing:</h3>
              <span className="text-gray-700">
                {beer.food_pairing.map((food, index) => (
                  <span key={index}>
                    {index > 0 && ', '}
                    {food}
                  </span>
                ))}
              </span>
              <p className="text-gray-700 mt-2"><strong>Brewer's Tips:</strong> {beer.brewers_tips}</p>
              <p className="text-gray-700 mt-2"><strong>Contributed By:</strong> {beer.contributed_by}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FetchBeers
