module.exports = {
    async rewrites() {
      return [
        {
          source: '/WeatherForecast',
          destination: '/api/WeatherForecast',
        },
      ]
    },
  }