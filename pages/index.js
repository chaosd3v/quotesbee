import { useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import BaseLayout from '@layouts/Layout'
import {Anime} from '@utils/Constants'

export default function Home(props) {

  const [anime, setAnime] = useState(props.data.anime)
  const [character, setCharacter] = useState(props.data.character)
  const [quote, setQuote] = useState(props.data.quote)
  const [buttonMessage, setButtonMessage] = useState("New Quote")

 async function getAnimeQuotes(){

    try{
      setButtonMessage("Loading...")

      const response = await fetch(Anime.url)
      const quote = await response.json()
      loadQuote(quote)
    }catch{
      new Error("Load failed");
      console.log("Quotes loading failed");
    }
}

  async function loadQuote(quotes){
        setCharacter(quotes.character)
        setAnime(quotes.anime)
        setQuote(quotes.quote) 
        setButtonMessage("New Quote")
  }

  return (
    <>
   <Head>
     <title>Quotesbee - A random anime quote generator app</title>
     <link rel="icon" href={Anime.logo} />
     </Head>
     <BaseLayout>
    <div className="container py-4 mx-auto text-center">
      <div className="my-8 brand">
      <h1 className="text-3xl font-bold">Quotes Bee</h1>
      </div>
<div className="max-w-md py-4 mx-auto px-8 bg-white shadow-lg rounded-lg my-20">
<div className="flex justify-center md:justify-end -mt-16">
    <Image alt={"Anime"} width={128} height={128} className="w-40 h-40 rounded-full border-2 border-green-500" src={Anime.logo}/>
</div>
<div>
  <h2 className="text-gray-800 m-4 text-2xl font-semibold">{anime}</h2>
  <p className="mt-2 text-1xl text-gray-600">{quote}</p>
</div>
<div className="flex justify-end mt-4">
  <p className="text-1xl font-medium text-green-500"> - {character} </p>
</div>
<button className="text-1xl font-bold text-white p-3 m-4 bg-green-500  rounded hover:bg-gray-800 transition duration-300 ease-in-out" onClick={getAnimeQuotes}>{buttonMessage}</button>
</div>
</div>
</BaseLayout>
</>
  )
}

export async function getStaticProps(){
 
  const result = await fetch(Anime.url)
  const data = await result.json()
  
  return{
    props : {data}
  }
}