import Weather from "@/components/Weather/Weather";

export default async function Home() {
  const data = await fetch('https://api.weatherapi.com/v1/forecast.json?key=2e50f68205f54e7a9e775118242612&q=Tashkent&days=10&aqi=yes&alerts=yes')
    const weather = await data.json()
  return (
    <Weather data={weather}/>
  );
}
