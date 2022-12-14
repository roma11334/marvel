
class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=d72068d34358d6efb858b44120c044fd';

    getResourse = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }
    
    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    chekNull

    _transformCharacter = (char) => {
        let desc = char.description;

        if(char.description === ''){
            desc = 'We have no description about this hero';
        }

        if(char.description.length > 200){
            desc = char.description.slice(0,200) + '...';
            console.log(desc);
        }
        // Более простой и крутой метод))
        //description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
        return {
            name: char.name,
            description: desc,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
    
}

export default MarvelService;