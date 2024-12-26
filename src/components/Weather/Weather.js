"use client"
import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { BsCloudMoonFill, BsSun } from "react-icons/bs";
import Image from 'next/image';

const Weather = ({data}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [weatherData, setWeatherData] = useState(data);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim() === "") return; // Bo'sh inputni tekshirish
        try {
      const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=2e50f68205f54e7a9e775118242612&q=${searchQuery}&days=10&aqi=yes&alerts=yes`
          );
          const newWeatherData = await response.json();
          setWeatherData(newWeatherData); // Ma'lumotni yangilash
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };
    console.log(weatherData);
  return (
    <section className="bg-weather bg-no-repeat bg-center bg-cover backdrop-blur-sm">
      <div className="bg-[#00000063] w-full h-screen backdrop-blur z-40">
        <div className="container mx-auto">
          <div className="min-h-screen text-white p-4">
            <header className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold">Forecast</h1>
              <div className="flex items-center gap-4">
                <form className="relative bg-white/10 flex items-center px-4 rounded-lg py-1 h-[50px]" onSubmit={handleSearch}>
                  <input
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none w-[200px] outline-none"
                  />
                  <button>
                    <IoSearch className="h-4 w-4 text-white/70" />
                  </button>
                </form>
              </div>
            </header>
            <div className="flex flex-col items-center justify-center mb-12">
              <div className="flex items-center gap-4 mb-4">
                <img src={weatherData?.current?.condition?.icon} alt="Weather icon" />
                <h2 className="text-8xl font-light">{weatherData?.current?.temp_c}°</h2>
              </div>
              <h1 className='text-[44px] font-bold tracking-widest'>{weatherData?.location?.name}</h1>
              <div className="text-2xl mb-4">{weatherData?.current?.condition?.text}</div>
              <div className="text-sm text-gray-300">Updated as of {weatherData?.current?.last_updated}</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 text-center">
                <div>
                  <div className="text-gray-300">Feels Like</div>
                  <div>{weatherData?.current?.feelslike_c}°</div>
                </div>
                <div>
                  <div className="text-gray-300">Wind</div>
                  <div>{weatherData?.current?.wind_kph} km/h</div>
                </div>
                <div>
                  <div className="text-gray-300">Visibility</div>
                  <div>{weatherData?.current?.vis_km} km</div>
                </div>
                <div>
                  <div className="text-gray-300">Humidity</div>
                  <div>{weatherData?.current?.humidity}%</div>
                </div>
              </div>
              <div className="flex justify-center mt-8 text-center">
                <div>
                  <div className="text-gray-300">Country</div>
                  <div className="flex items-center justify-center gap-2">
                    <span>{weatherData?.location?.country}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl mb-4">Daily</h2>
              <div className="flex gap-6 w-full overflow-auto">
                {weatherData?.forecast?.forecastday?.map((day, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg text-center min-w-[250px] mb-7 ${
                      index === 0 ? "bg-white/20" : ""
                    }`}
                  >
                    <div className="mb-2">{day.date}</div>
                    <div className='w-full flex justify-center'>
                        <img src={day.day.condition.icon} alt="" />
                    </div>
                    <div className="mt-2 whitespace-nowrap">Max temp C: {day.day.maxtemp_c}°</div>
                    <div className="mt-2 whitespace-nowrap">Min temp C: {day.day.mintemp_c}°</div>
                    <div className="text-gray-400 mt-2">{day.day.condition.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Weather