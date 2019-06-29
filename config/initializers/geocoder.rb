Geocoder.configure(
  cache: Redis.current,
  http_headers: { 'User-Agent' => 'ABDL.link app server' },
)
