import callApi from '../helpers/apiHelper';
import getFighterById from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        const endpointdetails = `details/fighter/${id}.json`;
        try {
            const apiResult = await getFighterById(endpointdetails);
            return apiResult;
        } catch (error) {
            throw error;
        }

    }
}

const fighterService = new FighterService();

export default fighterService;
