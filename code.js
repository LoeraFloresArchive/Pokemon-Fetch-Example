//Untested Code this was made to prove a point as to how 
//long functions can get if not abstracted

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
async function mapPokemon (pokemonList){
    try{
        //creating a list of pokemon
        const mappedPokemon = []
        //iterating over the list of pokemon we do have
        for(let i = 0; i<pokemonList.length; i++){
            const singlePokemon = pokemonList[i]//assigns the current pokemon to singlePokemon
            //getPokemonSprite for the singlePokemon we are looking at
            //then store it in pokemoneWithSprite
            try{
                const pokemonURL = singlePokemon.url 
                const response = await fetch(pokemonURL)
                const data = await response.json()

        
                let sprite = data.sprites.front_default
                if(!sprite || sprite ==""){sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png"}
                singlePokemon["sprite"] = sprite
        
                let exp = data.base_experience
                if(!exp || exp ==null){exp = 100}
                singlePokemon["exp"] = exp
                let movesList = data.moves
                let moveCounter = 0
                singlePokemon["moves"] = []
            }catch(error){
                console.error(error)
                singlePokemon["sprite"] = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png"
                singlePokemon["exp"] = 100
                singlePokemon["moves"] = ["Struggle", "Struggle", "Struggle", "Struggle"]
                
            }
    
    
            while(moveCounter<4 && moveCounter<movesList.length){
                const currentMove = movesList[moveCounter]
    
                singlePokemon.moves.push(currentMove.move.name || "Struggle")
                moveCounter++
            }

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