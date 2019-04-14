import axios from 'axios';

class Offer {
  constructor() {
    this.offers = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  create(offer) {
    const { from, until, location, budget} = offer;
    console.log(offer)
    return this.offers.post('/offer', { from, until, location, budget})
      .then(({ data }) => {
        return data
      })
  }

  showOfferList(userId) {
    return this.offers.get('/offer', userId)
      .then(({ data }) => data)
  }

  deleteOffer(offerID) {
    return this.offers.delete(`/offer/${offerID}`)
      .then(({ data }) => data)
  }


}

const offer = new Offer();

export default offer
