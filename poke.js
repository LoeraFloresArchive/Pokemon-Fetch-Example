const fetchPokemon =  async ()=>{
    try{
        // fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0").then((response)=>{
        //     response.json().then((data)=>{

        //     })

        // })
        let pokemon = []
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
        console.log({response})
        const data = await response.json()
        console.log({data})
        pokemon = data.results
        console.log({pokemon})
        return pokemon

    }catch(error){
        console.error(error)
        return []
    }
}

function createPokemonHTMLElements(pokemon){
    let htmlCode = ''
    for(let i =0; i<pokemon.length; i++){
        const curPoke = pokemon[i]
        htmlCode+= `<h2>${curPoke.name}</h2>`
    }
    return htmlCode
}

async function createPokemonHTMLElementsWithSprite(pokemon){
    let htmlCode = ''
    for(let i =0; i<pokemon.length; i++){
        const curPoke = pokemon[i]
        htmlCode+= `<h2>${curPoke.name}</h2><img src="${curPoke.sprite}"/>`
    }
    return await htmlCode
}

async function getPokemonSprite(singlePokemon){
    try{
        const pokemonURL = singlePokemon.url 
        const response = await fetch(pokemonURL)
        const data = await response.json()
        let sprite = data.sprites.front_default
        if(!sprite || sprite ==""){sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png"}
        singlePokemon["sprite"] = sprite
        return singlePokemon
    }catch(error){
        console.error(error)
        singlePokemon["sprite"] = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png"
        return singlePokemon
    }
}

async function mapPokemonSprites (pokemon){
    try{
        const mappedPokemon = []
        for(let i = 0; i<pokemon.length; i++){
            const singlePokemon = pokemon[i]
            const pokemonWithSprite =  await getPokemonSprite(singlePokemon)
            mappedPokemon.push( pokemonWithSprite)
        }
        return mappedPokemon

    }catch(error){
        console.error(error)
        return pokemon.map((poke)=>{
            poke.sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png"
            return poke
        })
    }
}



async function populatePage (){
    const root = document.getElementById('root')
    const pokemon = await fetchPokemon()
    const pokemonWithSprite = await mapPokemonSprites(pokemon)
    // const html = createPokemonHTMLElements()
    console.log({pokemonWithSprite})

    const html = await createPokemonHTMLElementsWithSprite(pokemonWithSprite)

    root.innerHTML = html
}

populatePage()