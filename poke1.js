const fetchPokemon =  async ()=>{
    try{
        let pokemon = []
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
        // console.log({response})
        const data = await response.json()
        // console.log({data})
        // console.log('--------')
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
    // const div = document.createElement('div')

    for(let i =0; i<pokemon.length; i++){


        const curPoke = pokemon[i]
        
        htmlCode+= `<h2>${curPoke.name}</h2>`
        
        const h2 = document.createElement('h2')
        h2.innerText = curPoke.name
        div.appendChild(h2)

        // const pikachu = {name:"pikachu", url:"https://www.google.com"}
        // htmlCode += '<h2>Pikachu</h2>'

    }

    return htmlCode
}

async function populatePage (){
    const root = document.getElementById('root')
    const pokemonArray = await fetchPokemon()
    const html = createPokemonHTMLElements(pokemonArray)

    // root.append( html)
    root.innerHTML = html
}

populatePage()