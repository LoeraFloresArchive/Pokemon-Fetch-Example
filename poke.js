const fetchPokemon =  async ()=>{
    try{
        // fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0").then((response)=>{
        //     response.json().then((data)=>{

        //     })

        // })
        let pokemon = []
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
        console.log({response})
        const data = await response.json()
        console.log({data})
        pokemon = data.results
        console.log('*****',{pokemon})
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


async function createPokemonHTMLElementsWithData(pokemon){
    let htmlCode = ''
    for(let i =0; i<pokemon.length; i++){
        const curPoke = pokemon[i]
        htmlCode+= `<h2>${curPoke.name}</h2>`
        htmlCode+= `<span>Experience: ${curPoke.exp}\n `
        htmlCode+= `<ul>`
        curPoke.moves.forEach((move)=>{
            htmlCode+=`<li>${move}</li>`
        })
        htmlCode+=`</ul>`
        htmlCode +=`<img src="${curPoke.sprite}"/>\n `
    }
    return await htmlCode
}


async function getPokemonSprite(singlePokemon){
    try{
        // singlePikachu = {name:"pikachu", url:"https://www.google.com"}
        const pokemonURL = singlePokemon.url 
        const response = await fetch(pokemonURL)
        const data = await response.json()

        let sprite = data.sprites.front_default
        if(!sprite || sprite ==""){sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png"}
        // singlePikachu["sprite"] = sprite of pikachu
        // singlePikachu = {name:"pikachu", url:"https://www.google.com", sprite:"link to pikachu image"}
        singlePokemon["sprite"] = sprite
        return singlePokemon
    }catch(error){
        console.error(error)
        singlePokemon["sprite"] = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png"
        return singlePokemon
    }
}

async function getPokemonData(singlePokemon){
    try{
        // singlePikachu = {name:"pikachu", url:"https://www.google.com"}
        const pokemonURL = singlePokemon.url 
        const response = await fetch(pokemonURL)
        const data = await response.json()

        let sprite = data.sprites.front_default
        if(!sprite || sprite ==""){sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png"}
        singlePokemon["sprite"] = sprite

        let exp = data.base_experience
        if(!exp || exp ==null){exp = 100}
        singlePokemon["exp"] = exp
        // const move = {
		// 	"move": {
		// 		"name": "razor-wind",
		// 		"url": "https://pokeapi.co/api/v2/move/13/"
		// 	},
		// 	"version_group_details": [
		// 		{
		// 			"level_learned_at": 0,
		// 			"move_learn_method": {
		// 				"name": "machine",
		// 				"url": "https://pokeapi.co/api/v2/move-learn-method/4/"
		// 			},
		// 			"version_group": {
		// 				"name": "red-blue",
		// 				"url": "https://pokeapi.co/api/v2/version-group/1/"
		// 			}
		// 		},
		// 		{
		// 			"level_learned_at": 0,
		// 			"move_learn_method": {
		// 				"name": "machine",
		// 				"url": "https://pokeapi.co/api/v2/move-learn-method/4/"
		// 			},
		// 			"version_group": {
		// 				"name": "yellow",
		// 				"url": "https://pokeapi.co/api/v2/version-group/2/"
		// 			}
		// 		}
		// 	]
		// },
        //[move]
        let movesList = data.moves
        let moveCounter = 0
        singlePokemon["moves"] = []


        while(moveCounter<4 && moveCounter<movesList.length){
            const currentMove = movesList[moveCounter]

            singlePokemon.moves.push(currentMove.move.name || "Struggle")
            moveCounter++
        }

        return singlePokemon
    }catch(error){
        console.error(error)
        singlePokemon["sprite"] = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png"
        singlePokemon["exp"] = 100
        singlePokemon["moves"] = ["Struggle", "Struggle", "Struggle", "Struggle"]
        return singlePokemon
    }
}

async function mapPokemonSprites (pokemonList){
    try{
        //creating a list of pokemon
        const mappedPokemon = []
        //iterating over the list of pokemon we do have
        for(let i = 0; i<pokemonList.length; i++){
            const singlePokemon = pokemonList[i]//assigns the current pokemon to singlePokemon
            //getPokemonSprite for the singlePokemon we are looking at
            //then store it in pokemoneWithSprite
            const pokemonWithSprite =  await getPokemonSprite(singlePokemon)
            //pushing it to the final list of pokemon
            mappedPokemon.push( pokemonWithSprite)
        }
        return mappedPokemon

    }
    catch(error){
        console.error(error)
        return pokemon.map((poke)=>{
            poke.sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png"
            return poke
        })
    }
}

async function mapPokemon (pokemonList){
    try{
        //creating a list of pokemon
        const mappedPokemon = []
        //iterating over the list of pokemon we do have
        for(let i = 0; i<pokemonList.length; i++){
            const singlePokemon = pokemonList[i]//assigns the current pokemon to singlePokemon
            //getPokemonSprite for the singlePokemon we are looking at
            //then store it in pokemoneWithSprite
            const pokemonWithData =  await getPokemonData(singlePokemon)
            //pushing it to the final list of pokemon
            mappedPokemon.push( pokemonWithData)
        }
        return mappedPokemon

    }
    catch(error){
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

    const pokemonWithData = await mapPokemon(pokemon)
    //  const html = createPokemonHTMLElements()
    console.log({pokemonWithData})

    const html = await createPokemonHTMLElementsWithData(pokemonWithData)

    root.innerHTML = html
}

populatePage()