import { useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
export default function Home(props) {
  const [anime,setAnime] = useState(props.data.anime)
  const [character,setCharacter] = useState(props.data.character)
  const [quote,setQuote] = useState(props.data.quote)

 async function getAnimeQuotes(){
    fetch('https://animechan.vercel.app/api/random').then(response => response.json()).then(data => inspire(data)).catch(err=>console.log(err)) 
}

  async function inspire(quotes){
        setCharacter(quotes.character)
        setAnime(quotes.anime)
        setQuote(quotes.quote) 
  }

  return (
    <>
   <Head>
     <title>Quotesbee - A random anime quote generator app</title>
     <link rel="icon" href="/anime.jpg"/>
     </Head>
    <div className="container my-10 py-4 mx-auto text-center">
      <div className="my-4 brand">
      <h1 className="text-5xl font-bold">Quotes Bee</h1>
      </div>
<div className="max-w-md py-4 mx-auto px-8 bg-white shadow-lg rounded-lg my-20">
<div className="flex justify-center md:justify-end -mt-16">
    <Image alt={"Anime"} width={128} height={128} className="w-40 h-40 rounded-full border-2 border-green-500" src="/anime.jpg"/>
</div>
<div>
  <h2 className="text-gray-800 text-3xl font-semibold">{anime}</h2>
  <p className="mt-2 text-2xl text-gray-600">{quote}</p>
</div>
<div className="flex justify-end mt-4">
  <p className="text-xl font-medium text-green-500"> - {character} </p>
</div>
<button className="text-2xl font-bold text-white p-3 m-4 bg-green-500  hover:bg-gray-800" onClick={getAnimeQuotes}>New Quote</button>
</div>
</div>
</>
  )
}

export async function getStaticProps(){
  const result = await fetch('https://animechan.vercel.app/api/random')
  const data = await result.json()
  console.log(data)
  return{
    props : {data}
  }
}