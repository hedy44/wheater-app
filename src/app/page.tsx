
'use client'

import Image from "next/image";
import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";



//https://api.openweathermap.org/data/2.5/forecast?q=tomar&appid=d02efbbf42cf7104f74c7089357f8467&cnt=2

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherListItem[];
  city: CityInfo;
}

interface WeatherListItem {
  dt: number;
  main: MainInfo;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

interface MainInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Sys {
  pod: string;
}

interface CityInfo {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lat: number;
  lon: number;
}

// Exemplo de uso:
const weatherData: WeatherData = {
  cod: "200",
  message: 0,
  cnt: 2,
  list: [
    {
      dt: 1716487200,
      main: {
        temp: 298.91,
        feels_like: 298.82,
        temp_min: 292.84,
        temp_max: 298.91,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 999,
        humidity: 49,
        temp_kf: 6.07
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d"
        }
      ],
      clouds: {
        all: 3
      },
      wind: {
        speed: 5.97,
        deg: 319,
        gust: 8.77
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d"
      },
      dt_txt: "2024-05-23 18:00:00"
    },
    {
      dt: 1716498000,
      main: {
        temp: 294.8,
        feels_like: 294.56,
        temp_min: 286.57,
        temp_max: 294.8,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1000,
        humidity: 59,
        temp_kf: 8.23
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01n"
        }
      ],
      clouds: {
        all: 3
      },
      wind: {
        speed: 4.63,
        deg: 327,
        gust: 11.41
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "n"
      },
      dt_txt: "2024-05-23 21:00:00"
    }
  ],
  city: {
    id: 2262644,
    name: "Tomar",
    coord: {
      lat: 39.602,
      lon: -8.4092
    },
    country: "PT",
    population: 19168,
    timezone: 3600,
    sunrise: 1716441178,
    sunset: 1716493691
  }
};


export default function Home() {

  const { isLoading, error, data } = useQuery<WeatherData>(
    'repoData',
     async () => {
      const {data}= await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=tomar&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=15`
      );

      return data;
     }
    );


    const firstData = data?.list[0];

    console.log("data", data);

  if (isLoading) return (
<div className="flex items-center min-h-screen justify-center">
    <p className="animate-bounce"> Loading....</p>
  </div> 

  )
  

  return ( 
  <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
    <Navbar />
    <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
      {/* today data */}
      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="flex gap-1 text-2xl items-end">
            <p> {format(parseISO(firstData?.dt_txt ?? ''),'EEEE')} </p>
            <p className="text-lg"> ({format(parseISO(firstData?.dt_txt ?? ''),'dd.MM.yyyy')}) </p>
          </h2>
          
          <Container className="gap-10 px-6 items-center" >
            {/* temperature */}
            <div className="flex flex-col px-4 ">
              <span className="text-5xl">
              {convertKelvinToCelsius(firstData?.main.temp ?? 0)}º
              </span>
              <p className="text-xs space-x-1 whitespace-nowrap">
                <span>Feels Like</span>
                <span>
                {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}º
                </span>
              </p>
              <p className="text-xs space-x-2">
                <span>
                {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}º↓
                {""}
                </span>

                <span>
                {""}
                {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}º↑
                </span>

              </p>
            </div>
            {/* time and weather icon */}
            <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
              {data?.list.map((d,i) => (
              
              <div key={i} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"></div>
              
              
              ))}
            </div>
          </Container>
        </div>
      </section>


      <section>Forecast Data</section>
    </main>
  </div>
  )
}
